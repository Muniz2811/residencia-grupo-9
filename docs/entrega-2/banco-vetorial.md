# Banco vetorial

<span class="selo selo--laranja">Planejado · não implementado</span>

## Estado atual

Temos os vetores em NPY, a correspondência por `chunk_id` e os metadados dos chunks. Ainda não há coleção Chroma, endpoint de busca, ranking persistido ou demonstração de recuperação.

## Proposta para o próximo passo

Usar **Chroma com `PersistentClient`**, em uma pasta local de índice, recebendo explicitamente os embeddings E5 e configurando distância cosseno. A documentação do Chroma indica esse cliente para desenvolvimento local, com arquitetura de servidor preferível em produção. [Cliente](https://docs.trychroma.com/reference/python/client), [configuração](https://docs.trychroma.com/docs/collections/configure).

| Entrada | Tratamento previsto |
|---|---|
| ID do chunk | Chave estável para inserir/atualizar |
| Embedding | Vetor de 384 dimensões da execução compatível |
| Texto | Conteúdo que poderá ser recuperado como evidência |
| Metadados | Fonte, seção, campus, versão, revisão e validade |
| Manifesto | Identidade da base e da configuração de embeddings |

O índice é um derivado reconstruível. Não substitui os documentos originais ou o armazenamento das coletas. O piloto local não exige mudar o deploy Render/Supabase do aplicativo de fotos.

## O que precisa ser demonstrado

1. Criar a coleção com métrica explícita e vetores compatíveis.
2. Conferir IDs, contagens e vínculos com os chunks.
3. Repetir a ingestão sem duplicar entradas.
4. Fechar o processo, reabrir o banco e consultar sem refazer a ingestão.
5. Recuperar evidências adequadas sob filtros de campus/abrangência, revisão e validade.

Uma coleção experimental de rascunhos, se usada, deverá ser identificada como tal. Os indicadores atuais de revisão não serão convertidos automaticamente em aprovação.

## Fronteira com geografia

Metadados podem relacionar um chunk a um prédio ou marcador. Similaridade vetorial localiza texto por significado; proximidade física, contenção de GPS e rota serão operações geográficas próprias.

Não há números de latência ou precisão de busca a apresentar nesta etapa. O [plano de avaliação](avaliacao.md) será aplicado quando a recuperação existir.
