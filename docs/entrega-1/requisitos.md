# Requisitos funcionais e não funcionais

**P0:** essencial ao MVP proposto. **P1:** desejável, conforme tempo e dados. **P2:** evolução futura. Prioridade não comprova implementação; requisitos e critérios precisam ser validados.

Os IDs do documento-base foram preservados. RF01–RF23 se relacionam aos temas do questionário citado; RF24–RF27 detalham ideias do brainstorming. A situação deverá ser registrada como proposta, validada, adiada ou descartada, com evidência anônima e dependências.

## Épicos

| Épico | História de usuário | Requisitos |
|---|---|---|
| E1 · Mapa e orientação | Como estudante, quero localizar salas e serviços | RF01–RF03 |
| E2 · Estudo e descanso | Quero comparar ambientes pelos recursos de que preciso | RF04–RF05 |
| E3 · Alimentação e RU | Quero consultar refeições e informações de alimentação | RF06–RF08, RF25–RF26; frente externa/integração |
| E4 · Conhecimento com RAG | Quero perguntar e conferir as evidências | RF09–RF11 |
| E5 · Coleta e manutenção | Quero coletar, revisar e manter os registros | RF12–RF15 |
| E6 · Transporte e caronas | Quero planejar o deslocamento até o campus | RF16–RF17 |
| E7 · Grade e intervalos | Quero opções compatíveis com meus horários | RF18–RF20, RF24 |
| E8 · Acessibilidade e trajetos | Quero conhecer características verificadas dos espaços | RF21–RF23, RF27 |

## Requisitos funcionais

### E1 · Mapa e orientação no campus

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF01 | P0 | Busca de locais | Buscar por nome/código e retornar identificação; sem correspondência, informar que o local não foi encontrado |
| RF02 | P0 | Local no mapa | Exibir posição, prédio, andar quando conhecido e referências de acesso, com data e origem |
| RF03 | P1 | Caminhos cadastrados | Mostrar somente trajetos com trechos conectados e revisados; declarar ausência de cobertura |

### E2 · Espaços de estudo e descanso

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF04 | P0 | Filtros por recursos | Filtrar atributos confirmados; distinguir presença, funcionamento e disponibilidade |
| RF05 | P0 | Ficha do espaço | Exibir foto, identificação, prédio, andar, recursos e última revisão; manter campos desconhecidos explícitos |

### E3 · Alimentação e restaurante universitário

O conteúdo alimentar é frente do Grupo 04. As ideias abaixo permanecem rastreadas como requisitos da visão original ou dependências futuras; **não constituem compromisso de implementação do Grupo 09 ou confirmação de que o outro grupo as aprovou**.

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF06 | P1 | Consulta do cardápio | Preservar campus, data e refeição; não apresentar outra semana como atual |
| RF07 | P1 | Fonte e validade | Mostrar origem/período e ausência de informação válida ou possibilidade de alteração |
| RF08 | P2 | Avaliações de refeições | Associar à preparação e data, mostrar quantidade e permitir denúncia de conteúdo inadequado |
| RF25 | P2 | Informação nutricional | Usar ficha técnica e porção conhecidas, ou estimativa identificada com método e fonte; sem inferência pelo nome do prato |
| RF26 | P2 | Estimativa de movimento | Se validado, começar com relatos voluntários de fila, com horário e amostra; não apresentar contagem exata do RU |

### E4 · Consulta ao conhecimento com RAG

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF09 | P0 | Recuperação | Buscar documentos e fichas aprovadas sob filtros de campus, data e revisão; exibir trechos |
| RF10 | P0 | Resposta com evidências | Responder com conteúdo recuperado e fontes/datas que sustentem as afirmações; distinguir IA e confirmação humana |
| RF11 | P0 | Limitação da resposta | Declarar insuficiência, invalidade ou conflito, sem completar lacunas por suposição |

### E5 · Coleta e manutenção do mapa

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF12 | P0 | Foto e localização | Salvar foto, ID, data e ponto confirmado obrigatório. GPS é opcional; permissão negada permite marcar ou digitar coordenadas manualmente |
| RF13 | P0 | Correção do local | Permitir corrigir prédio, andar e coordenada, preservando posição original e alteração; GPS não identifica sala |
| RF14 | P0 | Análise e revisão | Separar sugestão e descrição revisada, com modelo e data; somente aprovados entram na base verificada |
| RF15 | P0 | Exportação e exclusão | Exportar dados/fotos com vínculos e IDs; excluir com autorização e conferir restauração de cópia de verificação |

RF12 foi atualizado conforme a decisão vigente: não é permitido salvar uma coleta sem coordenadas. Isso preserva a alternativa manual sem tornar obrigatório o GPS do dispositivo.

### E6 · Transporte e caronas

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF16 | P2 | Transporte público | Consultar por origem, destino e data; mostrar fonte e horários programados, estimativa de chegada quando sustentada e caminhada. Posição atual dos ônibus está fora do recorte |
| RF17 | P2 | Compatibilidade de caronas | Com adesão voluntária, comparar região aproximada e horários; exigir interesse mútuo para liberar contato; nunca divulgar endereço exato |

Uma saída de terminal não equivale à passagem em parada intermediária. Passagem e chegada dependem de tempos por parada ou percurso identificados.

### E7 · Grade e aproveitamento dos intervalos

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF18 | P2 | Horários pessoais | Registrar/corrigir dias, horários e locais; detectar sobreposição; permitir uso sem histórico acadêmico |
| RF19 | P2 | Sugestões no intervalo | Considerar preferências, tempo e deslocamento antes/depois da opção |
| RF20 | P2 | Sugestão de disciplinas | Dependência do módulo acadêmico: considerar currículo, oferta, requisitos, horários e campi; explicar sem garantir vaga/matrícula |
| RF24 | P2 | Importação do histórico | Ideia fora do MVP, a reavaliar com a frente acadêmica; envio voluntário, conferência e exclusão, sem solicitar senha do SIGAA |

RF18 e RF19 são possibilidades futuras de uso do tempo. RF20 e RF24 não ampliam o piloto de mapeamento nem significam acesso ao SIGAA. Regras de disciplinas pertencem ao recorte do Grupo 04.

### E8 · Acessibilidade e trajetos

| ID | Prioridade | Capacidade | Critério de aceite proposto |
|---|---|---|---|
| RF21 | P1 | Características de acesso | Consultar rampas, escadas e obstáculos com origem/data; não presumir acessibilidade completa por uma rampa |
| RF22 | P1 | Iluminação e apoio | Mostrar condições verificadas e desconhecidas, sem garantir segurança de percurso |
| RF23 | P0 | Dados desatualizados | Mostrar revisão e sinalizar validade por tipo; ausência de dado não significa ausência do recurso |
| RF27 | P2 | Relatos de infraestrutura | Registrar obstáculo ou iluminação com data/status de verificação e sem dados pessoais desnecessários |

## Requisitos não funcionais

| ID | Prioridade | Requisito | Critério proposto |
|---|---|---|---|
| RNF01 | P0 | Usabilidade e acessibilidade | Celular com legibilidade, rótulos e contraste; não depender só de cor; validar três tarefas com estudantes |
| RNF02 | P0 | Privacidade e acesso | GPS opcional com alternativa manual, dados mínimos, edição autenticada e proteção de fotos/chaves; verificar bloqueio de alteração sem permissão |
| RNF03 | P0 | Persistência e portabilidade | Sobreviver a reinício/deploy e restaurar export de registros/arquivos preservando vínculos |
| RNF04 | P0 | Rastreabilidade | Guardar fonte, datas, revisão e versão de análise; distinguir confirmado, sugerido e desconhecido |
| RNF05 | P0 | Conectividade e desempenho | Informar envio/falha/confirmação, medir em aparelho/rede de referência e não prometer offline não implementado |
| RNF06 | P0 | Manutenção e verificação | Separar interface, persistência, busca e provedores; registrar conferências. Eventual automação não chama APIs pagas |
| RNF07 | P0 | Qualidade dos dados | Validar imagem, coordenada e campos; identificar pendências e conferir rejeições/mensagens |
| RNF08 | P0 | Reprodução e documentação | Versionar código/esquema, parâmetros e índice; documentar instalação, exportação e demonstração |
| RNF09 | P0 | Compatibilidade e custo | Navegadores móveis modernos e HTTPS; acompanhar armazenamento/chamadas e limites configurados |

A preferência vigente é por verificação manual registrada, sem nova suíte automatizada nesta etapa. A senha compartilhada da coleta não equivale a contas individuais ou consentimento de caronas. A existência de adaptadores de persistência também não comprova restauração já validada.

O [estado da implementação](../entrega-2/index.md) e as [métricas propostas](metricas.md) complementam esta definição.
