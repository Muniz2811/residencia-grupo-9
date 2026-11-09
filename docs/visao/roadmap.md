# Etapas e decisões

O trabalho avança por etapas. Esta é a sequência observada no projeto; não é uma declaração de que todas as entregas acadêmicas já foram concluídas.

| Etapa | Resultado | Situação |
|---|---|---|
| Coleta de ambientes | Interface mobile, GPS confirmado, análise opcional e revisão | Implementada |
| Aquisição documental | 27 HTMLs preservados com metadados e hashes | Executada |
| Seleção do piloto | Cinco HTMLs e um KML | Executada |
| Preparação | Unidades por seção/entidade; ambiguidades registradas | Executada como rascunho |
| Chunking | 79 chunks com origem e contagem real de tokens | Executado |
| Embeddings | Matriz 79 × 384, normalização e correspondência por ID | Executados |
| Curadoria final | Aprovação e vigência do conjunto mínimo de vinte documentos | Pendente |
| Banco vetorial | Coleção persistida e reabertura demonstrada | Pendente |
| Consulta e resposta | Recuperação, geração fundamentada e fontes | Pendente |
| Avaliação | Perguntas/gabaritos e métricas observadas | Pendente |

## Decisões que delimitam o piloto

- Fotos ficam como evidência; o primeiro índice será textual.
- A descrição sugerida pela IA não vira automaticamente uma observação humana.
- Não há envio de prints de mapas ao Gemini para identificar prédios.
- O KML é uma fonte, mesmo quando gera vários marcadores ou chunks.
- A sobreposição só será usada ao subdividir a mesma seção; foi zero neste recorte.
- Embeddings são locais e separados do modelo gerador.
- A integração entre grupos será uma evolução, preservando entregas independentes.

## Próximo marco técnico

O próximo marco do RAG é implementar persistência e consulta vetorial. Depois virão a geração com fontes e a avaliação manual registrada. A implementação está pausada enquanto esta documentação é organizada.

Antes de ampliar a base, também precisaremos tratar a FAQ em Word, identificar os dois laboratórios genéricos do KML e conferir associações e vigências dos locais.
