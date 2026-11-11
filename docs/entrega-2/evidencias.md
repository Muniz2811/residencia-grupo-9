# Evidências e artefatos da entrega

<span class="selo selo--verde">Exportação dos artefatos atuais, sem inferência no Pages</span>

## Explore chunks e componentes reais dos vetores

<div data-chunk-explorer></div>

As prévias são excertos curtos selecionados. Os tokens são da entrada completa usada na codificação. As barras mostram **16 componentes reais de um vetor de documento**, não uma projeção semântica, coordenada ou vetor inventado da pergunta.

## Catálogo dos 174 chunks

<div data-chunk-catalog></div>

Este filtro procura palavras nos metadados exportados. Não executa E5, BM25 ou consulta ao Chroma. Não confundir o explorador do site com o backend RAG.

## Pacote de evidências

| Download | Conteúdo |
|---|---|
| [Evidências JSON](../assets/downloads/evidencias.json) | Catálogo, IDs dos chunks, exemplos, componentes vetoriais, integridade, demonstrações e métricas |
| [Fontes CSV](../assets/downloads/fontes.csv) | 42 fontes, disponibilidade, revisão, validade e 37 indexadas |
| [Demonstrações JSON](../assets/downloads/demonstracoes.json) | Perguntas, respostas, rankings, excertos, fontes e IDs de cinco execuções selecionadas |
| [Métricas JSON](../assets/downloads/metricas.json) | Numeradores, denominadores, metas e resultados da rodada híbrida completa |
| [Avaliação JSON](../assets/downloads/avaliacao.json) | Quinze perguntas, respostas, rankings e todas as 16 chamadas, incluindo a retentativa |
| [Julgamentos JSON](../assets/downloads/julgamentos.json) | Revisão de 75 trechos, 49 fatos e 16 vínculos de citação |
| [Métricas históricas](../assets/downloads/metricas-iniciais.json) | Rodada densa anterior, mantida separada dos resultados atuais |
| [Gabarito e rubrica](../assets/downloads/gabarito.json) | Quinze perguntas, evidências esperadas, regras e metas anteriores às chamadas |
| [Persistência JSON](../assets/downloads/persistencia.json) | Sucesso, data, modo offline e hashes iguais antes/depois |
| [Código do RAG](../assets/downloads/codigo-piloto.zip) | Código atual, configuração, catálogo e dependências, sem dados privados ou modelo |

O nome do ZIP preserva a URL de download anterior, mas seu conteúdo foi atualizado para a implementação atual. Ele não contém `.env`, originais, extraídos, chunks integrais, fotos, matriz completa, Chroma, pesos ou logs brutos. [Como executar](como-executar.md).

## Cadeia de rastreabilidade

```text
Afirmação [1] → chunk citado → source_id e seção
              → versão e SHA-256 do original
              → snapshot preservado e URL institucional
```

A exportação confere hash dos chunks e da matriz contra o manifesto, forma/dtype, normalização e ordem dos IDs. O mapa de 14 pontos foi preservado como inventário independente, fora da coleção ativa.

As referências válidas não garantem suporte semântico nem atualidade: essas são verificações distintas. Consulte a [demonstração comentada](demonstracao.md) e os [resultados de avaliação](avaliacao.md).
