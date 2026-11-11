# Banco vetorial e recuperação

<span class="selo selo--verde">Chroma implementado e persistência verificada</span>

## Onde o banco está

O banco é **local**, na pasta `unb-gama-rag/data/index/chroma/`, aberto com `chromadb.PersistentClient`. Não está no Supabase, no Render nem no GitHub Pages. A [documentação do cliente Chroma](https://docs.trychroma.com/reference/python) descreve a persistência no diretório informado.

| Item | Valor real |
|---|---|
| Coleção ativa | `fcte-a0d5e722cd0cf092bea5` |
| Registros | 174 chunks de 37 fontes |
| Vetor por registro | 384 componentes `float32`, normalizados |
| Métrica vetorial | Cosseno |
| Função padrão de embeddings do Chroma | Desativada; o pipeline fornece os vetores E5 |
| Arquivos | `chroma.sqlite3` e diretórios internos do índice |
| Identidade e configuração | `data/index/manifesto.json` |

Para transportar o banco, preservar a pasta completa, não apenas o SQLite. O índice é derivado e reconstruível a partir dos artefatos compatíveis; não substitui o armazenamento das coletas ou os documentos originais.

## O que cada registro contém

- `chunk_id` estável, texto e embedding;
- fonte, URL, título, seção e versão;
- hash do original, campus/abrangência, aprovação, revisão e validade;
- configuração de chunking e entidades mencionadas.

O indexador faz `upsert`, remove IDs extras da coleção de destino e confere completude antes de publicar o manifesto. Repetir a mesma ingestão não duplica registros. Outra versão pode receber outra coleção; só a apontada pelo manifesto está ativa. Coleções antigas podem continuar no disco como histórico.

## Recuperação híbrida atual

1. E5 codifica a consulta; Chroma ordena os elegíveis por cosseno.
2. BM25 procura termos nos mesmos textos elegíveis, considerando frequência e tamanho.
3. RRF combina até 30 candidatos de cada ranking pela soma de `1 / (60 + posição)`.
4. A seleção devolve até cinco trechos, com no máximo dois por fonte.

BM25 usa `k1=1.2`, `b=0.75`, normalização de acentos e uma lista de palavras comuns. Não há stemming completo, reranker neural ou limiar de relevância calibrado. O rank híbrido não é a simples soma de cosseno e BM25. A técnica de fusão é descrita na [documentação de RRF da Microsoft](https://learn.microsoft.com/en-us/azure/search/hybrid-search-ranking); nossa implementação não utiliza Azure.

Como há apenas 174 chunks, o código obtém os elegíveis do Chroma e monta o ranking lexical localmente. Isso evita outro serviço neste protótipo; uma base muito maior exigiria um índice lexical próprio.

## Filtros e limitações

A consulta permite apenas fontes aprovadas, sem rascunho, aplicáveis ao Gama, UnB geral ou DF, e sem validade explicitamente vencida. Validade desconhecida continua elegível, mas não garante atualidade.

Não há corte de distância calibrado. O sistema ainda pode retornar trechos irrelevantes. Limitar dois por fonte ajuda a diversidade, mas também pode retirar uma terceira evidência útil. Esses parâmetros precisam ser avaliados, não tratados como garantia.

## Persistência demonstrada

Dois processos novos foram executados sem ingestão e com os modelos em modo offline. `06_conferir.py` validou os vetores/IDs e uma autoconsulta; `perguntar.py` consultou o local do COSMOS e recuperou a evidência esperada. Ambos terminaram com código zero e o manifesto manteve o mesmo hash.

[Baixar comprovação de persistência](../assets/downloads/persistencia.json){ .md-button }

A prova demonstra reabertura local. Não demonstra resistência à perda do disco nem persistência numa hospedagem efêmera. O GitHub Pages publica esta documentação estática; executar o chat real exige o backend separado.

## Separação da geografia

O vetor encontra texto por significado. Não calcula a distância física entre prédios, trajetos, acessibilidade, ocupação atual ou contenção de GPS. O KML do inventário não foi ingerido nesta coleção. [Arquitetura](arquitetura.md) e [demonstração real](demonstracao.md) mostram os componentes em operação.
