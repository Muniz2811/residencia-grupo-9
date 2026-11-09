# Diagrama de arquitetura

## Componentes já executados

```mermaid
flowchart TD
    WEB[Páginas institucionais] --> EXP[export_html.py]
    EXP --> HTML[27 HTMLs e manifesto]
    HTML --> SEL[Seleção de cinco documentos]
    KML[KML fornecido pela equipe] --> PREP[prepare_pilot.py]
    SEL --> PREP
    PREP --> DOC[Documentos preparados com seções e origem]
    PREP --> GEO[14 pontos GeoJSON]
    DOC --> CH[79 chunks de rascunho]
    CH --> ENC[embed_pilot.py e E5 local]
    ENC --> NPY[79 vetores de 384 dimensões]
    ENC --> ROW[Correspondência linha e chunk_id]
    ENC --> MAN[Manifesto e verificações técnicas]
```

Essa parte foi executada. Não contém geração de respostas, busca vetorial ou chamadas ao Gemini. O corpus fica local durante a codificação; o Hub foi usado para obter os arquivos públicos do modelo.

## Arquitetura RAG proposta

```mermaid
flowchart TD
    APPROVE[Curadoria e aprovação] -.-> IDX[Chroma persistido]
    CH[Chunks e metadados] -.-> IDX
    V[Embeddings existentes] -.-> IDX
    Q[Pergunta] -.-> QE[E5 com prefixo query]
    QE -.-> RET[Recuperação e filtros]
    IDX -.-> RET
    RET -.-> CTX[Contexto com IDs e fontes]
    CTX -.-> GEN[Gemini gerador proposto]
    Q -.-> GEN
    GEN -.-> CHECK[Conferência de citações e suporte]
    CHECK -.-> OUT[Resposta fundamentada ou ausência de base]
    RET -.-> LOG[Registro da execução]
    OUT -.-> LOG
```

As setas tracejadas representam etapas ainda pendentes. O gerador receberá evidências recuperadas em cada pergunta; isso não altera seus pesos nem torna o modelo um cadastro permanente do campus.

## Relação com o aplicativo de coleta

```mermaid
flowchart LR
    USER[Equipe em campo] --> APP[Aplicativo de coleta]
    APP --> STORE[Fotos e registros privados]
    STORE --> SNAP[Exportação versionada]
    SNAP --> REVIEW[Curadoria da ficha textual]
    REVIEW -.-> CORPUS[Corpus do RAG]
    MAP[Mapeamento da equipe] --> GEO[Inventário geográfico]
    GEO -. Vínculos por IDs .-> CORPUS
```

O pipeline RAG não escreve no banco de produção da coleta nesta etapa. Fotos não são reenviadas a um modelo em cada consulta textual. A integração com o Grupo 04 aparece como [proposta de colaboração](../visao/escopo.md), independente da implementação interna acima.
