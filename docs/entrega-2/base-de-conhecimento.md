# Base de conhecimento curada

## O que compõe a base ativa

São **27 fontes aprovadas expressamente pelo responsável, Pedro, em 11/11/2026**, das quais **25 foram adquiridas, extraídas e indexadas**. Incluem infraestrutura, atendimento, salas, biblioteca, laboratórios, serviços e orientações documentais do DF no Ponto.

DOC-014, visualizador de dúvidas frequentes da BCE, e DOC-024, página de biomassa do PCTec, têm aquisição bloqueada e `indexavel=false`. Não geraram conteúdo ou vetores fictícios. O mínimo de vinte documentos é atendido pelas 25 fontes utilizáveis.

Uma página com vários chunks conta como uma fonte. Fontes distintas do mesmo portal podem ser documentos diferentes quando têm conteúdo próprio; cópias e menus não ampliam a contagem. O catálogo não deve ser confundido com 27 confirmações independentes do mesmo fato.

## Curadoria e procedência

O catálogo guarda ID, título, URL, tipo, campus/abrangência, coleta, revisão, responsável, status, validade, versão, SHA-256 e limitações. O registro de aprovação foi preservado; a extração e o indexador não aprovam fontes automaticamente.

| Conferência | Tratamento atual |
|---|---|
| Procedência | URLs institucionais e originais preservados por versão |
| Escopo | Gama, UnB geral aplicável e DF; RU excluído pelas regras configuradas |
| Disponibilidade | Bloqueios explicitados e excluídos da indexação |
| Integridade | Hash do original ligado ao extraído, chunk e manifesto |
| Revisão | Aprovação expressa registrada, com data e responsável |
| Vigência | **Desconhecida** quando não informada; coleta não substitui validade |
| Duplicidade | IDs e versões controlados; sem alegar deduplicação semântica exaustiva |
| Limitações | Ambiguidades, estrutura da página e ausência de confirmação em campo preservadas |

!!! warning "Aprovação não é confirmação de atualidade"
    A aprovação pelo responsável permite o uso na entrega; não representa auditoria independente de cada frase, inspeção física dos locais ou garantia de que um horário permanece vigente.

## Exemplos de ressalvas reais

- DOC-001 menciona serviços de secretaria na UED; DOC-002 situa especificamente a Secretaria de Graduação na UAC. Podem ser serviços diferentes ou informação divergente. A resposta deve preservar a distinção.
- A URL do diretório DOC-005 contém `homologa`; confirmar se é a publicação institucional definitiva.
- Os textos preparados podem conter contatos e trechos pouco úteis. A documentação pública mostra apenas excertos curtos selecionados e metadados, não os logs brutos ou páginas integrais.
- Números de acervo e horários sem vigência não são dados ao vivo.

## Catálogo das fontes

--8<-- "includes/fontes.md"

[Baixar catálogo CSV](../assets/downloads/fontes.csv){ .md-button }

## Onde ficam os materiais

```text
catalogo/fontes.csv                         catálogo de curadoria
catalogo/aprovacao.json                     registro de aprovação
data/originais/<DOC>/<versao>/original.html snapshot preservado, fora do Git
data/extraido/<DOC>__<versao>.json           texto com títulos e parágrafos
data/chunks/chunks.jsonl                    trechos aprovados
data/index/manifesto.json                   identidade da coleção ativa
```

O hash identifica os bytes de uma versão, não sua veracidade. Nova aquisição pode trazer uma página diferente; reprodutibilidade exata depende de preservar os originais daquela execução.

## Coleta e mapa são entradas futuras

O KML de 14 pontos e a ficha da praça permanecem separados da coleção textual ativa. Uma integração futura deverá importar somente descrições humanas revisadas, com IDs e procedência, distinguindo-as de sugestões da IA. Fotos não são indexadas neste RAG. Veja o [inventário geográfico](../coleta/mapeamento.md).
