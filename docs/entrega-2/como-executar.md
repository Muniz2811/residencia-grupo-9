# Reproduzir o piloto

Há dois projetos diferentes: **este site de documentação** e o **pipeline RAG**. Gerar o MkDocs não baixa modelos nem executa os scripts do piloto.

## Consultar o que já está documentado

As [evidências exportadas](evidencias.md) são suficientes para conferir IDs, fontes, contagens e amostras. Não é necessário instalar Torch para gerar este site.

## Código do pipeline

[Baixar código e KML](../assets/downloads/codigo-piloto.zip){ .md-button .md-button--primary }

Extraia o pacote em uma pasta própria. Ele contém scripts, configuração, dependências, catálogo de URLs e o KML. Os snapshots HTML usados na execução registrada não estão incluídos; uma nova aquisição poderá encontrar conteúdo atualizado ou indisponível.

Requer Python 3.13 para as versões fixadas do ambiente registrado. Em PowerShell, na pasta extraída:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

## 1. Adquirir fontes

```powershell
.\.venv\Scripts\python.exe scripts/export_html.py
```

O exportador cria uma pasta UTC com manifesto. Confira falhas e o conteúdo efetivo. Em `config/rag-plan.json`, ajuste `pilot.snapshot_manifest` para o manifesto recém-obtido. O código de preparação usa regras para o snapshot conhecido; se a estrutura da página mudou, revise os seletores e não considere uma extração vazia como documento aprovado.

Em caso de cadeia de certificados incompleta, o exportador aceita `--ca-bundle CAMINHO` com um pacote confiável de autoridades. Não desative a verificação HTTPS. A execução registrada usou o pacote `certifi` disponível no ambiente de aquisição.

## 2. Preparar cinco documentos e KML

```powershell
.\.venv\Scripts\python.exe scripts/prepare_pilot.py --download-tokenizer
```

Baixa apenas o tokenizer, se ausente, e prepara `documents.jsonl`, `chunks.jsonl`, `places.geojson` e manifesto em `data/processed/pilot/`. O KML está no caminho configurado. Os rascunhos exigem conferência.

## 3. Gerar embeddings

```powershell
.\.venv\Scripts\python.exe scripts/embed_pilot.py --download-model
```

O download inicial inclui aproximadamente 470 MB de pesos e configurações. Depois, executar sem `--download-model` usa os arquivos locais. Os resultados são `vectors.npy`, `rows.jsonl` e manifesto na pasta de embeddings.

Os textos permanecem locais; a geração de vetores não usa chave Gemini. Biblioteca, revisão, prefixos e normalização precisam permanecer compatíveis. A execução documentada produziu 79 vetores; uma nova versão das fontes pode alterar essa contagem.

## 4. Banco e consulta

Essa parte não está implementada. Não há comando de consulta RAG disponível para executar neste pacote. A página de [banco vetorial](banco-vetorial.md) apresenta a proposta e seus critérios de conclusão.

## Atualizar as evidências deste site

Com a pasta original do RAG disponível, na raiz deste repositório de documentação:

```powershell
python scripts/sync_evidence.py --rag-root ../unb-gama-rag
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

O sincronizador lê os artefatos existentes e verifica vínculos; não roda aquisição, inferência ou avaliação. Revise também os textos quando números ou decisões mudarem. O workflow do Pages utiliza o export já versionado e não precisa acessar a pasta vizinha.
