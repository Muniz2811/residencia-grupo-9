# Reproduzir o RAG e a documentação

## São processos diferentes

| Projeto | Função | Execução local |
|---|---|---|
| `residencia-grupo-9` | Documentação estática e reprodução dos registros | MkDocs, sugerido na porta 8002 |
| `unb-gama-rag` | Ingestão, Chroma, recuperação e Gemini | API na porta 8001 |
| `fcte-campus` | PWA e chat | Vite na porta 5173 |
| `coleta-fcte` | Coleta de fotos e registros | Serviço separado; não é o banco vetorial |

O Pages precisa só das dependências de documentação e dos exports versionados. Não instala Torch, não cria o índice e não precisa de chave Gemini.

## Preparar a implementação

[Baixar código do RAG](../assets/downloads/codigo-piloto.zip){ .md-button .md-button--primary }

O pacote contém código atual, configuração, catálogo e dependências. Não contém originais, dados privados, índice ou modelo. Com a pasta completa do projeto já preparada, basta iniciar a API; não repetir a ingestão em toda inicialização.

Em um ambiente novo, Python 3.13 foi a versão registrada:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
$env:PYTHONPATH = 'src'
```

`requirements.lock.txt` registra as versões do ambiente utilizado. A instalação de Torch/E5 demanda espaço, memória e download inicial; não é uma aplicação inteiramente offline com Gemini.

## Reconstruir a base, quando necessário

```powershell
.\.venv\Scripts\python.exe scripts/01_adquirir.py
.\.venv\Scripts\python.exe scripts/02_extrair.py
.\.venv\Scripts\python.exe scripts/03_validar_catalogo.py
.\.venv\Scripts\python.exe scripts/04_chunks.py
.\.venv\Scripts\python.exe scripts/05_indexar.py
.\.venv\Scripts\python.exe scripts/06_conferir.py
```

Confira bloqueios e conteúdo extraído. Os nomes dos artefatos e as regras estão em `config/rag.yaml`. Os registros de aprovação preservam a decisão da execução documentada; material atualizado exige revisão da nova versão. Nova aquisição pode encontrar páginas diferentes, então 174 chunks não é uma promessa para qualquer data.

Para reconstruir **exatamente** a execução documentada, é preciso receber os originais e artefatos daquela versão por um meio autorizado. Eles não são redistribuídos no ZIP público.

## Consultar sem Gemini

```powershell
$env:PYTHONPATH = 'src'
.\.venv\Scripts\python.exe scripts/perguntar.py "Qual é a localização do LEMA?"
```

Exibe a recuperação atual, IDs, fontes, seções, versões e distâncias. Não chama o gerador. Depois de o modelo estar em cache, a busca pode funcionar localmente.

## Iniciar a API e o PWA

Defina `GEMINI_API_KEY` somente no ambiente do backend. O servidor aceita um `.env` próprio ou o argumento `--env-file` para ler um arquivo já configurado, sem copiar sua chave para o frontend.

```powershell
# Na pasta unb-gama-rag, ambiente local já configurado
.\.venv\Scripts\python.exe scripts/servir.py
```

Na organização local existente, também é possível reutilizar explicitamente o arquivo da coleta:

```powershell
.\.venv\Scripts\python.exe scripts/servir.py --env-file ..\coleta-fcte\.env
```

Em outro terminal, na pasta `fcte-campus`:

```powershell
npm.cmd install
npm.cmd run dev
```

Abra `http://127.0.0.1:5173/` e entre em **Assistente**. A saúde da API é `http://127.0.0.1:8001/api/v1/health`. O Vite encaminha `/api/rag/chat` para `/api/v1/chat`. O PWA é um projeto separado e não está contido no ZIP da implementação Python.

Se a porta 5173 já estiver em uso pelo PWA, use a instância aberta. Reinicie a API após mudanças no código. Para verificar a correção, pergunte sobre espaços da biblioteca e depois “e cabines de estudo individual?”. Iniciar nova conversa limpa a referência anterior.

## Avaliar

```powershell
# Chama Gemini real; repete somente falhas técnicas e preserva todas as tentativas
.\.venv\Scripts\python.exe scripts/avaliar_rag.py executar --max-tentativas 5 --intervalo 8

# Reabrir e consultar o banco em processos novos, sem ingestão nem Gemini
.\.venv\Scripts\python.exe scripts/avaliar_rag.py persistencia avaliacao/resultados/PASTA_DA_RODADA

# Depois de preencher julgamentos da rodada e registrar persistência
.\.venv\Scripts\python.exe scripts/avaliar_rag.py calcular avaliacao/resultados/PASTA_DA_RODADA
```

O modo `--retomar avaliacao/resultados/PASTA_DA_RODADA` continua apenas questões sem saída válida, conferindo se a configuração foi preservada. Uma resposta incorreta ou insuficiente não é refeita para melhorar a nota. Sem opções, o padrão continua uma tentativa por questão.

Não execute novas chamadas apenas para reproduzir o Pages. O cálculo não cria julgamentos semânticos automaticamente. O [gabarito](../assets/downloads/gabarito.json) e as [métricas já medidas](avaliacao.md) estão disponíveis para inspeção.

## Gerar e publicar esta documentação

Na raiz de `residencia-grupo-9`:

```powershell
.\.venv\Scripts\python.exe scripts/sync_evidence.py --rag-root ../unb-gama-rag
.\.venv\Scripts\python.exe -m mkdocs build --strict
.\.venv\Scripts\python.exe -m mkdocs serve -a 127.0.0.1:8002
```

O sincronizador lê artefatos existentes, confere integridade e exporta apenas o conjunto público permitido. Não executa inferência nem copia credenciais. O workflow do Pages usa os exports já commitados e dispensa a pasta vizinha.

Um push na `main` dispara **Publicar documentação** no GitHub Actions; o Pages está configurado para receber o artefato desse workflow. O `site/` gerado não deve ser commitado. A URL final é `https://muniz2811.github.io/residencia-grupo-9/`.
