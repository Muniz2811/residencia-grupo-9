# Estratégia de embeddings

<span class="selo selo--verde">Executada localmente · matriz 94 × 384</span>

## Um endereço por significado

O embedding transforma o texto em números que permitem comparar assuntos. Imagine fichas organizadas numa sala com muitas direções: perguntas e textos de sentido parecido tendem a ficar próximos. Essas dimensões **não são latitude e longitude**, e proximidade semântica não comprova que a informação seja verdadeira.

| Parâmetro | Configuração executada |
|---|---|
| Modelo | `intfloat/multilingual-e5-small` |
| Revisão fixa | `614241f622f53c4eeff9890bdc4f31cfecc418b3` |
| Dimensões | 384 |
| Entrada máxima configurada | 512 tokens completos |
| Prefixos | `passage: ` para documentos; `query: ` para perguntas |
| Biblioteca | Sentence Transformers |
| Execução | CPU, quatro threads, lote 16 para documentos |
| Precisão e normalização | `float32`, L2 |
| Segurança de carregamento | `safetensors`, `trust_remote_code=False` |

O modelo multilíngue local foi escolhido para iniciar o experimento sem uma tarifa de API de embeddings. Não há evidência de que seja o melhor modelo possível para o campus. Prefixos, dimensão e normalização seguem o [uso documentado do E5](https://huggingface.co/intfloat/multilingual-e5-small).

## O que foi executado

Cada um dos 94 chunks recebeu um vetor. O código confere a entrada completa antes de codificar, recusando excesso em vez de permitir truncamento silencioso. Valida forma, números finitos, vetores não nulos e norma próxima de 1.

A matriz e seus IDs são preservados em `data/index/vetores/<assinatura>.npz`, além da coleção Chroma. O manifesto registra modelo, revisão, bibliotecas, configuração e hashes. Esta implementação não usa os antigos `vectors.npy` e `rows.jsonl` do piloto de 79 chunks.

--8<-- "includes/verificacoes.md"

## Na consulta

O mesmo E5 gera o vetor da pergunta com `query: `. Não recalculamos os embeddings dos documentos a cada mensagem. O processo da API mantém o modelo carregado e aceita uma consulta por vez.

E5 e Chroma podem funcionar localmente depois de o modelo estar em cache. **O Gemini é outro modelo, externo**, usado para redigir a resposta e dependente de internet/cota. Indexar os documentos não treina os pesos do E5 ou do Gemini.

## Compatibilidade e distância

Não misturamos modelos, revisões ou prefixos incompatíveis. Alterar o modelo exige reconstruir os vetores do corpus. A coleção usa distância cosseno; menor distância significa maior proximidade vetorial, não probabilidade de acerto.

A busca atual também usa BM25 e fusão RRF, portanto a ordem final pode diferir da ordem da distância cosseno isolada. Veja [banco e recuperação](banco-vetorial.md) e os [componentes reais dos vetores](evidencias.md).
