# Etapas e decisões

## Estado em 11/11/2026

| Etapa | Resultado | Situação |
|---|---|---|
| Coleta | Interface mobile, GPS, análise e revisão | Projeto separado implementado |
| Mapeamento | 14 pontos da equipe preservados | Inventário separado do índice atual |
| Curadoria | 27 aprovações expressas, duas aquisições bloqueadas | 25 fontes utilizáveis |
| Extração e chunking | Estrutura por seções, 94 chunks | Executados |
| Embeddings | E5 local, matriz 94 × 384 | Executados |
| Banco vetorial | Chroma e manifesto da coleção ativa | Persistido e reaberto sem ingestão |
| Consulta e geração | API + chat do PWA, Gemini e fontes | Implementados |
| Avaliação inicial | 15 perguntas com rubrica e julgamento assistido | Resultados e falhas registrados |
| Correção posterior | BM25/RRF e contexto curto | Cabines e LEMA verificados em chamadas reais |
| Orquestrador comum | Integração com o Grupo 04 | Proposta futura |

O retrato anterior de 79 chunks com cinco HTMLs e um KML é histórico. Não deve ser somado à coleção ativa nem aparecer como estado atual.

## Decisões preservadas

- Fotos não entram no índice textual; sugestões de IA não viram confirmação humana automaticamente.
- KML e geografia serão integrados por contrato, sem inventar salas a partir de coordenadas.
- Não enviamos print de mapa ao Gemini para identificar prédios.
- E5 representa texto localmente; Gemini gera resposta com evidências e depende de internet/cota.
- O índice é derivado, versionado e reconstruível. A coleta mantém seu armazenamento independente.
- A avaliação inicial densa fica preservada após a correção híbrida; não reutilizamos suas notas como resultado novo.

## Próximos passos de qualidade

Medir a configuração híbrida sob protocolo congelado, revisar ruído e vigência, investigar granularidade dos diretórios, fazer revisão humana dos julgamentos e reservar perguntas novas. Ingerir fichas/KML só depois de revisão e rastreabilidade próprias. Rotas, transporte programado estruturado e o orquestrador são evoluções do produto.
