# Avaliação do RAG · rodada completa

**As 15 perguntas foram executadas e tiveram uma saída válida coletada.** A rodada atual usa a busca híbrida E5 + BM25/RRF e o prompt `campus-rag-v2`. Houve uma falha temporária do Gemini, repetida com sucesso; nenhuma pergunta ficou encerrada em erro HTTP.

Rodada `20261111T183730Z`, em **11/11/2026, das 15h37 às 15h40 de Brasília**. Foram julgados **75 trechos recuperados, 49 fatos e 16 vínculos de citação**. O índice permaneceu com 25 fontes, 94 chunks e a mesma assinatura durante toda a execução.

[Respostas e tentativas JSON](../assets/downloads/avaliacao.json){ .md-button .md-button--primary }
[Métricas calculadas](../assets/downloads/metricas.json){ .md-button }
[Julgamentos completos](../assets/downloads/julgamentos.json){ .md-button }

## Protocolo e configuração

| Grupo de perguntas | Quantidade |
|---|---:|
| Respondíveis: diretas, paráfrases, siglas e serviços | 10 |
| Respondíveis com premissa incorreta | 2 |
| Sem resposta: ocupação ou transporte em tempo real | 3 |
| Total | **15** |

Reexecutamos **todas as perguntas**, inclusive as que já tinham funcionado. São perguntas conhecidas do diagnóstico anterior; algumas orientaram melhorias. Portanto, esta rodada verifica a versão atual, mas **não é avaliação cega nem conjunto reservado**.

- **Recuperação:** E5-small, 384 dimensões; Chroma cosseno; BM25 `k1=1.2`, `b=0.75`; RRF `k=60`; até 30 candidatos por ranking, top-5 e máximo dois chunks por fonte.
- **Geração:** `gemini-3.5-flash-lite`, temperatura 0,1, timeout 90 s, limite de saída 3.072 tokens e prompt `campus-rag-v2`.
- **Conversa:** cada pergunta desta rodada é independente. O caso de continuidade sobre cabines permanece como demonstração adicional e não entra nas quinze métricas.
- **Repetição:** somente falhas técnicas, com espera. Limite operacional de cinco tentativas por pergunta nesta execução; a primeira saída válida encerra as tentativas, mesmo se parcial ou incorreta. Na prática, apenas Q10 precisou de uma repetição.
- **Auditoria:** todas as chamadas foram preservadas, junto do gabarito, configuração, hashes, rankings, respostas e versões.

O julgamento foi feito por **Codex como avaliador assistido único**, por leitura dos trechos e respostas. Não houve dupla revisão humana ou execução automática do Ragas. A equipe pode conferir e revisar cada decisão no arquivo de julgamentos.

## Métricas calculadas

| Aspecto | Fórmula usada | Conta real | Resultado | Meta local |
|---|---|---|---:|---:|
| Recuperação · Hit@5 | Respondíveis com pelo menos um trecho relevante ÷ respondíveis | 12/12 | **100%** | ≥80% |
| Precisão dos trechos, geral | Trechos relevantes ÷ retornados nas 15 perguntas | 16/75 | **21,33%** | ≥40% |
| Precisão nas respondíveis | Trechos relevantes ÷ retornados nas 12 respondíveis | 16/60 | **26,67%** | ≥50% |
| Fundamentação | Fatos sustentados pelos trechos citados ÷ fatos produzidos | 48/49 | **97,96%** | ≥95% |
| Rastreabilidade | Vínculos resolvidos até documento e versão ÷ citações emitidas | 16/16 | **100%** | 100% |
| Reconhecimento de ausência | Ausências corretamente declaradas ÷ perguntas sem resposta | 3/3 | **100%** | 100% |
| Persistência | Consulta em processo novo sem repetir ingestão | Sucesso | **1** | 1 |

As metas são critérios locais do piloto, registrados no gabarito; não padrões universais. **A precisão dos trechos continua abaixo da meta:** o contexto ainda recebe muito material que não responde à pergunta. Encontrar uma evidência útil em todas as perguntas respondíveis não significa recuperar todas as informações necessárias.

A fórmula do plano chamada de “taxa de recuperação” corresponde a **Hit@5**. Recall@5 clássico contaria a fração de todas as evidências relevantes recuperada; não usamos essas definições como equivalentes.

## Conclusão técnica das chamadas

| Medida | Conta | Resultado |
|---|---|---:|
| Perguntas com saída válida após as tentativas | 15/15 | **100%** |
| Sucesso na primeira tentativa | 14/15 | **93,33%** |
| Chamadas bem-sucedidas, incluindo a repetição | 15/16 | **93,75%** |
| Falhas transitórias registradas | 1 de 16 chamadas | Q10, primeira tentativa |
| Perguntas encerradas em erro técnico | 0/15 | **Nenhuma** |
| Respondíveis completas e sem ressalva de conteúdo nesta revisão | 10/12 | **83,33%** |
| Premissas incorretas corrigidas | 2/2 | **100%** |

A Q10, sobre o horário da biblioteca, recebeu erro 502 na primeira chamada e resposta válida na segunda. O erro permanece no histórico de tentativas; a tabela de resultados usa a resposta que efetivamente chegou. **15/15 concluídas não significa que o provedor teve 100% de disponibilidade por chamada.**

## Regras de julgamento

**Relevância:** o trecho deve conter evidência específica para alguma parte da pergunta ou para corrigir uma premissa. Coincidir com o assunto ou com o nome da fonte não basta. Evidência parcial é relevante, mas pode ser insuficiente para responder tudo.

**Fundamentação:** cada resposta é decomposta em fatos verificáveis. “LDTEA, segundo andar, sala 304” contém três fatos de localização. Julgamos somente o que foi produzido, contra as fontes citadas. Uma omissão reduz a cobertura; uma afirmação sem apoio reduz a fundamentação. A ressalva explícita sobre vigência em Q11 também foi verificada como fato de metadados. Denominador zero significa “não aplicável”.

**Rastreabilidade:** cada ligação afirmação–chunk é conferida, mesmo quando uma fonte reaparece em outra afirmação. Validamos ID, texto, URL, seção, versão, catálogo, extraído e SHA-256 do HTML original. Resolver a citação não garante que ela sustente a afirmação.

**Ausência:** o sistema deve admitir a falta do dado solicitado sem inventar disponibilidade. Erro técnico não conta como abstenção. A resposta de Q15 é ampla ao mencionar horários: temos documentos sobre como consultar o DF no Ponto, mas não tabelas operacionais ou dados ao vivo para a previsão pedida.

## Quinze perguntas e resultados

Todas as linhas abaixo correspondem a saídas válidas da **rodada híbrida atual**. “Requer revisão” identifica um problema de conteúdo, não falha de rede.

--8<-- "includes/resultados.md"

## O que ainda precisa melhorar

**Q04 — nome de um setor.** Os cinco setores gerais da UED foram informados com apoio na infraestrutura. Porém, o modelo escreveu “Secretaria de Graduação de Enfermagem”, juntando um título-pai e o subtítulo `ENFERMAGEM` da extração. O trecho não comprova essa denominação composta. Contamos **um fato sem suporte suficiente** e indicamos revisão da hierarquia extraída e da redação. Há também ambiguidade entre páginas sobre secretaria na UED/UAC.

**Q07 — pergunta composta respondida parcialmente.** O assistente confirmou que pessoas de fora podem entrar, mas não respondeu se podem pegar livros emprestados. O chunk `c_d18e321ba2d41ac7` contém a restrição de empréstimo à comunidade acadêmica, mas ficou fora do top-5. Os fatos produzidos têm apoio; a cobertura ficou incompleta. O limite de dois chunks por fonte e a seleção para perguntas compostas precisam ser avaliados.

**Ruído na busca.** Apenas 16 dos 75 trechos foram relevantes segundo a rubrica. A próxima melhoria deve priorizar seleção de contexto e cobertura de perguntas compostas, com nova medição. Repetir uma resposta semanticamente ruim até sair uma melhor não seria uma avaliação fiel; isso não foi feito.

## As quinze respostas coletadas

Abaixo estão as respostas reais, as observações da revisão e as fontes citadas. O [JSON da avaliação](../assets/downloads/avaliacao.json) contém também os rankings de todas as perguntas e todas as tentativas, inclusive a falha transitória.

--8<-- "includes/respostas-avaliadas.md"

## Persistência conferida novamente

Reabrimos o Chroma em dois processos novos, com os modelos em modo offline, sem Gemini e sem repetir a ingestão. A autoconsulta confirmou o vetor armazenado e uma consulta sobre COSMOS recuperou o diretório esperado. Ambos os processos terminaram com código zero; o manifesto permaneceu com o mesmo hash. [Evidência de persistência](../assets/downloads/persistencia.json).

## Relação com a avaliação anterior

A primeira rodada, `20261111T151703Z`, foi preservada como histórico: busca densa, prompt v1 e uma chamada por pergunta. Seus quatro erros técnicos não são resultados finais desta nova rodada. [Métricas históricas](../assets/downloads/metricas-iniciais.json).

Agora há nova execução das quinze perguntas, prompt v2, busca híbrida, retentativas técnicas registradas e novo julgamento. A recuperação passou de 11/12 para 12/12 neste conjunto; a precisão permaneceu 16/75. **Não é uma comparação controlada que isola o efeito do BM25:** prompt, disponibilidade e protocolo de repetição também diferem. A revisão atual da denominação em Q04 é mais estrita do que a inicial; não atribuímos a diferença de fundamentação apenas ao algoritmo.

## Limites e próxima conferência

São poucos exemplos, conhecidos previamente e julgados por um único avaliador assistido. As notas não comprovam generalização, atualidade das páginas ou qualidade em todas as 25 fontes. Precisamos de revisão humana dos julgamentos, perguntas novas reservadas e comparação de alternativas sob o mesmo protocolo.

Referências conceituais: [Introduction to Information Retrieval · avaliação](https://nlp.stanford.edu/IR-book/pdf/08eval.pdf), para precisão/recall; [Ragas · Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/), para suporte factual. Ragas não foi executado nesta avaliação.
