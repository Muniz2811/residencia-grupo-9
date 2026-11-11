# Coleta FCTE · Grupo 09

Documentação MkDocs do mapeamento da FCTE e da implementação do RAG. Identidade visual adaptada do [Grupo 04](https://github.com/maykonjuso/residencia-grupo-4), com seus créditos em [Referências](docs/coleta/referencias.md).

## Executar

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-docs.txt
.\.venv\Scripts\python.exe -m mkdocs serve
```

Abra **http://127.0.0.1:8002**. Para gerar e conferir o site:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

## Conteúdo

- Entrega 1: pacote de definição do projeto, com os dez tópicos solicitados.
- Visão e esteira animadas, com controles, movimento reduzido e registros reais.
- Coleta e inventário geográfico, separados da coleção textual ativa.
- Entrega 2: 27 fontes aprovadas, 25 indexadas, 94 chunks e E5 de 384 dimensões.
- Chroma local persistente, busca híbrida E5/BM25/RRF, contexto curto e Gemini.
- Demonstrações com perguntas, rankings, respostas, referências, IDs e versões.
- Reavaliação híbrida completa das 15 perguntas, com respostas, 75 trechos, 49 fatos e 16 citações julgados; todas as tentativas preservadas e histórico denso separado.
- Código de reprodução e exportações públicas por lista permitida.

O site é estático e não executa o RAG. Não publica chaves, fotos, originais integrais, logs brutos, Chroma, pesos ou a matriz completa. A documentação não implica deploy do backend.

## Organização

```text
mkdocs.yml                 tema, extensões e navegação
docs/                      páginas, estilos, scripts e evidências públicas
overrides/                 templates adaptados da identidade compartilhada
includes/                  tabelas geradas a partir dos artefatos
scripts/sync_evidence.py   atualização das evidências, sem executar inferência
.github/workflows/pages.yml  build e publicação no GitHub Pages
```

As evidências já estão exportadas e versionadas com o site. Para atualizá-las com a pasta original do piloto:

```powershell
python scripts/sync_evidence.py --rag-root ../unb-gama-rag
```

## Publicar

No repositório [Muniz2811/residencia-grupo-9](https://github.com/Muniz2811/residencia-grupo-9), selecione **Settings → Pages → Source: GitHub Actions**. Depois, envie as alterações a partir desta pasta:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
git add .
git commit -m "docs: atualizar documentação"
git push
```

Acompanhe **Actions → Publicar documentação**. Cada push em `main` dispara o workflow; também é possível usar **Run workflow**. Caso a execução inicial tenha falhado antes de habilitar Pages, execute-a novamente. A URL é configurada automaticamente durante o build:

**https://muniz2811.github.io/residencia-grupo-9/**

O diretório `site/` é gerado pelo MkDocs e não precisa ser commitado. O workflow usa somente as dependências de documentação e não executa o RAG.

Este é um repositório independente do aplicativo de coleta e do diretório de implementação RAG. O deploy do MkDocs não modifica esses projetos.
