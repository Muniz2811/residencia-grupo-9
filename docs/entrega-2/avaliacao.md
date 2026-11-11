# Avaliação executada e métricas

## O que foi avaliado

Rodada `20261111T151703Z`, em **11/11/2026, aproximadamente 12h17–12h19 de Brasília**. Quinze perguntas, uma tentativa por pergunta, sem retries automáticos ou seleção da melhor resposta. Gabarito, rubrica e metas foram registrados antes das chamadas.

| Grupo | Quantidade |
|---|---:|
| Respondíveis: diretas, paráfrases, siglas e serviços | 10 |
| Respondíveis com premissa incorreta | 2 |
| Sem resposta na base: dados atuais de ocupação ou transporte | 3 |
| Total | **15** |

A configuração avaliada foi E5 + Chroma, **busca densa**, 30 candidatos, até cinco trechos, máximo dois por fonte, perguntas independentes, prompt `campus-rag-v1`. Gerador `gemini-3.5-flash-lite`, temperatura 0,1. Base de 25 fontes e 94 chunks.

O julgamento foi feito por **Codex como avaliador assistido único**, lendo respostas e trechos. Não houve dupla revisão humana nem concordância entre avaliadores. O conjunto é diagnóstico, escolhido conhecendo o corpus; alguns exemplos já tinham aparecido na conversa. Não é teste cego de generalização.

!!! warning "Separar as versões"
    Depois dessa rodada corrigimos a busca com BM25/RRF e contexto curto de conversa. Três verificações reais confirmaram cabines com/sem contexto e localização do LEMA. **Os percentuais abaixo são da versão anterior**, não uma nota automática da busca híbrida atual.

## Fórmulas, interpretação e resultados

| Aspecto | Fórmula usada | Conta real | Resultado | Meta local |
|---|---|---|---:|---:|
| Recuperação · Hit@5 | Perguntas respondíveis com ≥1 trecho relevante ÷ respondíveis | 11/12 | **91,67%** | ≥80% |
| Precisão dos trechos, geral | Trechos relevantes ÷ retornados, nas 15 perguntas | 16/75 | **21,33%** | ≥40% |
| Precisão nas respondíveis | Trechos relevantes ÷ retornados, nas 12 respondíveis | 16/60 | **26,67%** | ≥50% |
| Fundamentação | Fatos sustentados pelos trechos citados ÷ fatos produzidos | 35/35 | **100%** | ≥95% |
| Rastreabilidade | Vínculos de citação resolvidos até fonte/versão ÷ emitidos | 14/14 | **100%** | 100% |
| Reconhecimento de ausência | Ausências corretamente declaradas ÷ perguntas sem resposta | 2/3 | **66,67%** | 100% |
| Persistência | Reabertura e consulta em processo novo, sem ingestão | Sucesso | **1** | 1 |

As metas foram locais, definidas antes da rodada. Não são padrões universais da literatura. Recuperação, fundamentação, rastreabilidade e persistência atingiram suas metas nesta amostra. Precisão e ausência ponta a ponta não atingiram.

A fórmula chamada de taxa de recuperação no plano é **Hit@5**: conta perguntas com ao menos um acerto. Recall@5 clássico exigiria contar todas as evidências relevantes existentes e qual fração foi recuperada. Não trocamos as definições.

## Regras de julgamento

**Relevância:** conter evidência específica para pelo menos parte da pergunta ou para corrigir a premissa. Mencionar o mesmo assunto ou aparecer na fonte correta não basta. Evidência parcial pode ser relevante sem permitir resposta completa.

**Fundamentação:** decompor a resposta em fatos verificáveis e avaliar o suporte nos chunks citados. “LDTEA, segundo andar, sala 304” contém três fatos. Não confundir omissão com invenção. Mensagens de incapacidade sem fato externo adicional não entram no denominador; denominador zero é não aplicável, não 100%.

**Rastreabilidade:** contar cada ligação afirmação–chunk, mesmo quando uma fonte reaparece. Conferimos ID, texto, fonte, seção, versão, URL e hash do original nos artefatos locais. Resolver o ID não prova que a fonte sustenta a afirmação.

**Ausência:** exigir admissão da falta do dado sem inventar resposta. Erro HTTP não é abstenção correta. Recusar uma pergunta respondível é falha de cobertura.

O gabarito inicial não era exaustivo quanto às fontes. Evidência adicional pertinente, como DOC-002 para localizar a biblioteca, foi aceita após leitura e registrada, sem reescrever o gabarito para esconder essa descoberta.

## Uma leitura simples dos números

Na Q06, a evidência sobre cabines apareceu em primeiro lugar, mas os quatro trechos restantes não respondiam à questão. Houve acerto de recuperação, com precisão **1/5 = 20%**. A resposta continha dois fatos sustentados: cabines individuais e mesas em grupo.

Na Q03, a localização do LEMA existia no diretório, mas não veio ao top-5. O Gemini evitou inventar uma sala, porém o sistema deixou de responder algo que poderia responder.

Na Q01, a localização do COSMOS veio em segundo lugar e o Gemini excedeu 90 segundos. Recuperação acertou; disponibilidade falhou. Não houve fato gerado para julgar fundamentação.

## Falhas técnicas e cobertura

- **11/15 respostas HTTP 200, 73,33%.** Houve um timeout e três indisponibilidades do provedor na geração. Os registros não isolam a causa externa; não atribuímos tudo à conexão do usuário.
- **8/12 perguntas respondíveis atendidas completamente, 66,67%.** Três falhas técnicas e uma abstenção indevida explicam as quatro ausentes.
- Duas premissas erradas foram corrigidas, **2/2**.
- Entre as perguntas sem resposta que receberam saída válida houve duas abstenções corretas, **2/2**. O resultado ponta a ponta permanece **2/3**, incluindo a falha técnica.

**35/35 de fundamentação não significa 100% das perguntas respondidas corretamente.** É a proporção de fatos sustentados entre os fatos que chegaram a ser produzidos, neste julgamento e amostra.

## Quinze perguntas e resultados da versão inicial

Esta tabela é o **registro histórico da primeira rodada**, anterior à correção da busca. As falhas continuam registradas para não transformar tentativas malsucedidas em acertos.

!!! info "O que significam as falhas técnicas?"
    **Q05, Q10 e Q15 — HTTP 502:** o backend já havia recuperado os cinco trechos, mas a chamada ao Gemini retornou erro. O registro contém a mensagem “O Gemini está indisponível”. O código original devolvido pelo provedor não foi preservado; não é possível afirmar se a causa foi sobrecarga ou outra falha externa.

    **Q01 — HTTP 504:** a geração excedeu o timeout configurado de 90 segundos. O trecho correto do COSMOS já havia sido recuperado.

    Esses códigos indicam **falha ao gerar a resposta**, não ausência de informação, erro do Chroma ou falha do Pages. Sem resposta produzida, a fundamentação é “não aplicável”.

**Resposta com fontes** significa que o sistema respondeu citando trechos. **Ausência reconhecida corretamente** significa que faltavam dados na base, como ocupação em tempo real. **Abstenção indevida**, na Q03, significa que havia informação, mas a busca daquela versão não a recuperou. O LEMA foi recuperado e respondido na [verificação posterior](demonstracao.md#lema-registro-real).

--8<-- "includes/resultados.md"

## Persistência e limitações adicionais

Reabrimos o banco em dois processos novos, sem ingestão e com cache de modelos em modo offline. A autoconsulta validou o vetor persistido e uma consulta semântica sobre COSMOS recuperou a evidência esperada. Ambos terminaram com código zero e o manifesto permaneceu igual. [Comprovação](../assets/downloads/persistencia.json).

Há ambiguidade de secretaria UED/UAC e respostas no presente que não atribuíram explicitamente à fonte a vigência desconhecida. A fundamentação textual não comprova atualidade nem resolução de conflitos. A amostra não cobre igualmente as 25 fontes.

As metas iniciais da [Entrega 1](../entrega-1/metricas.md) eram hipóteses de planejamento. Esta página registra o protocolo efetivamente executado de quinze perguntas; não o apresenta como execução de um conjunto de vinte que não ocorreu.

## Próxima avaliação

Congelar a configuração híbrida e seu prompt, julgar outra rodada e reservar perguntas novas para conferência. Comparar com a busca densa sob condições controladas, sem escolher casos favoráveis. Dupla revisão humana, BM25 isolado, comparação com Gemini sem RAG e outros chunkings são melhorias futuras, não resultados já obtidos.

[Baixar métricas](../assets/downloads/metricas.json){ .md-button }
[Baixar gabarito e rubrica](../assets/downloads/gabarito.json){ .md-button }

Referências: [Introduction to Information Retrieval · avaliação](https://nlp.stanford.edu/IR-book/pdf/08eval.pdf) para precisão/recall; [Ragas · Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/) para suporte das afirmações. O Ragas não foi executado como avaliador automático nesta rodada.
