# Coleta FCTE · Grupo 09

Documentação MkDocs do mapeamento da FCTE e da preparação do RAG. Identidade visual adaptada do [Grupo 04](https://github.com/maykonjuso/residencia-grupo-4), com seus créditos em [Sobre](docs/sobre/index.md).

## Executar

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-docs.txt
.\.venv\Scripts\python.exe -m mkdocs serve
```

Abra **http://127.0.0.1:8001**. Para gerar e conferir o site:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

## Conteúdo

- Entrega 1: pacote de definição do projeto, com os dez tópicos solicitados.
- Visão, escopo e proposta de colaboração com o Grupo 04; fluxos e esteira RAG animados, com controles de apresentação.
- Aplicativo de coleta, revisão humana, armazenamento e privacidade.
- Mapeamento com os 14 marcadores reais do KML; 11 no piloto.
- 27 HTMLs adquiridos, cinco páginas selecionadas e 79 chunks.
- 79 embeddings E5 de 384 dimensões e verificações técnicas.
- Arquitetura, ingestão, avaliação planejada e pendências explícitas.
- Exploradores estáticos de metadados, amostras e vetores reais.

Banco vetorial, consulta RAG e métricas de recuperação continuam pendentes. O site não executa o RAG e não contém credenciais, fotos privadas, pesos ou a matriz completa de vetores.

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

Siga o [tutorial completo](docs/sobre/publicacao.md): criar um repositório GitHub vazio, enviar `main`, selecionar **Settings → Pages → Source: GitHub Actions** e acompanhar o workflow. A URL é configurada automaticamente durante o build no GitHub.

Este é um repositório independente do aplicativo de coleta e do diretório de implementação RAG. O deploy do MkDocs não modifica esses projetos.
