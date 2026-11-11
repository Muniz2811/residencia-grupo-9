---
template: presentation.html
hide:
  - navigation
  - toc
---

# A esteira do RAG, passo a passo

O conhecimento percorre duas fases: **ingestão**, que prepara documentos, chunks, embeddings e o Chroma persistente, e **consulta**, que recupera evidências e gera uma resposta com fontes. Pense numa biblioteca: primeiro organizamos o catálogo; depois o atendente procura as fichas para cada pergunta.

Clique em **▶ Reproduzir**, avance com **▶|** ou selecione uma estação. Na fase de pergunta, escolha LEMA, cabines, COSMOS ou ausência de dados atuais. As setas **← →** também navegam; **Tela cheia** abre o modo de apresentação.

Na fase **Pergunta**, acompanhe a mensagem sendo digitada, a busca dos trechos, o ranking e a montagem do contexto. Ao final, o **Assistente FCTE responde em um chat animado**, com cartões para abrir as fontes citadas.

<div class="rm-est" data-esteira tabindex="0" aria-label="Esteira animada da ingestão e consulta do RAG FCTE"></div>

!!! info "Registros reais, reprodução estática"
    Contagens, chunks e componentes vetoriais são dos artefatos atuais: **25 fontes, 94 chunks e 384 dimensões**. LEMA e cabines usam registros da correção híbrida; COSMOS e ausência usam a avaliação inicial densa, com identificação em cada cenário. Os controles não chamam a API nem consomem cota Gemini.

## Da fonte ao banco

1. Catalogar 27 fontes aprovadas; excluir da indexação as duas com aquisição bloqueada.
2. Preservar original, versão e SHA-256; extrair títulos e parágrafos.
3. Gerar 94 chunks: alvo 300 tokens, até 40 de sobreposição somente em subdivisões, sem misturar fontes.
4. Codificar com E5 local, `passage: `, 384 dimensões e normalização L2.
5. Persistir no Chroma e conferir a reabertura sem repetir a ingestão.

## Da pergunta à resposta

A aplicação pode recuperar o assunto da consulta anterior em complementos curtos. A pergunta recebe `query: ` e é codificada com o mesmo E5. A busca atual combina cosseno e BM25 por RRF; o gerador recebe até cinco trechos identificados. O backend confere os IDs citados e registra o resultado.

O histórico ajuda a entender a pergunta, mas não substitui evidência. Quando o contexto não sustenta a resposta, o sistema deve reconhecer insuficiência nos trechos recuperados. O índice não fornece ocupação ao vivo ou trajeto entre prédios.

!!! warning "Interpretação visual"
    Barras mostram componentes reais de um vetor de documento. Os pontos agrupados por fonte são um esquema ilustrativo, não uma projeção calculada dos embeddings ou mapa geográfico. Não desenhamos valores inventados para o vetor da pergunta, cujos componentes não foram exportados.

Continue na [demonstração com rankings e fontes](../entrega-2/demonstracao.md), nos [resultados medidos](../entrega-2/avaliacao.md), na [estratégia de chunking](../entrega-2/chunking.md) ou no [banco vetorial](../entrega-2/banco-vetorial.md).
