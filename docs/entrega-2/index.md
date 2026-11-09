# Entrega 2 · Conhecimento e preparação do RAG

O enunciado pede uma base curada, vinte documentos-fonte, estratégias de indexação, banco vetorial e demonstração fundamentada. **A entrega completa ainda está em andamento.** Esta documentação registra o estágio efetivamente executado.

## Correspondência com os requisitos

| Requisito | Evidência atual | Situação |
|---|---|---|
| Base de conhecimento curada | Aquisição e preparação de um recorte, com limitações | Em andamento |
| Mínimo de 20 documentos-fonte | 27 HTMLs adquiridos; cinco HTMLs e um KML preparados | Curadoria mínima ainda pendente |
| Estratégia de chunking | Regras por estrutura/entidade e 79 chunks | Executada no piloto |
| Estratégia de embeddings | E5 fixado; 79 vetores de 384 dimensões | Executada no piloto |
| Banco vetorial | Chroma persistido é a proposta | Não implementado |
| Consulta submetida | Roteiro e perguntas candidatas | Não executada como RAG |
| Recuperação dos chunks | Vetores disponíveis para a etapa seguinte | Não executada |
| Resposta fundamentada | Estratégia de contexto e citações | Não executada |
| Evidência das fontes da resposta | Rastreabilidade dos chunks já preparada | Falta resposta real com referências |
| Diagrama de arquitetura | Componentes atuais e propostos identificados | Documentado |
| Pipeline de ingestão | Aquisição, preparação e embeddings registrados | Documentado e parcialmente executado |

!!! warning "Contagens diferentes"
    27 HTMLs salvos não são 27 textos aprovados. Os 79 chunks vieram de **seis fontes do piloto**, contando o KML uma vez. Ainda não há vinte documentos curados, coleção vetorial ou taxa de acerto de recuperação medida.

## Resultado observado

<div class="fcte-status-grid">
  <div class="fcte-status"><strong>79 chunks</strong><span>68 dos cinco HTMLs e 11 do KML</span></div>
  <div class="fcte-status"><strong>79 × 384</strong><span>Matriz de embeddings locais normalizados</span></div>
  <div class="fcte-status fcte-status--pending"><strong>Próximo: Chroma</strong><span>Persistência e consulta ainda pendentes</span></div>
</div>

Os documentos estão em [base de conhecimento](base-de-conhecimento.md). As decisões de tamanho e contexto estão em [chunking](chunking.md), e os parâmetros usados em [embeddings](embeddings.md). Os [exploradores de evidências](evidencias.md) leem artefatos existentes.
