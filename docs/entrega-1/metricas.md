# Métricas de sucesso

!!! warning "Metas propostas, ainda sem resultados"
    Os critérios abaixo definem como pretendemos verificar o projeto. Não são percentuais alcançados. As estatísticas atuais de preparação e embeddings estão na [Entrega 2](../entrega-2/embeddings.md).

| Dimensão | Como medir | Meta inicial proposta |
|---|---|---|
| Completude dos cadastros publicados | Registros com identificação, localização confirmada, origem, revisão e campos essenciais preenchidos ÷ registros publicados | 100%; informação desconhecida deve ser marcada, sem invenção |
| Sugestões por fotografia | Revisão manual de 30 imagens autorizadas; precisão por atributo = sugestões corretas ÷ sugestões emitidas | Pelo menos 80% por atributo; registrar também atributos presentes que a IA deixou de identificar |
| Recuperação de evidências | Hit@5 em 16 perguntas respondíveis com fontes esperadas previamente definidas | Pelo menos 13/16 perguntas com evidência relevante no top-5 |
| Respostas corretas e fundamentadas | Perguntas com fatos esperados atendidos e afirmações sustentadas por fontes ÷ 16 respondíveis | Pelo menos 13/16; registrar incorreções, omissões e afirmações sem suporte |
| Pertinência das citações | Citações que sustentam a afirmação associada ÷ citações emitidas | Pelo menos 90%; informar separadamente resolução da referência e cobertura das afirmações |
| Reconhecimento de ausência | Perguntas sem resposta na base em que o sistema reconhece a ausência | 4/4; registrar também abstenções indevidas nas respondíveis |
| Conclusão de tarefas | Três tarefas por participante: encontrar local, filtrar espaço e consultar informação com fonte | Pelo menos 80% de conclusão; apresentar número de participantes e de tentativas |
| Utilidade percebida | Escala de 1 a 5 após as tarefas | Mediana de pelo menos 4; apresentar distribuição e tamanho da amostra |
| Tempo de execução | Tempo para tarefas equivalentes, comparando meios atuais e protótipo, com ordem alternada | Definir meta de redução depois de medir a linha de base |
| Persistência e portabilidade | Comparação de IDs e vínculos com fotos após reinício e exportação/restauração de uma amostra identificada | Zero IDs ou vínculos perdidos na amostra |

## Protocolo e registro

O conjunto de avaliação RAG terá **16 perguntas respondíveis e quatro sem resposta**. Perguntas exploratórias usadas para ajustar a busca serão identificadas separadamente. O gabarito registrará fontes, versões, passagens relevantes e fatos esperados antes da execução final.

Usaremos revisão manual, preservando pergunta, chunks recuperados, resposta, citações, parâmetros e decisão do avaliador. Cada proporção terá numerador, denominador e exemplos de acerto e falha. Divergências de avaliação deverão ser registradas e discutidas.

Uma amostra inicial não permite concluir que houve redução de atrasos, melhoria de segurança ou de qualidade de vida. Esses impactos exigiriam outro desenho de estudo. O protocolo técnico de recuperação está em [Avaliação e métricas da Entrega 2](../entrega-2/avaliacao.md).
