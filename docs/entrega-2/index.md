# Entrega 2 · Base de conhecimento e protótipo RAG

<span class="selo selo--verde">Implementado e demonstrado localmente</span>

O protótipo **recupera informações do campus e responde com fontes**. A aplicação FCTE Campus usa uma API Python com embeddings locais, Chroma persistente e Gemini. Esta entrega apresenta artefatos, execução real e avaliação; o Pages reproduz os registros sem executar o modelo no navegador.

<div class="fcte-status-grid">
  <div class="fcte-status"><strong>37 documentos</strong><span>42 aprovados; cinco fora do índice</span></div>
  <div class="fcte-status"><strong>174 × 384</strong><span>Chunks e embeddings E5 no Chroma local</span></div>
  <div class="fcte-status"><strong>15/15 coletadas</strong><span>Rodada híbrida completa, com revisão e tentativas registradas</span></div>
</div>

## Correspondência com o enunciado

| Exigência | O que entregamos | Onde conferir |
|---|---|---|
| Base curada | Catálogo, aprovação expressa, versões, limitações e seleção dos indexáveis | [Base](base-de-conhecimento.md) |
| Mínimo de 20 documentos-fonte | **37 fontes efetivamente indexadas**, sem contar chunks como novas fontes | [Catálogo](base-de-conhecimento.md#catalogo-das-fontes) |
| Estratégia de chunking | Estrutura de títulos e seções, alvo 300, sobreposição até 40 quando há subdivisão | [Chunking](chunking.md) |
| Estratégia de embeddings | E5 multilíngue small fixado, 384 dimensões, prefixos e normalização | [Embeddings](embeddings.md) |
| Banco vetorial implementado | Chroma persistente, coleção ativa e reabertura comprovada | [Banco](banco-vetorial.md) |
| Consulta submetida | Perguntas e IDs de execuções reais | [Demonstração](demonstracao.md) |
| Recuperação dos relevantes | Top-5 registrado com IDs, fontes e distâncias | [Demonstração](demonstracao.md) |
| Resposta fundamentada | Respostas reais, afirmações e fontes; limites da verificação | [Demonstração](demonstracao.md) |
| Evidência das fontes | Documento, seção, versão, hash e URL | [Evidências](evidencias.md) |
| Diagrama de arquitetura | Ingestão, consulta local, Gemini externo e integração com o PWA | [Arquitetura](arquitetura.md) |
| Pipeline de ingestão | Etapas, scripts, entradas, saídas e reconstrução | [Pipeline](pipeline-ingestao.md) |

## Entenda antes de olhar o código

Pense numa biblioteca. Os documentos são os livros; os chunks são fichas de consulta; o E5 organiza as fichas por significado; o Chroma guarda o catálogo; BM25 procura palavras e siglas; o Gemini escreve a resposta com as fichas encontradas. **Não treinamos o Gemini com os documentos**: enviamos evidências a cada pergunta.

[Ver a esteira animada](../visao/esteira-rag.md){ .md-button .md-button--primary }
[Ver uma consulta real](demonstracao.md){ .md-button }

!!! info "O que a avaliação mostrou"
    A base ampliada foi avaliada nas **15 perguntas**, todas com HTTP 200 na primeira tentativa. Hit@5 **12/12**; precisão **17/75**; fundamentação **49/49**; rastreabilidade **16/16**; ausência **3/3**. Persistência e 74 testes confirmados. Q07 ficou parcial e a precisão segue abaixo da meta. [Ver avaliação completa](avaliacao.md).

## Limites da conclusão

O mínimo de fontes, indexação, consulta, resposta, rastreabilidade e documentação estão demonstrados. Isso conclui o protótipo desta entrega, sem declarar qualidade perfeita ou operação em produção. Ainda precisamos reduzir ruído, revisar vigência e ambiguidades e ampliar a avaliação humana. O orquestrador comum, ocupação de salas, transporte em tempo real e rotas continuam fora do implementado.

O piloto antigo de cinco páginas e KML foi substituído na coleção ativa por **37 documentos HTML/PDF e 174 chunks**. O mapa de 14 pontos continua como inventário separado; não é apresentado como parte desse índice.
