# Estratégia de chunking

<span class="selo selo--verde">174 chunks aprovados e indexados</span>

## A ideia: fichas que fazem sentido sozinhas

Se entregarmos a página inteira da biblioteca a cada pergunta, levamos serviços, doações, horários e acervo juntos, mesmo quando a pessoa só quer saber sobre cabines. Se cortarmos demais, uma sala pode ficar sem o nome do laboratório. Nosso corte busca preservar contexto sem carregar o documento inteiro.

## Estratégia implementada: `agrupar_irmaos`

1. Preservar título, seção e parágrafos do texto extraído.
2. Agrupar seções vizinhas com o mesmo título-pai enquanto couberem no alvo.
3. Manter rótulos no texto para não perder a associação entre assunto e informação.
4. Subdividir seção longa por parágrafo, depois frase e, em último caso, palavras.
5. Nunca misturar documentos diferentes no mesmo chunk.

É um método estrutural com limite medido por tokens, não um modelo que descobre automaticamente mudanças de assunto. A alternativa `por_secao` existe para comparação futura, mas não houve experimento que provasse qual é melhor neste corpus.

## Por que 300, 40 e 512?

| Parâmetro | Configuração real | Justificativa e limite |
|---|---:|---|
| Alvo completo | **300 tokens** | Equilíbrio inicial entre foco e contexto, com margem abaixo do limite do E5 |
| Sobreposição | **Até 40 tokens** | Continuidade somente quando uma seção longa é subdividida |
| Máximo do modelo na configuração | **512 tokens** | Restrição técnica; verificar antes da codificação, sem truncar silenciosamente |

Token não é palavra: uma palavra pode virar várias unidades do tokenizer. Contamos prefixo `passage: `, título, conteúdo e tokens especiais usando o tokenizer real do E5. Os parâmetros 300/40 são escolhas iniciais de engenharia, **não valores ótimos comprovados**.

A sobreposição usa apenas unidades inteiras que caibam no limite. Pode ser menor que 40 ou zero; não repetimos um pedaço arbitrário de frase para atingir a contagem. Não há sobreposição entre todos os chunks. O teto operacional antigo de 480 não é a regra do pipeline atual.

## Resultado observado

| Estatística da base ativa | Valor |
|---|---:|
| Documentos | 37 |
| Chunks | 174 |
| Mínimo de tokens completos | 17 |
| Mediana | 222 |
| Máximo | 300 |

## Exemplo: a página da biblioteca

| Chunk real | Conteúdo principal |
|---|---|
| `c_c8a0b710c3c50b09` | Apresentação, espaços de estudo e acervo |
| `c_7487f9e90557b28d` | Doações e funcionamento |
| `c_1cfe0848c545f27c` | Serviços e acesso da comunidade externa |
| `c_d18e321ba2d41ac7` | Regras de atendimento e empréstimos |
| `c_dd4b3a6b44449326` | Produções acadêmicas |

Todos apontam para DOC-012. Recuperar o chunk de monografias não responde a uma pergunta sobre cabines, embora a fonte seja a mesma. A relevância deve ser avaliada no **conteúdo do trecho**, não só no documento correto.

No diretório de laboratórios, um chunk reúne CPL, COSMOS e LEMA preservando suas localizações. Isso mantém associações, mas divide a representação entre vários assuntos. Comparar uma unidade por laboratório é uma melhoria a investigar, sem afirmar que já foi testada.

## Rastreabilidade

Cada chunk guarda `chunk_id`, `source_id`, versão, hash do original, texto, título, seções, posição, campus, abrangência, revisão, validade, aprovação e entidades. O ID é derivado desses elementos e da configuração, incluindo conteúdo. Alterar a divisão ou o texto muda sua identidade.

Não há seletor CSS ou intervalo de caracteres por chunk nesta implementação: a rastreabilidade ativa usa fonte, versão, seções, texto e hash. Os exemplos do site foram atualizados para esse contrato.

[Explorar chunks e vetores](evidencias.md){ .md-button }

## Referências e comparação futura

A [estrutura por cabeçalhos](https://docs.langchain.com/oss/python/integrations/splitters/markdown_header_metadata_splitter) é uma técnica documentada, sem dependência do LangChain no nosso corte. O [model card do E5](https://huggingface.co/intfloat/multilingual-e5-small) orienta o contrato do modelo; a [pesquisa de avaliação de chunking da Chroma](https://www.trychroma.com/research/evaluating-chunking) motiva medir o efeito da divisão em vez de assumir um tamanho universal.

Comparações devem manter corpus, modelo, perguntas e orçamento de contexto controlados. O gabarito aponta para fonte e passagem, e não somente IDs que mudam com o chunking. Não apresentamos uma comparação ainda não executada como resultado.
