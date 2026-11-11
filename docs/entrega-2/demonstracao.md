# Demonstração real: pergunta, recuperação e resposta

<span class="selo selo--verde">Execuções registradas em 11/11/2026</span>

Esta página apresenta **registros reais**, não apenas respostas esperadas. A pergunta foi submetida à API, houve recuperação e o Gemini produziu a resposta abaixo. O site reproduz os registros; clicar nos controles não chama o modelo nem consome cota.

[Reproduzir a esteira animada](../visao/esteira-rag.md){ .md-button .md-button--primary }
[Baixar demonstrações JSON](../assets/downloads/demonstracoes.json){ .md-button }

## Como ler

- Pergunta, execução, modelo e versão do prompt identificam o experimento.
- O ranking mostra os cinco resultados efetivos. Um trecho recuperado pode ser irrelevante e não ser citado.
- A resposta usa citações numéricas; abaixo identificamos seus chunks, fontes, seção e versão.
- Excertos são abreviados para publicação; o log integral permanece no projeto RAG local.
- COSMOS, biblioteca, LEMA e ausência são da nova avaliação completa **híbrida**. Cabines é uma verificação adicional de continuidade de conversa, fora das quinze métricas.

!!! info "Registros da implementação atual"
    As execuções exibidas usam busca híbrida, prompt v2 e a coleção `fcte-796894d0d378f4f8d429`, de 25 fontes e 94 chunks. A assinatura do índice não muda necessariamente ao alterar a busca; método, prompt e execução também são registrados.

--8<-- "includes/demonstracoes.md"

## O que essa demonstração comprova

Consulta submetida, recuperação observada, resposta gerada e referências resolvidas até fonte e versão. A ausência de ocupação da I10 demonstra um limite reconhecido, sem inventar disponibilidade.

Não comprova perfeição em qualquer pergunta, atualidade de todas as fontes ou funcionamento de rotas/transporte. A [avaliação completa](avaliacao.md) publica as quinze respostas, rankings, julgamentos e histórico de tentativas, incluindo limitações de conteúdo.
