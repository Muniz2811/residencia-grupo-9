# Base de conhecimento

## Aquisição

Foram preservados **27 HTMLs**, com resposta HTTP 200, origem, data, tamanho e SHA-256. O conjunto ocupa aproximadamente **3,24 MiB**. Há 26 páginas com texto no HTML e um visualizador Word da FAQ BCE que exige extração do documento subjacente.

Os originais são snapshots das respostas HTML. Imagens, CSS e resultados externos de iframes não foram adquiridos. As páginas de pesquisa do DF no Ponto, por exemplo, contêm orientações, mas não incluem no snapshot as tabelas consultadas pelo sistema incorporado.

Dois endereços precisaram ser atualizados por links institucionais: a FAQ BCE e o laboratório de biomassa do PCTec. O histórico permanece no projeto RAG.

## Recorte de cinco páginas

| Fonte | Motivo da seleção | Chunks |
|---|---|---|
| DOC-001 · Infraestrutura | Associa edifícios a usos institucionais | 1 |
| DOC-002 · Contato | Localiza doze setores e seus atendimentos | 12 |
| DOC-005 · Laboratórios | Preserva nome e localização de 48 laboratórios | 48 |
| DOC-007 · Salas de aula | Descreve ambientes e recursos da UAC | 1 |
| DOC-012 · Biblioteca Campus Gama | Serviços, espaços e condições de acesso | 6 |

O KML da equipe é uma sexta fonte, com 11 chunks elegíveis. A coleta da praça foi preservada separadamente, fora do recorte atual.

## Curadoria aplicada e pendências

- Extração do artigo principal, sem menus e endereço genérico do rodapé do Darcy Ribeiro.
- Remoção de escalas e contatos pessoais desnecessários nos diretórios.
- Tratamento do destaque duplicado da Secretaria de Graduação.
- Preservação de códigos de sala e de múltiplas localizações de um laboratório.
- Exclusão do trecho da biblioteca que menciona FCE, por ambiguidade de campus.
- Registro de que horários e estatísticas não têm vigência confirmada.

O DOC-001 faz uma referência genérica a secretaria na UED; o DOC-002 identifica especificamente a Secretaria de Graduação na UAC. A geração futura precisará preservar essa distinção, sem tratar toda secretaria como um único setor.

**A aprovação humana final continua pendente.** A preparação não alterou `approved_for_production_index=false`. Conteúdo histórico, expirado, duvidoso ou incompatível com o campus não deve entrar no índice ativo por mera existência de um arquivo.

## Catálogo das 27 referências

Documentos diferentes do mesmo portal podem contar separadamente se possuem conteúdo próprio. Vários chunks da mesma página continuam sendo uma fonte. Cópias e menus não ampliam a contagem.

--8<-- "includes/fontes.md"

[Baixar catálogo CSV](../assets/downloads/fontes.csv){ .md-button }

## Metadados necessários à base aprovada

Cada fonte terá identificador, título, URL/caminho, tipo, campus/abrangência, data de coleta, revisão, vigência, status, hash/versão e limitações. A data de download não será usada como substituto da validade da informação.

Os hashes provam identidade de arquivos; não provam veracidade ou ausência de duplicidade semântica. O conjunto mínimo de vinte fontes depende de concluir essa curadoria.
