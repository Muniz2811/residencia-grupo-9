# Estratégia de embeddings

<span class="selo selo--verde">Executada no piloto</span>

## Escolha e parâmetros usados

| Parâmetro | Execução do piloto |
|---|---|
| Modelo | `intfloat/multilingual-e5-small` |
| Revisão | `614241f622f53c4eeff9890bdc4f31cfecc418b3` |
| Dimensão | 384 |
| Biblioteca | Sentence Transformers |
| Dispositivo | CPU, quatro threads |
| Lote | 16 entradas |
| Precisão | `float32` |
| Pooling | Mean pooling dos módulos oficiais |
| Normalização | L2 |
| Prefixos | `passage: ` nos documentos; `query: ` nas perguntas futuras |

O E5 foi escolhido como primeiro experimento multilíngue local, sem tarifa de API de embeddings. Isso não demonstra que ele seja o melhor modelo para todas as perguntas do campus. A adequação será medida na avaliação de recuperação. [Documentação do modelo](https://huggingface.co/intfloat/multilingual-e5-small).

## O que foi executado

Os 79 textos preparados receberam o prefixo uma única vez e foram codificados em uma matriz **79 × 384**. O tokenizer carregado pelo modelo foi comparado às contagens da preparação; entradas acima do limite são recusadas antes da inferência.

Os pesos foram obtidos na revisão fixada, em `safetensors`, com hash verificado e sem habilitar código remoto. Após o download inicial, a codificação é local e pode usar somente os arquivos já disponíveis. Os textos do corpus não são enviados ao Hub nem à API Gemini.

## Persistência dos artefatos

| Arquivo no projeto RAG | Papel |
|---|---|
| `vectors.npy` | 79 vetores `float32`; 121.472 bytes |
| `rows.jsonl` | Correspondência entre linha, chunk, fonte e hash da entrada |
| `manifest.json` | Modelo, revisão, hashes, bibliotecas, parâmetros e verificações |

A ordem das linhas precisa acompanhar os IDs. O arquivo NPY é um artefato numérico; a coleção de busca ainda não foi implementada.

## Verificações observadas

--8<-- "includes/verificacoes.md"

O tempo é de uma execução local, sujeito a carga da máquina e ambiente; não é média de benchmark nem promessa de latência. Valores finitos e norma próxima de 1 verificam integridade técnica, não relevância semântica.

## Contrato para a próxima etapa

Consultas deverão usar o mesmo modelo, revisão, dimensão e normalização, com prefixo `query: `. Vetores normalizados permitem comparação por cosseno; o número de similaridade não é probabilidade de verdade.

Trocar modelo ou texto de entrada exige gerar vetores compatíveis novamente. As coordenadas do mapa continuam estruturadas para operações geográficas; as 384 dimensões não representam latitude e longitude.

Os indicadores de rascunho dos documentos foram mantidos. Gerar um embedding não aprova uma fonte para produção. Consulte as [evidências exportadas](evidencias.md) e a [API do Sentence Transformers](https://www.sbert.net/docs/package_reference/sentence_transformer/model.html).
