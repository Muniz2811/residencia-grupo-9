---
template: presentation.html
hide:
  - navigation
  - toc
---

# Como o FCTE Campus funciona

Escolha um cenário e clique em **▶ Reproduzir** ou avance com **▶|**. Cada passo destaca os componentes e anima os dados nas setas. A identidade e os efeitos seguem a referência do Grupo 04, com conteúdo da nossa implementação.

<div class="rm-fluxo" data-fluxo data-cenario="1" tabindex="0" aria-label="Diagrama animado do RAG local e integração futura"></div>

!!! info "Implementado e proposto aparecem separados"
    O **PWA, a API RAG local, a busca híbrida, o Chroma e a geração Gemini estão implementados**. A consulta do Grupo 09 vai diretamente do PWA à API, sem passar pelo orquestrador. A conexão comum com RU e disciplinas do Grupo 04 permanece proposta. Esta animação reproduz registros e não chama os serviços.

## Quatro cenários

| Percurso | O que acompanha | Situação |
|---|---|---|
| Ingestão | Catálogo → original → chunks → embeddings → Chroma | 37 fontes e 174 registros persistidos |
| Consulta do Grupo 09 | PWA → API → busca → Gemini → resposta com fontes | Execução real da localização do LEMA |
| Integração dos grupos | Encaminhamento e composição de fontes por domínio | Proposta; orquestrador comum não implementado |
| Pergunta sem dado atual | Consulta sobre ocupação da I10 → insuficiência | Registro real da reavaliação híbrida completa |

Use **◀**, **▶|**, **Tela cheia** ou o teclado. Movimento reduzido desativa o deslocamento dos pacotes. As setas representam etapas do fluxo, não velocidades ou latências medidas.

A [esteira do RAG](esteira-rag.md) detalha cada transformação. A [Entrega 2](../entrega-2/index.md) reúne artefatos, [demonstrações](../entrega-2/demonstracao.md), [arquitetura](../entrega-2/arquitetura.md) e [avaliação](../entrega-2/avaliacao.md). A definição do projeto continua na [Entrega 1](../entrega-1/index.md).
