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
- Os casos COSMOS, biblioteca e ausência são da avaliação inicial **densa**. Cabines e LEMA são verificações posteriores da busca **híbrida**, separadas dessa avaliação.

!!! info "Mesmo índice, configurações de busca diferentes"
    As execuções usam a coleção `fcte-796894d0d378f4f8d429`, de 25 fontes e 94 chunks. A assinatura do índice pode permanecer igual depois de mudar a busca ou o prompt. Por isso o registro também preserva método e versão do prompt.

--8<-- "includes/demonstracoes.md"

## O que essa demonstração comprova

Consulta submetida, recuperação observada, resposta gerada e referências resolvidas até fonte e versão. A ausência de ocupação da I10 demonstra um limite reconhecido, sem inventar disponibilidade.

Não comprova perfeição em qualquer pergunta, atualidade de todas as fontes ou funcionamento de rotas/transporte. A [avaliação com quinze perguntas](avaliacao.md) inclui erros de recuperação e falhas técnicas, além dos exemplos bem-sucedidos acima.
