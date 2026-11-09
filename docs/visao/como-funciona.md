---
template: presentation.html
hide:
  - navigation
  - toc
---

# Como funciona

Escolha um cenário e clique em **▶ Reproduzir** ou avance com **▶|**. Cada passo destaca os componentes do diagrama e anima os dados percorrendo as setas. A estrutura SVG, os controles e os efeitos foram adaptados diretamente do Grupo 04 ao nosso piloto.

<div class="rm-fluxo" data-fluxo data-cenario="1" tabindex="0" aria-label="Diagrama animado do Coleta FCTE e integração proposta"></div>

!!! info "Uma apresentação do projeto"
    Os controles animam o diagrama localmente. Não enviam fotos, não chamam Gemini e não executam consultas. A preparação foi executada até os embeddings; consulta RAG e integração entre grupos permanecem planejadas. O aplicativo de coleta está documentado no [fluxo de coleta](../coleta/fluxo.md).

## Quatro cenários

| Percurso | O que acompanha | Situação |
|---|---|---|
| Antes das perguntas: ingestão | Fontes → extração e chunks → embeddings → futura persistência | Executado até os embeddings; Chroma pendente |
| Consulta do campus | Pergunta → embedding → busca → contexto → resposta com fontes | Arquitetura planejada; embeddings dos documentos já preparados |
| Integração com o Grupo 04 | Encaminhamento ao módulo responsável e composição com fontes identificadas | Proposta de colaboração, sem orquestrador comum implementado |
| Pergunta sem base | Ausência de ocupação atual de sala → reconhecimento da limitação | Comportamento esperado, ainda não avaliado |

Use **▶ Reproduzir**, **◀**, **▶|** e **Tela cheia**. Com foco na apresentação, as setas do teclado navegam e Home/End selecionam início/fim. Movimento reduzido desativa o movimento dos pacotes.

A [Entrega 1](../entrega-1/index.md) concentra as definições do projeto. A [arquitetura técnica](../entrega-2/arquitetura.md) detalha separação entre coleta, dados geográficos e RAG. Continue na [esteira RAG animada](esteira-rag.md).
