# Estratégia de chunking

<span class="selo selo--verde">Executada no piloto</span>

## Decisão

Dividir por **estrutura HTML, assunto e entidade**. A unidade deve conter contexto suficiente para ser compreendida quando recuperada.

| Conteúdo | Unidade preservada |
|---|---|
| Infraestrutura e salas de aula | Texto coerente sobre o prédio e seus recursos |
| Atendimento | Setor + local + condições de atendimento e contato institucional |
| Laboratório | Nome + prédio/andar/sala ou contêiner |
| Biblioteca | Assunto, mantendo condições de acesso e empréstimo relacionadas |
| KML | Marcador identificado + descrição + coordenada informada |

Unidades curtas permanecem inteiras. Não juntamos laboratórios diferentes para preencher um tamanho, nem separamos nome e localização apenas por uma contagem fixa.

## O significado dos limites

| Parâmetro | Valor | Justificativa |
|---|---|---|
| Limite técnico do E5 | 512 tokens | Contrato de entrada do modelo |
| Teto operacional | 480 tokens completos | Margem conservadora nossa; não é exigência do E5 |
| Alvo de subdivisão | 300 tokens completos | Ponto inicial para equilibrar foco e contexto nas seções que precisarem de corte |
| Sobreposição prevista | Aproximadamente até 40 tokens | Continuidade entre partes da mesma seção longa; sujeito ao custo de repetição |
| Sobreposição aplicada neste piloto | 0 | Nenhuma unidade exigiu subdivisão |

Uma unidade coerente entre 300 e 480 pode permanecer inteira. Prefixo, título, campus, seção e tokens especiais entram na contagem; o valor não é uma estimativa por palavras ou caracteres. O tokenizer é o do E5, na revisão fixada do modelo, com truncamento desativado.

**300 e 40 não foram demonstrados como ótimos.** São parâmetros iniciais de engenharia. Seções longas serão subdivididas preferindo fronteiras de parágrafo, frase e palavra. Sobreposição nunca atravessa entidades diferentes.

## Resultado observado

Foram preparados 79 chunks: 68 dos cinco HTMLs e 11 do mapa. O mínimo foi **47 tokens**, a mediana **76**, a média **81,4** e o máximo **246**, considerando a entrada completa. Por isso, o fallback de subdivisão não foi necessário no recorte efetivo.

Cada chunk conserva ID, fonte, seção, texto, entrada preparada para embedding, tokens, hash do original, seletor CSS ou posição do Placemark e intervalo no texto preparado. Os rótulos editoriais são distinguidos dos títulos originais.

## Fundamentação metodológica

| Referência | Aplicação e limite |
|---|---|
| [LangChain — divisão por cabeçalhos](https://docs.langchain.com/oss/python/integrations/splitters/markdown_header_metadata_splitter) | Técnica documentada de preservar estrutura e metadados; aplicada ao HTML sem depender do framework |
| [Dense X Retrieval — EMNLP 2024](https://aclanthology.org/2024.emnlp-main.845/) | Mostra a importância de investigar granularidade; não demonstra resultado neste campus e não implementamos seu método de proposições |
| [Chroma — Evaluating Chunking Strategies](https://www.trychroma.com/research/evaluating-chunking) | Motiva avaliar evidência, redundância e orçamento de contexto; não fornece um tamanho universal |
| [Model card E5](https://huggingface.co/intfloat/multilingual-e5-small) | Define o limite e os prefixos do modelo |

## Comparação futura

A primeira alternativa será janela fixa de 300 tokens com 40 de sobreposição, sobre os mesmos textos limpos e títulos. Manteremos corpus, modelo, perguntas e orçamento de contexto controlados. O gabarito apontará para passagens estáveis, não apenas IDs de chunks que mudam com a divisão.

Avaliaremos Hit@5 e ranking, cobertura de evidências e conteúdo irrelevante recuperado. Intervalos sobrepostos da mesma evidência serão unidos antes da contagem. Essa comparação ainda não foi executada.

Veja os [exemplos de chunks](evidencias.md) e o [protocolo de avaliação](avaliacao.md).
