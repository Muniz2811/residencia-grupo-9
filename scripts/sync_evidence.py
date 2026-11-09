"""Export public documentation evidence from existing artifacts; never run the RAG."""

from __future__ import annotations

import argparse
import ast
import csv
import hashlib
import io
import json
import math
import struct
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def sha(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            hasher.update(block)
    return hasher.hexdigest()


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def read_jsonl(path: Path):
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def numpy_sample(path: Path, row: int, expected_shape: tuple[int, int]) -> dict:
    # Read float32 NPY without importing NumPy, Torch or the embedding model.
    with path.open("rb") as handle:
        if handle.read(6) != b"\x93NUMPY":
            raise ValueError("Invalid NumPy artifact")
        version = handle.read(2)
        width = 2 if version[0] == 1 else 4
        length = int.from_bytes(handle.read(width), "little")
        header = ast.literal_eval(handle.read(length).decode("latin1"))
        if header["descr"] != "<f4" or header["fortran_order"] or header["shape"] != expected_shape:
            raise ValueError("Unexpected embedding array layout")
        data_start = handle.tell()
        handle.seek(data_start + row * expected_shape[1] * 4)
        vector = struct.unpack("<" + "f" * expected_shape[1], handle.read(expected_shape[1] * 4))
    if not all(math.isfinite(value) for value in vector):
        raise ValueError("Non-finite vector")
    return {"head": [round(v, 7) for v in vector[:16]], "dimensions": len(vector),
            "l2_norm": math.sqrt(sum(v * v for v in vector))}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rag-root", type=Path, default=ROOT.parent / "unb-gama-rag")
    args = parser.parse_args()
    rag = args.rag_root.resolve()
    config = read_json(rag / "config/rag-plan.json")
    pilot = rag / config["pilot"]["output_directory"]
    preparation = read_json(pilot / "manifest.json")
    embedding_dir = rag / config["embeddings"]["output_directory"]
    embeddings = read_json(embedding_dir / "manifest.json")
    chunks = read_jsonl(pilot / "chunks.jsonl")
    rows = read_jsonl(embedding_dir / "rows.jsonl")
    if sha(pilot / "chunks.jsonl") != embeddings["inputs"]["chunks_sha256"]:
        raise ValueError("Chunks and embeddings do not correspond")
    if sha(embedding_dir / "vectors.npy") != embeddings["outputs"]["vectors.npy"]["sha256"]:
        raise ValueError("Embedding hash mismatch")
    if [r["chunk_id"] for r in rows] != [c["chunk_id"] for c in chunks]:
        raise ValueError("Vector row IDs and chunks are not aligned")
    with (rag / "catalog/researched-sources.csv").open(encoding="utf-8", newline="") as handle:
        sources = list(csv.DictReader(handle))
    selected = {s["source_id"] for s in config["pilot"]["html_sources"]}
    public_sources = []
    for source in sources:
        # Link to the official page that publishes the Word viewer, not its session URL.
        url = "https://bce.unb.br/biblioteca-campus-gama/" if source["document_id"] == "DOC-014" else source["url"]
        public_sources.append({"id": source["document_id"], "title": source["title"], "url": url,
                               "scope": source["scope"], "pilot": source["document_id"] in selected,
                               "status": "visualizador Word; texto pendente" if source["document_id"] == "DOC-014"
                               else "preparado no piloto; revisão pendente" if source["document_id"] in selected
                               else "HTML adquirido; fora do piloto"})
    by_row = {r["chunk_id"]: r["row"] for r in rows}
    examples = []
    preferred = {"DOC-005": "COSMOS", "DOC-012": "Espaços de estudo", "MAP-001": "UAC -"}
    for sid in [s["source_id"] for s in config["pilot"]["html_sources"]] + ["MAP-001"]:
        eligible = [c for c in chunks if c["source_id"] == sid]
        needle = preferred.get(sid)
        chunk = next((c for c in eligible if needle and needle in c["section"]), eligible[0])
        words = chunk["text"].split()
        examples.append({"source_id": sid, "chunk_id": chunk["chunk_id"], "section": chunk["section"],
                         "excerpt": " ".join(words[:18]), "excerpt_truncated": len(words) > 18,
                         "input_tokens": chunk["input_tokens_including_prefix_and_special_tokens"],
                         "source_sha256": chunk["source_sha256"], "source_url": chunk["source_url"],
                         "source_span": chunk["source_span"], "selectors": chunk["html_selectors"],
                         "point_id": chunk.get("point_id"), "row": by_row[chunk["chunk_id"]],
                         "vector": numpy_sample(embedding_dir / "vectors.npy", by_row[chunk["chunk_id"]],
                                                (len(chunks), config["embeddings"]["dimensions"]))})
    geojson = read_json(pilot / "places.geojson")
    points = [{"id": f["id"], "name": f["properties"]["name"], "description": f["properties"]["description"],
               "coordinates": f["geometry"]["coordinates"], "eligible": f["properties"]["pilot_eligible"],
               "kind": f["properties"]["kind"], "flags": f["properties"]["quality_flags"],
               "building_id": f["properties"]["building_id"],
               "candidate_building_id": f["properties"]["candidate_building_id"]} for f in geojson["features"]]
    data = {
        "exported_at": datetime.now(timezone.utc).isoformat(), "project": "Coleta FCTE · Grupo 09",
        "summary": {"html_snapshots": len(sources), **preparation["summary"],
                    "embeddings_generated": embeddings["summary"]["vectors"],
                    "dimensions": config["embeddings"]["dimensions"], **preparation["map_audit"]},
        "model": {"name": config["embeddings"]["model"], "revision": config["embeddings"]["revision"],
                  "prefix_passage": "passage: ", "prefix_query": "query: ", "normalization": "L2",
                  "device": embeddings["runtime"]["device"], "packages": embeddings["runtime"]["packages"]},
        "embedding_checks": embeddings["summary"], "sources": public_sources, "examples": examples,
        "chunks": [{"id": c["chunk_id"], "source_id": c["source_id"], "section": c["section"],
                    "input_tokens": c["input_tokens_including_prefix_and_special_tokens"], "point_id": c.get("point_id")}
                   for c in chunks],
        "points": points,
        "integrity": {"chunks_sha256": sha(pilot / "chunks.jsonl"), "vectors_sha256": sha(embedding_dir / "vectors.npy"),
                      "preparation_manifest_sha256": sha(pilot / "manifest.json"),
                      "embedding_manifest_sha256": sha(embedding_dir / "manifest.json")},
        "limitations": ["Inspeção de artefatos; não executa recuperação nem respostas de LLM.",
                        "Prévias abreviadas a até 18 palavras; tokens informados são os da entrada completa.",
                        "Fontes do piloto permanecem como rascunhos; não há métricas de recuperação medidas.",
                        "O mapa mostra marcadores da equipe, sem confirmação de acesso, rotas ou polígonos."],
    }
    downloads = ROOT / "docs/assets/downloads"
    downloads.mkdir(parents=True, exist_ok=True)
    (downloads / "evidencias.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (ROOT / "docs/javascripts/evidencias.js").write_text("window.FCTE_EVIDENCIAS = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
    with (downloads / "fontes.csv").open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["id", "title", "url", "scope", "pilot", "status"])
        writer.writeheader()
        writer.writerows(public_sources)
    source_table = ["| ID | Documento | Situação |", "|---|---|---|"]
    for source in public_sources:
        title = source["title"].replace("|", "\\|")
        source_table.append(f"| {source['id']} | [{title}]({source['url']}) | {source['status']} |")
    (ROOT / "includes/fontes.md").write_text("\n".join(source_table) + "\n", encoding="utf-8")
    summary = embeddings["summary"]
    metrics = ["| Verificação técnica observada | Resultado |", "|---|---|",
               f"| Matriz persistida | {len(chunks)} × {config['embeddings']['dimensions']} |",
               f"| Precisão numérica | `{summary['dtype']}` |",
               f"| Tokens de entrada (mínimo / máximo) | {summary['min_input_tokens']} / {summary['max_input_tokens']} |",
               f"| Norma L2 (mínima / máxima) | {summary['min_l2_norm']:.8f} / {summary['max_l2_norm']:.8f} |",
               f"| Valores finitos | Sim |", f"| Codificação em uma execução local | {summary['encoding_seconds']} s |",
               f"| Tempo total daquela execução, incluindo carregamento | {summary['total_seconds_including_load_or_download']} s |",
               f"| Chamadas a LLM na preparação/vetorização | {summary['llm_calls']} |",
               "| Banco vetorial criado | Não |"]
    (ROOT / "includes/verificacoes.md").write_text("\n".join(metrics) + "\n", encoding="utf-8")
    bundle_files = ["scripts/export_html.py", "scripts/prepare_pilot.py", "scripts/embed_pilot.py",
                    "config/rag-plan.json", "requirements.txt", "catalog/researched-sources.csv",
                    "catalog/url-corrections.json", "data/imports/maps/Mapeamento.kml"]
    with zipfile.ZipFile(downloads / "codigo-piloto.zip", "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for relative in bundle_files:
            archive.write(rag / relative, arcname=relative)
        archive.writestr("LEIA-ME.txt", "Código do piloto e KML da equipe. Não contém originais HTML, fotos, credenciais, pesos ou vetores.\nAdquira os HTMLs e ajuste snapshot_manifest em config/rag-plan.json antes de preparar o piloto.\nOs resultados podem variar com atualizações das fontes. Veja a documentação de reprodução do site.\n")
    print(json.dumps({"html_sources": len(public_sources), "chunks_metadata": len(chunks), "examples": len(examples),
                      "map_points": len(points), "vector_database_created": False,
                      "output": str(downloads)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
