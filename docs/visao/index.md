# Visão do projeto

O **Coleta FCTE** parte de uma necessidade simples: ajudar quem circula pelo campus Gama a encontrar informações sobre locais e serviços, sabendo de onde cada informação veio.

Uma descrição de um ambiente, o nome de um prédio e um ponto no mapa cumprem papéis diferentes. O projeto relaciona essas evidências por identificadores, preservando origem, data e limitações.

## Três componentes complementares

| Componente | Responsabilidade | Situação |
|---|---|---|
| Aplicativo de coleta | Registrar foto, localização e descrição revisada | Implementado no projeto de coleta |
| Catálogo geográfico | Organizar marcadores e associações de locais | Piloto com KML e GeoJSON |
| Mecanismo RAG | Recuperar conteúdo textual e responder com fontes | Preparação e embeddings executados; consulta pendente |

O aplicativo de coleta e o piloto RAG são projetos independentes. O segundo recebe dados por exportação, sem precisar escrever no banco de produção do primeiro.

## Explore o funcionamento

- [Como funciona · apresentação animada](como-funciona.md): acompanhe coleta, consulta planejada e integração proposta entre os grupos.
- [Esteira do RAG · apresentação animada](esteira-rag.md): avance das fontes aos vetores reais e entenda as próximas etapas de consulta.
- [Escopo e integração](escopo.md): responsabilidades de cada frente e limites atuais.
- [Etapas e decisões](roadmap.md): decisões tomadas e próximos passos.

## Onde está a definição do projeto?

O cenário, problema, stakeholders, personas, requisitos, riscos, premissas, métricas, guiding questions e a Essential Question estão reunidos na [Entrega 1 · Pacote de definição do projeto](../entrega-1/index.md). A [Entrega 2](../entrega-2/index.md) concentra preparação, estratégias e evidências técnicas do RAG.
