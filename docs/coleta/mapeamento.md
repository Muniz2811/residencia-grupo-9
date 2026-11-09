---
template: mapping.html
---

# Mapeamento do campus

O arquivo `Mapeamento.kml` fornecido pela equipe contém **14 marcadores Point**. O piloto preservou todos em GeoJSON e preparou texto para 11 deles.

<div data-campus-map data-map-tiles="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></div>

<noscript>O mapa interativo requer JavaScript. Os quantitativos e as limitações estão descritos abaixo; os dados exportados podem ser consultados no arquivo de evidências.</noscript>

!!! info "Como ler o mapa"
    O fundo cartográfico é do OpenStreetMap; os 14 pontos sobrepostos são anotações da equipe no KML. Use o zoom, arraste o mapa ou selecione um marcador para conferir sua ficha. Os pontos cinza foram preservados, mas ficaram fora dos chunks. O mapa-base não confirma os nomes, acessibilidade ou condições atuais dos locais anotados; esta página não calcula rotas.

O mapa-base requer conexão à internet. A visualização usa [Leaflet 1.9.4](https://leafletjs.com/reference-1.9.4.html) e preserva a [atribuição do OpenStreetMap](https://www.openstreetmap.org/copyright), conforme sua [política de uso dos tiles](https://operations.osmfoundation.org/policies/tiles/). Não solicita a localização do dispositivo.

## O que entrou no piloto

O inventário inclui entradas, estacionamentos, UAC, quadra, área externa e contêiner. O RU ficou fora do recorte textual. Dois pontos chamados apenas **“Laboratório”** aguardam identificação; não receberam nomes inferidos a partir da posição.

| Situação | Tratamento |
|---|---|
| UAC e entrada por seu nome completo | Associação textual com `BLD-UAC`, mantendo os pontos distintos |
| Duas entradas do prédio de docência | Preservadas como pontos diferentes; associação com UED ainda candidata |
| Nome “Entada” no arquivo | Grafia original preservada, com aviso |
| LDTEA | Não há marcador explicitamente identificado com esse nome |
| Praça Solar e Praça da FCTE | Não foram fundidas automaticamente |
| Altitude zero | Não foi interpretada como andar térreo |

O KML é **um documento-fonte**. Cada ponto pode gerar uma unidade de recuperação, sem se tornar uma fonte original independente.

## Como ajuda o RAG

Uma consulta futura poderá recuperar a descrição do UAC e resolver seu ponto por ID. Coordenadas ficam também em formato estruturado para uso geográfico.

Similaridade de embeddings não calcula distância física. Perguntas sobre “mais próximo”, rota ou prédio que contém o GPS exigem uma operação geográfica separada. Um ponto de referência não delimita uma construção.

## Próximas melhorias no inventário

1. Identificar os dois laboratórios genéricos.
2. Confirmar a associação das entradas ao prédio UED.
3. Acrescentar LDTEA e entradas relevantes, com procedência.
4. Registrar salas e andares por fonte ou observação, não pela coordenada.
5. Revisar contornos apenas quando houver evidência suficiente para polígonos.

No Maps, a ordem de pesquisa é latitude e longitude; no KML/GeoJSON, longitude e latitude. Preservamos essa ordem na importação. [Referência KML](https://developers.google.com/kml/documentation/kmlreference#coordinates).

Os dados dos marcadores estão no [arquivo de evidências](../assets/downloads/evidencias.json). A distribuição das anotações e dos dados cartográficos deve preservar sua procedência e condições de uso.
