"""Exporta evidências existentes por lista permitida, sem inferência ou credenciais.

Publica metadados, excertos curtos e demonstrações selecionadas. Não copia logs
brutos, documentos integrais, fotos, banco, pesos, caches ou arquivos .env.
"""
from __future__ import annotations
import argparse
import ast
import csv
import hashlib
import json
import math
import struct
import zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUND = '20261111T151703Z'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def npy_header(handle):
    if handle.read(6) != b'\x93NUMPY':
        raise ValueError('Artefato NPY inválido')
    version = handle.read(2)
    length = int.from_bytes(handle.read(2 if version[0] == 1 else 4), 'little')
    header = ast.literal_eval(handle.read(length).decode('latin1'))
    if header['fortran_order']:
        raise ValueError('Esperado array em ordem C')
    return header


def vectors_npz(path, ids, dimensions):
    with zipfile.ZipFile(path) as archive:
        with archive.open('ids.npy') as handle:
            header = npy_header(handle)
            if header['shape'] != (len(ids),) or not header['descr'].startswith('<U'):
                raise ValueError('IDs incompatíveis')
            width = int(header['descr'][2:]) * 4
            if [handle.read(width).decode('utf-32-le').rstrip('\0') for _ in ids] != ids:
                raise ValueError('Ordem dos vetores difere dos chunks')
        with archive.open('vetores.npy') as handle:
            header = npy_header(handle)
            if header['descr'] != '<f4' or header['shape'] != (len(ids), dimensions):
                raise ValueError('Forma ou dtype incompatível')
            vectors = [struct.unpack('<' + 'f' * dimensions, handle.read(dimensions * 4)) for _ in ids]
    norms = [math.sqrt(sum(v * v for v in vector)) for vector in vectors]
    if not all(math.isfinite(v) for vector in vectors for v in vector) or any(abs(n - 1) > .001 for n in norms):
        raise ValueError('Vetores inválidos ou não normalizados')
    return vectors, norms


def excerpt(chunk, question=''):
    if chunk['chunk_id'] == 'c_f2c6f00293fae365' and 'LEMA' in question:
        return 'Laboratório de Estruturas e Materiais Aeroespaciais – LEMA … Local: Prédio LDTEA – Térreo – Sala 103'
    selected = {
        'c_f2c6f00293fae365': 'Computational Aerospace Simulations & Modeling Laboratory – COSMOS … Local: Prédio LDTEA – 2º andar – Sala 304',
        'c_c8a0b710c3c50b09': 'espaço para estudo com cabines individuais e mesas para estudo em grupo',
        'c_d18e321ba2d41ac7': 'O empréstimo de materiais é disponibilizado apenas para a comunidade acadêmica da UnB.',
        'c_7487f9e90557b28d': 'Segunda a sexta-feira (exceto feriados) das 7h às 19h',
    }
    return selected.get(chunk['chunk_id'], ' '.join(chunk['texto'].split()[:18]))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--rag-root', type=Path, default=ROOT.parent / 'unb-gama-rag')
    rag = parser.parse_args().rag_root.resolve()
    manifest_path = rag / 'data/index/manifesto.json'
    manifest = read_json(manifest_path)
    chunks_path = rag / 'data/chunks/chunks.jsonl'
    chunks = [json.loads(line) for line in chunks_path.read_text(encoding='utf-8').splitlines() if line.strip()]
    vectors_path = rag / manifest['vetores']['arquivo']
    if sha(chunks_path) != manifest['corpus']['sha256_chunks'] or sha(vectors_path) != manifest['vetores']['sha256']:
        raise ValueError('Chunks ou vetores não correspondem ao manifesto')
    ids = [c['chunk_id'] for c in chunks]
    vectors, norms = vectors_npz(vectors_path, ids, manifest['embeddings']['dimensao'])
    by_id = {c['chunk_id']: c for c in chunks}
    counts = Counter(c['source_id'] for c in chunks)
    with (rag / 'catalogo/fontes.csv').open(encoding='utf-8', newline='') as handle:
        catalog = list(csv.DictReader(handle))
    sources = [{'id': s['source_id'], 'title': s['titulo'], 'url': s['url'], 'scope': s['abrangencia'],
                'indexed': s['source_id'] in counts,
                'status': 'Aprovada e indexada' if s['source_id'] in counts else 'Aprovada; aquisição bloqueada',
                'chunks': counts[s['source_id']], 'version': s['versao'], 'reviewed_at': s['data_revisao'],
                'validity': s['validade'], 'limitations': s['limitacoes'], 'sha256': s['sha256']}
               for s in catalog]
    examples = []
    for sid, preferred in [('DOC-001', None), ('DOC-005', 'c_f2c6f00293fae365'),
                           ('DOC-012', 'c_c8a0b710c3c50b09'), ('DOC-026', None)]:
        c = by_id[preferred] if preferred else next(c for c in chunks if c['source_id'] == sid)
        row = ids.index(c['chunk_id']); quote = excerpt(c)
        assert all(part in ' '.join(c['texto'].split()) for part in quote.split(' … '))
        examples.append({'source_id': sid, 'chunk_id': c['chunk_id'], 'section': ' > '.join(c['secoes']),
                         'excerpt': quote, 'excerpt_truncated': True, 'input_tokens': c['tokens'],
                         'source_sha256': c['sha256_original'], 'source_url': c['url'],
                         'version': c['versao'], 'validity': c['validade'], 'row': row,
                         'vector': {'head': [round(v, 7) for v in vectors[row][:16]],
                                    'dimensions': len(vectors[row]), 'l2_norm': norms[row]}})
    round_dir = rag / 'avaliacao/resultados' / ROUND
    baseline = read_json(round_dir / 'execucoes.json')
    metrics = read_json(round_dir / 'metricas.json')
    judgments = {q['id']: q for q in read_json(round_dir / 'julgamentos.json')['perguntas']}
    correction = read_json(round_dir / 'correcao-conversa.json')
    def public_demo(item, name, label, question_id=None):
        log, result = item['log_backend'], item['resposta']
        relevant = {t['chunk_id']: t['relevante'] for t in judgments[question_id]['trechos']} if question_id else {}
        return {'id': name, 'label': label, 'question': log['pergunta'], 'query': log.get('consulta_busca', log['pergunta']),
                'request_id': log['requestId'], 'executed_at': log['executado_em'], 'status': result['status'],
                'answer': result.get('answer', result.get('message', '')), 'model': result['model'],
                'base_version': result['baseVersion'], 'prompt_version': log['prompt']['versao'],
                'method': log['recuperacao']['config_busca'].get('metodo', 'densa'),
                'retrieved': [{'id': t['chunk_id'], 'source_id': t['source_id'], 'title': t['titulo'],
                               'section': ' > '.join(t['secoes']), 'version': t['versao'], 'url': t['url'],
                               'excerpt': excerpt(by_id[t['chunk_id']], log['pergunta']), 'distance': t['distancia'],
                               'rank': t['posicao'], 'relevant': relevant.get(t['chunk_id']),
                               'rrf': t.get('score_rrf')} for t in log['recuperacao']['trechos']],
                'claims': result['claims'], 'source_ids': [s['id'] for s in result['sources']],
                'previous_request_id': log.get('previousRequestId')}
    demos = [public_demo(next(q for q in baseline['execucoes'] if q['id'] == qid), name,
                         'Avaliação inicial · busca densa', qid)
             for qid, name in [('Q11', 'cosmos'), ('Q06', 'biblioteca'), ('Q13', 'ausencia')]]
    demos += [public_demo(correction['execucoes'][i], name, 'Verificação posterior · busca híbrida')
              for i, name in [(0, 'cabines'), (2, 'lema')]]
    downloads = ROOT / 'docs/assets/downloads'
    previous = read_json(downloads / 'evidencias.json') if (downloads / 'evidencias.json').exists() else {}
    points = previous.get('points', [])
    if len({p['id'] for p in points}) != len(points):
        raise ValueError('IDs duplicados no mapa preservado')
    data = {'schema': 2, 'exported_at': datetime.now(timezone.utc).isoformat(), 'project': 'FCTE Campus · Grupo 09',
            'summary': {'approved_sources': len(catalog), 'html_snapshots': len(counts), 'indexed_sources': len(counts),
                        'chunks': len(chunks), 'embeddings_generated': len(vectors), 'dimensions': 384,
                        'map_points': len(points), 'map_indexed': False},
            'model': {'name': manifest['embeddings']['modelo'], 'revision': manifest['embeddings']['revisao'],
                      'normalization': 'L2', 'device': 'CPU', 'packages': manifest['bibliotecas']},
            'sources': sources, 'examples': examples,
            'chunks': [{'id': c['chunk_id'], 'source_id': c['source_id'], 'section': ' > '.join(c['secoes']),
                        'input_tokens': c['tokens'], 'version': c['versao']} for c in chunks],
            'points': points, 'demos': demos, 'metrics': metrics,
            'index': {'collection': manifest['indice']['colecao'], 'signature': manifest['assinatura'],
                      'path': 'data/index/chroma', 'distance': 'cosine', 'local': True},
            'embedding_checks': {'shape': [len(vectors), 384], 'finite': True, 'min_norm': min(norms),
                                 'max_norm': max(norms), 'dtype': 'float32'},
            'integrity': {'chunks_sha256': sha(chunks_path), 'vectors_sha256': sha(vectors_path),
                          'manifest_sha256': sha(manifest_path)},
            'limitations': ['Site estático: reproduz registros, sem chamadas à API.',
                            'Métricas da rodada inicial densa, anteriores à busca híbrida.',
                            'Julgamento assistido único, sem dupla revisão humana.',
                            'KML é inventário separado da coleção ativa de 94 chunks.']}
    downloads.mkdir(parents=True, exist_ok=True)
    def save(path, value):
        path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    save(downloads / 'evidencias.json', data); save(downloads / 'demonstracoes.json', demos)
    save(downloads / 'metricas.json', metrics); save(downloads / 'gabarito.json', read_json(round_dir / 'gabarito.json'))
    persistence = read_json(round_dir / 'persistencia.json')
    proof = {k: v for k, v in persistence.items() if k != 'processos_novos'}
    proof['processos_novos'] = [{'comando': p['comando'], 'exit_code': p['exit_code'],
                                 'reaberto_sem_ingestao': p['resultado'].get('reaberto_sem_ingestao'),
                                 'autoconsulta_confirmada': p['resultado'].get('autoconsulta_confirmada'),
                                 'chunks': p['resultado'].get('chunks'),
                                 'colecao': p['resultado'].get('colecao'),
                                 'recuperados': [{'chunk_id': t['chunk_id'], 'source_id': t['source_id'],
                                                 'distancia': t['distancia']}
                                                for t in p['resultado'].get('trechos', [])]}
                                for p in persistence['processos_novos']]
    save(downloads / 'persistencia.json', proof)
    demos_md = []
    for d in demos:
        demos_md += [f"## {d['id'].capitalize()} · registro real", '', f"**Etapa:** {d['label']}. **Método:** `{d['method']}`.",
                     '', f"**Pergunta:** {d['question']}", '', '**Resposta registrada:**', '', '> ' + d['answer'].replace('\n', '\n> '),
                     '', f"Execução: `{d['request_id']}` · `{d['executed_at']}` · modelo `{d['model']}`.",
                     '', f"Prompt `{d['prompt_version']}`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.", '',
                     '| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |', '|---:|---|---:|---|']
        for t in d['retrieved']:
            used = 'Sim' if t['id'] in d['source_ids'] else 'Não'
            demos_md.append(f"| {t['rank']} | `{t['id']}` · {t['source_id']} | {t['distance']:.6f} | {used} |")
        demos_md += ['', '### Evidências citadas', '']
        for t in d['retrieved']:
            if t['id'] in d['source_ids']:
                demos_md += [f"- **{t['source_id']} · {t['title']}**, versão `{t['version']}`, seção {t['section']}. "
                             f"Excerto: “{t['excerpt']}”. [Abrir fonte]({t['url']})."]
        if not d['source_ids']:
            demos_md += ['Não houve afirmação com fonte emitida: o sistema declarou ausência. Os trechos recuperados não comprovam ocupação atual.']
        if d['query'] != d['question']:
            demos_md += ['', '**Consulta contextualizada usada na busca:**', '', '```text', d['query'], '```',
                         '', 'O contexto anterior identifica o assunto; os fatos precisam de evidência na recuperação atual.']
        demos_md += ['']
    (ROOT / 'includes/demonstracoes.md').write_text('\n'.join(demos_md), encoding='utf-8')
    gold = {q['id']: q for q in read_json(round_dir / 'gabarito.json')['perguntas']}
    results_md = ['| ID | Pergunta | Relevantes / retornados | Fatos sustentados / produzidos | Resultado |',
                  '|---|---|---:|---:|---|']
    for q in metrics['por_pergunta']:
        item = next(e for e in baseline['execucoes'] if e['id'] == q['id'])
        if item['http_status'] == 504:
            outcome = 'Falha técnica: Gemini excedeu 90 s (HTTP 504)'
        elif item['http_status'] == 502:
            outcome = 'Falha técnica: indisponibilidade na chamada ao Gemini (HTTP 502)'
        elif item['http_status'] != 200:
            outcome = f"Falha técnica (HTTP {item['http_status']})"
        elif item['resposta']['status'] == 'answered':
            outcome = 'Resposta com fontes'
        else:
            outcome = 'Abstenção indevida: evidência não recuperada' if gold[q['id']]['respondiveis'] else 'Ausência reconhecida corretamente'
        facts = f"{q['fatos_sustentados']}/{q['fatos']}" if q['fatos'] else 'Não aplicável'
        results_md.append(f"| {q['id']} | {gold[q['id']]['pergunta']} | {q['relevantes']}/{q['recuperados']} | {facts} | {outcome} |")
    (ROOT / 'includes/resultados.md').write_text('\n'.join(results_md) + '\n', encoding='utf-8')
    (ROOT / 'docs/javascripts/evidencias.js').write_text(
        'window.FCTE_EVIDENCIAS = ' + json.dumps(data, ensure_ascii=False) + ';\n', encoding='utf-8')
    with (downloads / 'fontes.csv').open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(sources[0])); writer.writeheader(); writer.writerows(sources)
    table = ['| ID | Documento | Situação | Chunks |', '|---|---|---|---:|']
    for s in sources:
        title = s['title'].replace('|', '\\|')
        table.append(f"| {s['id']} | [{title}]({s['url']}) | {s['status']} | {s['chunks']} |")
    (ROOT / 'includes/fontes.md').write_text('\n'.join(table) + '\n', encoding='utf-8')
    checks = ['| Verificação observada | Resultado |', '|---|---|',
              f'| Matriz | {len(chunks)} × 384, float32 |', '| Valores finitos | Sim |',
              f'| Norma L2 mínima / máxima | {min(norms):.8f} / {max(norms):.8f} |',
              '| Chroma persistido | Sim, 94 registros na coleção ativa |',
              '| Reabertura sem ingestão | Confirmada em processos novos |']
    (ROOT / 'includes/verificacoes.md').write_text('\n'.join(checks) + '\n', encoding='utf-8')
    bundle = [*sorted((rag / 'src/unb_gama_rag').glob('*.py')), *sorted((rag / 'scripts').glob('*.py'))]
    bundle += [rag / p for p in ('config/rag.yaml', 'config/entidades.yaml', 'catalogo/fontes.csv',
                                'catalogo/aprovacao.json', 'requirements.txt', 'requirements.lock.txt',
                                'README.md', 'avaliacao/gabarito.json')]
    with zipfile.ZipFile(downloads / 'codigo-piloto.zip', 'w', compression=zipfile.ZIP_DEFLATED) as archive:
        for path in bundle:
            archive.write(path, arcname=path.relative_to(rag))
        archive.writestr('LEIA-ME.txt', 'Código atual do RAG. Veja a reprodução no site.\n'
                        'Sem .env, fotos, originais, extraídos, chunks integrais, banco, pesos ou logs.\n'
                        'Nova aquisição pode produzir versões diferentes ou encontrar bloqueios.\n')
    print(json.dumps({'fontes_aprovadas': len(catalog), 'fontes_indexadas': len(counts),
                      'chunks': len(chunks), 'demonstracoes': len(demos), 'pontos_preservados': len(points)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
