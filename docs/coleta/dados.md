# Dados, procedência e privacidade

Cada tipo de dado tem um papel específico no projeto.

| Dado | Uso | Limite |
|---|---|---|
| Foto | Evidência da coleta | Não confirma acesso, funcionamento ou disponibilidade atual |
| Sugestão da IA | Apoio ao preenchimento | Não vira fato confirmado automaticamente |
| Descrição final | Texto revisado da ficha | Precisa de procedência e limitações |
| Coordenada original | Posição informada pelo dispositivo | Pode ter erro; não identifica andar |
| Coordenada confirmada | Referência espacial da coleta | Deve manter a origem manual/GPS |
| Documento oficial | Informação institucional publicada | Publicação não garante vigência atual |
| Marcador KML | Identificação e posição anotadas pela equipe | Não equivale a polígono ou verificação em campo |

## O que alimentará o RAG

Na primeira versão, apenas textos selecionados e revisados: descrição final, observações confirmadas, identificações e documentos aprovados. Fotos permanecem vinculadas como evidência. O sistema não precisa reenviá-las ao Gemini em cada pergunta textual.

Vários registros podem descrever o mesmo ambiente. Essa relação será feita por IDs de local e prédio, preservando os registros originais. Proximidade GPS sozinha não é motivo para fundir salas ou andares.

## Separação entre projetos

O export da coleta contém dados e fotos para processamento controlado. O RAG recebe uma cópia versionada. O site MkDocs recebe somente evidências selecionadas para documentação: metadados de chunks, pequenas prévias, estatísticas e marcadores de campus.

Este repositório de documentação não contém `.env`, chaves Gemini/Supabase, fotos privadas, os pesos do E5 ou a matriz completa de vetores. O pacote de código disponível no site também não inclui esses arquivos.

## Endereços e caronas

Endereço residencial, contatos e histórico de deslocamento não pertencem ao índice compartilhado. Em uma futura consulta de transporte, a origem será usada para planejar aquela viagem; persistência em perfil dependerá de escolha explícita.

Caronas exigem contas individuais e interesse dos dois lados antes de liberar contato. A senha compartilhada do protótipo de coleta não implementa esse consentimento entre pessoas.

## O que uma referência precisa preservar

Identificação da fonte, URL/caminho, versão/hash, coleta, revisão, validade quando conhecida e limitações. Dados desconhecidos permanecem desconhecidos, sem preenchimento automático para completar o catálogo.
