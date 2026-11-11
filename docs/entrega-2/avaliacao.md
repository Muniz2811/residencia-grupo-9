# Avaliação do RAG · base ampliada

A rodada `20261111T235422Z`, em 11/11/2026, avaliou a coleção de **37 fontes e 174 chunks**. As quinze perguntas receberam HTTP 200 na primeira tentativa: 15 chamadas, nenhuma falha ou retentativa. A configuração e os hashes permaneceram constantes durante a execução.

[Respostas e tentativas](../assets/downloads/avaliacao.json){ .md-button .md-button--primary }
[Métricas calculadas](../assets/downloads/metricas.json){ .md-button }
[Julgamentos completos](../assets/downloads/julgamentos.json){ .md-button }

## Protocolo e configuração

São doze perguntas respondíveis, incluindo duas premissas incorretas, e três sem resposta na base. Usamos as mesmas quinze perguntas conhecidas do diagnóstico, portanto não é avaliação cega ou conjunto reservado. A expansão altera o corpus: diferenças entre rodadas não isolam efeitos de um único componente.

- E5-small local, vetores normalizados de 384 dimensões; Chroma cosseno.
- Busca híbrida E5 + BM25, k1=1,2 e b=0,75; RRF k=60; trinta candidatos por ranking, top-5, até dois chunks por documento.
- Gemini `gemini-3.5-flash-lite`, temperatura 0,1, timeout 90 s, 3.072 tokens de saída, prompt `campus-rag-v2`.
- Até oito tentativas somente para falhas técnicas. A primeira saída válida encerra a questão, mesmo parcial ou incorreta. Nesta rodada não foi necessário repetir.
- Julgamento por Codex como avaliador assistido único, com leitura dos textos, decomposição factual e conferência de citações. Sem dupla revisão humana ou Ragas automático.

## Métricas calculadas

| Aspecto | Conta real | Resultado | Meta local |
|---|---|---:|---:|
| Hit@5 · respondíveis com evidência relevante | 12/12 | **100%** | ≥80% |
| Precisão dos trechos · quinze perguntas | 17/75 | **22,67%** | ≥40% |
| Precisão · perguntas respondíveis | 17/60 | **28,33%** | ≥50% |
| Fundamentação factual | 49/49 | **100%** | ≥95% |
| Rastreabilidade dos vínculos de citação | 16/16 | **100%** | 100% |
| Reconhecimento de ausência | 3/3 | **100%** | 100% |
| Persistência em processos novos | Sucesso | **1** | 1 |
| Perguntas com saída válida | 15/15 | **100%** | — |
| Respondíveis completas nesta revisão | 11/12 | **91,67%** | — |
| Premissas incorretas corrigidas | 2/2 | **100%** | — |

**Os 74 testes automatizados existentes passaram. Isso não significa que todas as metas de qualidade passaram:** a precisão dos trechos continua abaixo da meta. A resposta Q07 ficou parcial. Fundamentação mede somente fatos produzidos; não premia informação omitida. Nenhuma resposta foi repetida para melhorar a nota.

A fórmula do plano chamada taxa de recuperação corresponde a Hit@5, e não ao Recall@5 clássico. Hit conta perguntas com alguma evidência; precisão conta trechos relevantes divididos por todos os recuperados; fundamentação conta fatos sustentados divididos por produzidos; rastreabilidade conta vínculos resolvidos divididos por emitidos; ausência conta abstenções corretas nos casos sem resposta. Todos os numeradores e denominadores estão nos arquivos acima.

## Regras de julgamento

Relevância exige informação específica que responda a alguma parte da pergunta; semelhança temática não basta. Cada resposta foi dividida em fatos verificáveis, como prédio, andar e sala. Conferimos o apoio nos chunks citados e o vínculo até documento, versão, seção e SHA-256 do original. Citação resolvida não é prova automática de fundamentação.

Erro de API não conta como abstenção. As três perguntas de ausência exigem ocupação ou chegada de ônibus em tempo real, informação que a base documental não possui.

## Quinze perguntas e resultados

--8<-- "includes/resultados.md"

## O que ainda precisa melhorar

Q07 informa que visitantes podem entrar e apresenta condições gerais de empréstimo. Porém não esclarece a restrição específica dos empréstimos domiciliares no Gama à comunidade acadêmica. Essa informação existe em outro chunk de DOC-012, fora do top-5. A resposta recebeu cobertura parcial.

A redação problemática de Q04 na rodada anterior não se repetiu nesta execução. Isso não comprova que a ambiguidade da página foi resolvida definitivamente. Ainda há ruído: somente 17 dos 75 trechos respondem especificamente às questões. Próximas melhorias devem avaliar cobertura de perguntas compostas e seleção do contexto.

## As quinze respostas coletadas

--8<-- "includes/respostas-avaliadas.md"

## Conferência adicional dos documentos novos

Três consultas reais adicionais, separadas das quinze métricas, tiveram HTTP 200: localização da assistência estudantil segundo o guia DDS 2026; solicitação de apoio à DACES pelo SIGAA; credenciais de UnB Wireless e Eduroam. As respostas citaram documentos recém-incorporados. [Ver registros da expansão](../assets/downloads/expansao-consultas.json).

## Persistência conferida novamente

Dois processos novos reabriram o banco e consultaram COSMOS em modo offline, sem Gemini e sem ingestão. Autoconsulta confirmada, vetores finitos e normalizados, ambos com código zero e manifesto inalterado. [Evidência](../assets/downloads/persistencia.json).

## Histórico e limites

A rodada anterior `20261111T183730Z` tinha 25 fontes, 94 chunks, 16 chamadas e uma retentativa técnica. Seus resultados permanecem no repositório RAG; não representam a base ampliada. A rodada densa inicial também permanece disponível como [histórico](../assets/downloads/metricas-iniciais.json).

A avaliação usa poucos exemplos conhecidos e um único avaliador assistido. Não comprova qualidade em todas as fontes, vigência ou generalização. Mais fontes ampliam a cobertura, mas não garantem melhor seleção dos trechos. Perguntas inéditas e revisão humana dos julgamentos seguem necessárias.
