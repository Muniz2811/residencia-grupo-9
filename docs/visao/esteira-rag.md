---
template: presentation.html
hide:
  - navigation
  - toc
---

# Esteira do RAG

O conhecimento percorre duas fases: **ingestão**, que prepara as fontes, e **consulta**, que recuperará evidências para uma pergunta. A animação usa contagens, IDs, excertos e componentes de vetores exportados do piloto.

Clique em **▶ Reproduzir** para percorrer as duas fases ou selecione uma estação. Na fase de pergunta, escolha COSMOS, biblioteca ou ausência de dados atuais. As setas **← →** também navegam e **Tela cheia** abre o modo de apresentação.

<div class="rm-est" data-esteira tabindex="0" aria-label="Esteira animada do RAG do Coleta FCTE"></div>

!!! warning "Estado real do trabalho"
    Foram preparados 79 chunks e seus embeddings. Chroma, embedding da pergunta, recuperação e geração de resposta ainda não foram executados. Os exemplos de consulta são gabaritos propostos; não há ranking, similaridades ou respostas geradas apresentados como resultados.

## Da fonte ao vetor

1. Preservar HTMLs e o KML com origem e hash.
2. Selecionar conteúdo pertinente e extrair seções, setores e laboratórios.
3. Preservar os 14 marcadores e selecionar 11 para o recorte textual.
4. Preparar 79 chunks com vínculos até fonte, seção e trecho.
5. Gerar embeddings locais E5 de 384 dimensões com prefixo `passage: ` e normalização L2.
6. Persistir o índice no Chroma e verificar sua reabertura — próxima etapa.

## Da pergunta à resposta

A pergunta receberá o prefixo `query: ` e será vetorizada com o mesmo modelo. A busca deverá selecionar evidências pertinentes, considerando metadados. O gerador receberá somente a pergunta e o contexto identificado e deverá citar as fontes ou reconhecer a ausência de dados.

O KML oferece pontos de referência; não comprova acessibilidade, rota de caminhada ou identificação de salas. A busca textual e cálculos geográficos têm funções distintas.

Os controles são locais e não consomem API. Consulte [chunking](../entrega-2/chunking.md), [embeddings](../entrega-2/embeddings.md), [avaliação](../entrega-2/avaliacao.md) e [evidências exportadas](../entrega-2/evidencias.md) para os detalhes reproduzíveis.
