## Cosmos · registro real

**Etapa:** Avaliação inicial · busca densa. **Método:** `densa`.

**Pergunta:** O COSMOS fica no térreo da UAC, sala 101, certo?

**Resposta registrada:**

> O laboratório COSMOS fica localizado no Prédio LDTEA, no 2º andar, sala 304. [1]

Execução: `cf170f2a-ffff-419b-8f37-a5092f403934` · `2026-11-11T15:19:33.851970+00:00` · modelo `gemini-3.5-flash-lite`.

Prompt `campus-rag-v1`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.

| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |
|---:|---|---:|---|
| 1 | `c_df45b0823ed5a0bc` · DOC-018 | 0.148859 | Não |
| 2 | `c_f2c6f00293fae365` · DOC-005 | 0.152717 | Sim |
| 3 | `c_0cf9944816258a3e` · DOC-006 | 0.156527 | Não |
| 4 | `c_2d85dbef5af80376` · DOC-018 | 0.157690 | Não |
| 5 | `c_0e12f3858918d20b` · DOC-005 | 0.159852 | Não |

### Evidências citadas

- **DOC-005 · Diretório de laboratórios da FCTE**, versão `2026-11-11`, seção Laboratórios FCTE > Laboratórios de Engenharia Aeroespacial. Excerto: “Computational Aerospace Simulations & Modeling Laboratory – COSMOS … Local: Prédio LDTEA – 2º andar – Sala 304”. [Abrir fonte](https://fcte.unb.br/homologa_laboratorios/).

## Biblioteca · registro real

**Etapa:** Avaliação inicial · busca densa. **Método:** `densa`.

**Pergunta:** Na biblioteca do Gama há lugar para estudar sozinho e em grupo?

**Resposta registrada:**

> A Biblioteca do Campus Gama dispõe de cabines individuais para estudo e mesas para estudo em grupo. [1]

Execução: `fbe2df88-dced-4170-bfc7-da7b05e3cf96` · `2026-11-11T15:19:06.407819+00:00` · modelo `gemini-3.5-flash-lite`.

Prompt `campus-rag-v1`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.

| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |
|---:|---|---:|---|
| 1 | `c_c8a0b710c3c50b09` · DOC-012 | 0.125138 | Sim |
| 2 | `c_17241a7563801760` · DOC-008 | 0.140344 | Não |
| 3 | `c_1cfe0848c545f27c` · DOC-012 | 0.141437 | Não |
| 4 | `c_5faca10e6e792b67` · DOC-006 | 0.141811 | Não |
| 5 | `c_0a5abc6e344294e8` · DOC-023 | 0.167065 | Não |

### Evidências citadas

- **DOC-012 · Biblioteca Campus Gama – BCE**, versão `2026-11-11`, seção BIBLIOTECA SETORIAL CAMPUS GAMA. Excerto: “espaço para estudo com cabines individuais e mesas para estudo em grupo”. [Abrir fonte](https://bce.unb.br/biblioteca-campus-gama/).

## Ausencia · registro real

**Etapa:** Avaliação inicial · busca densa. **Método:** `densa`.

**Pergunta:** A sala I10 está livre agora?

**Resposta registrada:**

> A base de conhecimento não possui informações sobre a ocupação atual ou disponibilidade da sala I10.

Execução: `54ec3595-e6db-493b-82d3-0ff97bc29f09` · `2026-11-11T15:19:42.604793+00:00` · modelo `gemini-3.5-flash-lite`.

Prompt `campus-rag-v1`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.

| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |
|---:|---|---:|---|
| 1 | `c_cd638caa1b0d517e` · DOC-005 | 0.162923 | Não |
| 2 | `c_0904be5ddfac8a87` · DOC-005 | 0.164374 | Não |
| 3 | `c_78aefd971e83ca2c` · DOC-016 | 0.170036 | Não |
| 4 | `c_def12e461bfc328e` · DOC-011 | 0.171277 | Não |
| 5 | `c_3ec499d6018e067b` · DOC-025 | 0.172945 | Não |

### Evidências citadas

Não houve afirmação com fonte emitida: o sistema declarou ausência. Os trechos recuperados não comprovam ocupação atual.

## Cabines · registro real

**Etapa:** Verificação posterior · busca híbrida. **Método:** `hibrida_rrf`.

**Pergunta:** e cabines de estudo individual ?

**Resposta registrada:**

> A Biblioteca do Campus Gama dispoe de espaco para estudo com cabines individuais. [1]

Execução: `071e88ec-7cbb-49ec-8229-b054b1b68c15` · `2026-11-11T17:30:30.862779+00:00` · modelo `gemini-3.5-flash-lite`.

Prompt `campus-rag-v2`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.

| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |
|---:|---|---:|---|
| 1 | `c_c8a0b710c3c50b09` · DOC-012 | 0.099420 | Sim |
| 2 | `c_1cfe0848c545f27c` · DOC-012 | 0.114650 | Não |
| 3 | `c_17241a7563801760` · DOC-008 | 0.128567 | Não |
| 4 | `c_5faca10e6e792b67` · DOC-006 | 0.146643 | Não |
| 5 | `c_45e04c73c85bdc29` · DOC-001 | 0.170998 | Não |

### Evidências citadas

- **DOC-012 · Biblioteca Campus Gama – BCE**, versão `2026-11-11`, seção BIBLIOTECA SETORIAL CAMPUS GAMA. Excerto: “espaço para estudo com cabines individuais e mesas para estudo em grupo”. [Abrir fonte](https://bce.unb.br/biblioteca-campus-gama/).

**Consulta contextualizada usada na busca:**

```text
Biblioteca Campus Gama – BCE. e cabines de estudo individual ?
```

O contexto anterior identifica o assunto; os fatos precisam de evidência na recuperação atual.

## Lema · registro real

**Etapa:** Verificação posterior · busca híbrida. **Método:** `hibrida_rrf`.

**Pergunta:** Qual é a localização do LEMA?

**Resposta registrada:**

> O Laboratório de Estruturas e Materiais Aeroespaciais (LEMA) está localizado no Prédio LDTEA, no térreo, na sala 103. [1]

Execução: `3b0b6497-b098-4ec3-a922-eb0d2b8af0bf` · `2026-11-11T17:30:41.378681+00:00` · modelo `gemini-3.5-flash-lite`.

Prompt `campus-rag-v2`; mesma coleção de 94 chunks. O ranking abaixo é o registrado nessa execução.

| Posição | Chunk / fonte | Distância cosseno | Usado na resposta? |
|---:|---|---:|---|
| 1 | `c_84847b7559c2bfb8` · DOC-015 | 0.146771 | Não |
| 2 | `c_f2c6f00293fae365` · DOC-005 | 0.160813 | Sim |
| 3 | `c_436a2249e7a6d0fb` · DOC-027 | 0.214183 | Não |
| 4 | `c_4e7588ca515d195f` · DOC-016 | 0.152038 | Não |
| 5 | `c_f1e118670e2e6123` · DOC-016 | 0.154056 | Não |

### Evidências citadas

- **DOC-005 · Diretório de laboratórios da FCTE**, versão `2026-11-11`, seção Laboratórios FCTE > Laboratórios de Engenharia Aeroespacial. Excerto: “Laboratório de Estruturas e Materiais Aeroespaciais – LEMA … Local: Prédio LDTEA – Térreo – Sala 103”. [Abrir fonte](https://fcte.unb.br/homologa_laboratorios/).
