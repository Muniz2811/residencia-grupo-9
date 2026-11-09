# Evidências atuais do piloto

<span class="selo selo--verde">Artefatos reais exportados</span>

O explorador mostra pequenas prévias de registros existentes, seus identificadores e componentes reais de seus vetores. A contagem de tokens é da entrada completa usada na codificação. O texto publicado aqui é abreviado.

<div data-chunk-explorer></div>

## Catálogo dos 79 chunks

<div data-chunk-catalog></div>

O filtro acima procura palavras nos metadados já exportados. Ele não envia uma consulta ao E5 nem representa uma busca vetorial. Os textos completos e os originais continuam no projeto RAG; a documentação publica metadados e amostras selecionadas.

## O que essas evidências demonstram

- Existência dos chunks e vínculo com as fontes.
- Contagem real de tokens e limites respeitados.
- Correspondência entre linha numérica e `chunk_id`.
- Dimensão e normalização dos vetores.
- Preservação dos marcadores geográficos e dos motivos de exclusão.

Elas não demonstram recuperação relevante, resposta de LLM ou fundamentação de uma resposta ainda não produzida.

## Arquivos para inspeção

[Evidências JSON](../assets/downloads/evidencias.json){ .md-button .md-button--primary }
[Catálogo CSV](../assets/downloads/fontes.csv){ .md-button }
[Código do piloto e KML](../assets/downloads/codigo-piloto.zip){ .md-button }

O pacote de código contém os três scripts, configuração, dependências, inventário e KML da equipe. Não contém fotos, credenciais, pesos, matriz de vetores ou snapshots HTML. Para executar, será preciso adquirir as fontes e ajustar o caminho do snapshot, conforme o [guia](como-executar.md).

## Roteiro da demonstração RAG que falta executar

| Pergunta candidata | Evidência esperada | Condição |
|---|---|---|
| Em qual prédio está a biblioteca? | DOC-001 e setor correspondente no DOC-002 | Conferir fonte e vigência |
| Qual é a sala indicada para o COSMOS? | Unidade do COSMOS no DOC-005 | Responder como informação publicada |
| Qual ponto a equipe informou para o UAC? | MAP-001, marcador explícito do UAC | Informar procedência manual do mapa |
| A comunidade externa pode pegar livros emprestados? | Condições preservadas do DOC-012 | Distinguir consulta local de empréstimo |
| A sala I10 está livre agora? | Ausência de dados atuais de ocupação | Declarar insuficiência |

Quando houver consulta, a execução deverá registrar pergunta original, ranking, trechos, fontes, resposta, versões e parâmetros. Citações válidas serão conferidas quanto ao suporte efetivo de cada afirmação. Esta página não substitui essa execução.
