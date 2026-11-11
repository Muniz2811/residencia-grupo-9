# Base de conhecimento curada

## O que compõe a base ativa

São **42 fontes aprovadas expressamente pelo responsável, Pedro, em 11/11/2026**, das quais **37 foram adquiridas, extraídas e indexadas**. Incluem infraestrutura, atendimento, salas, biblioteca, laboratórios, serviços e orientações documentais do DF no Ponto.

DOC-014, visualizador de dúvidas frequentes da BCE, e DOC-024, página de biomassa do PCTec, têm aquisição bloqueada e `indexavel=false`. Não geraram conteúdo ou vetores fictícios. O mínimo de vinte documentos é atendido pelas 37 fontes utilizáveis.

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
data/originais/<DOC>/<versao>/original.html ou original.pdf snapshot preservado, fora do Git
data/extraido/<DOC>__<versao>.json           texto com títulos e parágrafos
data/chunks/chunks.jsonl                    trechos aprovados
data/index/manifesto.json                   identidade da coleção ativa
```

O hash identifica os bytes de uma versão, não sua veracidade. Nova aquisição pode trazer uma página diferente; reprodutibilidade exata depende de preservar os originais daquela execução.

## Coleta e mapa são entradas futuras

O KML de 14 pontos e a ficha da praça permanecem separados da coleção textual ativa. Uma integração futura deverá importar somente descrições humanas revisadas, com IDs e procedência, distinguindo-as de sugestões da IA. Fotos não são indexadas neste RAG. Veja o [inventário geográfico](../coleta/mapeamento.md).

## Expansão de 11/11/2026

As quinze propostas foram cadastradas como DOC-028 a DOC-042, com aprovação editorial do responsável e curadoria assistida por Codex. Doze geraram 80 chunks novos, somados aos 94 anteriores. O Chroma contém 174 registros de 37 documentos.

- DOC-028: guia DDS 2026, páginas 2 a 16, incluindo atendimento no Gama. Documentos pessoais de candidatos não foram coletados.
- DOC-030 a DOC-036: Wi-Fi, conta institucional, empréstimos, cadastro e mobiliário acessível, acolhimento e acesso remoto CAPES.
- DOC-038: manual 2026.2, páginas 69, 96 e 97 sobre acessibilidade; RU e disciplinas excluídos.
- DOC-039 e DOC-040: serviços de acessibilidade e Biblioteca Digital e Sonora. Estruturas exclusivas do Darcy não são apresentadas como locais no Gama.
- DOC-042: edital 10/2026 preservado como histórico, com validade de consulta até 12/04/2026. O filtro o exclui das buscas atuais; não comprova inscrições abertas ou valores vigentes.
- DOC-029: mapa CEPLAN baixado e inspecionado visualmente. É levantamento de 2015 com pouca identificação textual; preservado como evidência, sem embeddings.
- DOC-037 e DOC-041: BRB respondeu HTTP 503/erro de conexão nas retentativas. Propostas registradas, sem texto inventado. Junto de DOC-014 e DOC-024, compõem as cinco exclusões.

A extração de PDF usa PyMuPDF e preserva o número da página no caminho da seção. Os originais e hashes permanecem locais. A extração não transforma desenhos em rotas ou nomes de salas automaticamente.
