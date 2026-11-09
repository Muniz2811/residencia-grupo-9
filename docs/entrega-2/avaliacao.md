# Avaliação e métricas

## O que já foi medido

Hoje temos estatísticas e verificações de preparação/vetorização, apresentadas em [embeddings](embeddings.md): tokens, formato da matriz, valores finitos, normalização, hashes e correspondência de IDs.

**Ainda não há Hit@5, precisão da busca, MRR ou qualidade de resposta medidos.** Não houve consulta RAG nem conjunto final de perguntas executado.

## Protocolo previsto

Preparar **16 perguntas respondíveis e quatro sem resposta**, incluindo paráfrases, siglas e premissas incorretas, conforme as [metas da Entrega 1](../entrega-1/metricas.md). Para cada pergunta, registrar previamente fontes, passagens relevantes e fatos esperados. As metas são pelo menos 13/16 acertos de recuperação no top-5, 13/16 respostas corretas e fundamentadas, 90% de citações pertinentes e 4/4 reconhecimentos de ausência; ainda não foram medidas.

Perguntas usadas para ajuste serão identificadas; algumas ficarão reservadas para conferência final. Uma amostra pequena será descrita como avaliação inicial do protótipo, com contagens e exemplos de falha.

## Métricas principais

| Métrica | Cálculo e interpretação |
|---|---|
| Hit@5 | Perguntas respondíveis com pelo menos uma evidência relevante no top-5 ÷ total de respondíveis |
| Precision@5 | Resultados relevantes nas cinco primeiras posições ÷ 5; apresentar média por pergunta e declarar posições ausentes |
| Recall@k | Evidências relevantes recuperadas ÷ evidências relevantes do gabarito; exige conjunto esperado definido |
| MRR@k | Média de `1 / posição da primeira evidência relevante`, ou zero quando ausente no corte |
| nDCG@k | Qualidade da ordenação por posição e grau de relevância, normalizada pelo ranking ideal |
| Fundamentação | Afirmações sustentadas pelo contexto recuperado ÷ afirmações factuais produzidas |
| Cobertura da resposta | Fatos esperados corretamente atendidos ÷ fatos esperados no gabarito |
| Citações | Medir referências resolvíveis, suporte pela fonte citada e cobertura das afirmações que precisam de referência |
| Abstenção | Acertos nas perguntas sem resposta; registrar recusas indevidas nas respondíveis |

Hit@5 não será chamado de recall. Uma referência pode existir e ainda assim não sustentar a afirmação. Uma resposta pode ser fiel e incompleta; uma resposta vazia não receberá nota máxima automática de fundamentação.

## Exemplo de cálculo, não resultado

Se uma pergunta recuperar dois trechos relevantes em cinco, sua Precision@5 será `2/5 = 40%`. Se uma resposta contiver quatro afirmações e só três tiverem suporte, sua fundamentação será `3/4 = 75%`.

Esses valores são **ilustrativos**. Nenhum percentual desse exemplo foi medido no piloto.

## Como comparar chunkings

Usar o mesmo corpus, modelo, perguntas e orçamento de contexto. O gabarito terá passagens estáveis no texto, para não depender da divisão específica em chunks.

Se `E` for a união das evidências esperadas e `R`, a união das passagens recuperadas, com fonte/versão identificadas:

```text
cobertura de evidência = |E ∩ R| / |E|
precisão de evidência  = |E ∩ R| / |R|
IoU                   = |E ∩ R| / |E ∪ R|
```

Intervalos sobrepostos não contam duas vezes. Convenções para conjuntos vazios serão declaradas. Isso permite distinguir evidência útil, conteúdo desnecessário e repetição causada pela sobreposição.

## Referências metodológicas

- [BEIR](https://arxiv.org/abs/2104.08663): avaliação de recuperação e comparação com baseline lexical BM25.
- [RAGAs](https://aclanthology.org/2024.eacl-demo.16/) e [Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/): relevância do contexto e fidelidade às evidências.
- [ARES](https://arxiv.org/abs/2311.09476): relevância, fidelidade e validação por anotações humanas.
- [Avaliação de chunking da Chroma](https://www.trychroma.com/research/evaluating-chunking): análise de recuperação no nível de trechos/tokens.

Esses trabalhos orientam o protocolo; não implicam frameworks de avaliação instalados ou notas automáticas já geradas. A primeira avaliação será manual e auditável, sem criação de suíte de testes automatizados.
