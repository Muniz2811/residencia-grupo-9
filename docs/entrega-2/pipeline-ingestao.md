# Pipeline de ingestão de dados

<div data-pipeline></div>

## Entradas e saídas

| Etapa | Entrada | Saída | Estado |
|---|---|---|---|
| Aquisição | Catálogo de URLs | HTMLs originais, origem, data e hashes | Executada para 27 endereços |
| Seleção | Conteúdo principal dos HTMLs | Cinco páginas prioritárias | Executada |
| Preparação | Artigo e regras por tipo | Texto, seções, seletores e limitações | Executada como rascunho |
| Mapeamento | KML de 14 pontos | GeoJSON completo e 11 unidades elegíveis | Executado |
| Chunking | Unidades preparadas | 79 chunks e contagens reais | Executado |
| Embeddings | Entradas completas dos chunks | Matriz, IDs por linha e manifesto | Executados |
| Indexação | Vetores e metadados aprovados | Coleção vetorial persistida | Pendente |
| Consulta e avaliação | Perguntas, contexto e gabaritos | Respostas, fontes e métricas | Pendentes |

## Regras de procedência

O original não é reescrito. A extração registra seletores CSS ou posição do Placemark e intervalos no texto preparado. O manifesto de preparação liga as saídas à configuração, ao script e ao tokenizer usado.

Na codificação, a implementação confere o hash dos chunks, os IDs, a revisão do tokenizer, o tamanho completo das entradas e a integridade dos pesos. O manifesto de embeddings registra a configuração e os hashes das saídas numéricas.

## Atualização

Nova versão de uma fonte exige nova preparação e vetorização compatível. O índice futuro deverá retirar trechos superados do conjunto ativo; a existência de vetores antigos não autoriza continuar exibindo informação vencida como atual.

O catálogo aprovado será separado das referências candidatas. Uma extração bem formada não confirma, por si só, a atualidade de horários, o funcionamento de equipamentos ou uma associação geográfica.

## Sem mistura com dados pessoais

O pipeline textual não ingere endereço residencial, contatos de carona ou fotos privadas como um corpus público. A exportação de coletas será revisada antes da incorporação, preservando a distinção entre sugestão automática e descrição final.

As [evidências do piloto](evidencias.md) permitem conferir o que já foi produzido. O [guia de reprodução](como-executar.md) apresenta os comandos e suas dependências.
