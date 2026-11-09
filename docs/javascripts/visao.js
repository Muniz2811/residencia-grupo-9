/* Diagrama adaptado de residencia-grupo-4/docs/javascripts/rumo.js.
   Mesma estrutura SVG, setas, pacotes e controles; conteúdo do Grupo 09. */
(function () {
  "use strict";
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function el(tag, cls, html) {
    var e = document.createElement(tag); if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html; return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function(c) {
    return {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}[c];
  }); }
  var NOS = {"usuario": [12, 300, 150, 84, "Estudante", "pergunta em português"], "portal": [196, 300, 170, 84, "Portal único", "proposta de integração"], "orq": [400, 300, 185, 84, "Orquestrador", "encaminhamento proposto"], "api09": [630, 62, 165, 76, "Consulta G09", "interface planejada"], "busca": [825, 62, 165, 76, "Busca semântica", "E5-small · 384 dim"], "indice": [1020, 62, 165, 76, "ChromaDB", "a implementar"], "llm09": [825, 178, 165, 76, "LLM gerador", "Gemini · planejado"], "resp09": [630, 178, 165, 76, "Resposta", "fontes ou abstenção"], "base": [630, 288, 165, 70, "Fontes do piloto", "5 HTMLs + 1 KML"], "ingest": [825, 288, 165, 70, "Ingestão", "79 chunks e vetores"], "api04": [630, 470, 165, 76, "Módulo Grupo 04", "integração proposta"], "rag04": [825, 470, 165, 76, "RAG do RUmo", "RU e disciplinas"], "base04": [1020, 470, 165, 76, "Base do G04", "fontes do outro grupo"], "resp04": [630, 600, 165, 76, "Resposta do G04", "fontes identificadas"]};
  var ARESTAS = {"a_up": ["M162,325 L196,325", "comum"], "a_po": ["M366,325 L400,325", "comum"], "a_op": ["M400,360 L366,360", "comum"], "a_pu": ["M196,360 L162,360", "comum"], "a_o9": ["M585,318 C612,318 604,100 630,100", "g09"], "a_9b": ["M795,100 L825,100", "g09"], "a_bi": ["M990,100 L1020,100", "g09"], "a_il": ["M1102,138 C1102,190 1030,216 990,216", "g09"], "a_lr": ["M825,216 L795,216", "g09"], "a_ro": ["M630,225 C590,225 520,255 505,300", "g09"], "a_bg": ["M795,323 L825,323", "g09 offline"], "a_gi": ["M990,323 C1160,323 1160,230 1160,138", "g09 offline"], "a_o4": ["M585,366 C612,366 604,508 630,508", "g04"], "a_4r": ["M795,508 L825,508", "g04"], "a_rb": ["M990,508 L1020,508", "g04"], "a_rr": ["M907,546 C907,638 840,638 795,638", "g04"], "a_r4": ["M630,638 C540,638 480,470 480,384", "g04"]};
  var CENARIOS = [{"id": "ingestao", "nome": "0 · Antes das perguntas: ingestão", "pergunta": "Preparação executada até os embeddings; banco vetorial pendente.", "passos": [{"nos": ["base"], "arestas": [], "quem": "g09", "titulo": "Preservar e selecionar fontes", "texto": "27 HTMLs adquiridos com hash. O piloto seleciona cinco páginas institucionais e um KML da equipe; isso ainda não comprova vinte documentos curados.", "carga": "5 HTMLs + Mapeamento.kml\n14 pontos preservados · 11 incluídos no texto"}, {"nos": ["ingest"], "arestas": ["a_bg"], "quem": "g09", "titulo": "Estruturar os chunks", "texto": "Extração por seção ou entidade. Alvo de 300 tokens, teto operacional de 480 e sobreposição prevista de cerca de 40 apenas quando uma seção longa é dividida.", "carga": "68 chunks dos HTMLs + 11 do mapa = 79\n47–246 tokens de entrada · sobreposição efetiva: zero"}, {"nos": ["ingest"], "arestas": [], "quem": "g09", "titulo": "Gerar embeddings locais", "texto": "Executado: multilingual-e5-small em CPU, 384 dimensões, prefixo passage: e normalização L2. Estes são os vetores dos documentos.", "carga": "vectors.npy · 79 × 384 · float32\nIDs e metadados vinculados às fontes"}, {"nos": ["indice"], "arestas": ["a_gi"], "quem": "g09", "titulo": "Persistir o banco · planejado", "texto": "O Chroma ainda será implementado. A seta mostra a próxima etapa proposta, não uma indexação já realizada.", "carga": "Próximo passo: PersistentClient\nPersistir → fechar → reabrir → consultar"}]}, {"id": "g09", "nome": "1 · Pergunta só do Grupo 09", "pergunta": "“Onde fica o laboratório COSMOS?” · simulação do fluxo futuro, sem consulta executada.", "passos": [{"nos": ["usuario", "portal"], "arestas": ["a_up"], "quem": "comum", "titulo": "O estudante faz uma pergunta", "texto": "A entrada comum é uma proposta de interface para os dois módulos. Esta animação não chama APIs.", "carga": null}, {"nos": ["orq"], "arestas": ["a_po"], "quem": "comum", "titulo": "Encaminhar ao módulo espacial", "texto": "Identificação de laboratórios e ambientes pertence ao Grupo 09. O orquestrador comum ainda não foi implementado.", "carga": "{\"destino\": \"grupo09\", \"situacao\": \"proposta\"}"}, {"nos": ["api09"], "arestas": ["a_o9"], "quem": "g09", "titulo": "Receber a consulta · planejado", "texto": "Uma futura interface receberá a pergunta e filtros pertinentes. Não existe uma API RAG disponível no coletor atual.", "carga": null}, {"nos": ["busca"], "arestas": ["a_9b"], "quem": "g09", "titulo": "Vetorizar a pergunta · planejado", "texto": "Usar query: e o mesmo E5 dos documentos, com a mesma revisão, 384 dimensões e normalização L2.", "carga": "query: Onde fica o laboratório COSMOS?"}, {"nos": ["indice"], "arestas": ["a_bi"], "quem": "g09", "titulo": "Recuperar evidências · planejado", "texto": "A busca deverá retornar até cinco evidências. DOC-005 é fonte esperada do gabarito manual; não há ranking ou distância medidos.", "carga": "Gabarito proposto: DOC-005\nSeção COSMOS · não é resultado recuperado"}, {"nos": ["llm09"], "arestas": ["a_il"], "quem": "g09", "titulo": "Construir contexto · planejado", "texto": "O gerador Gemini deverá receber trechos identificados, citar evidências e reconhecer lacunas. Não houve geração RAG no piloto.", "carga": null}, {"nos": ["resp09"], "arestas": ["a_lr"], "quem": "g09", "titulo": "Responder com fontes · planejado", "texto": "Cada afirmação deverá ser sustentada. O vínculo será citação → chunk → documento, seção e versão.", "carga": "Saída prevista: resposta + referências\nSem resposta gerada para apresentar nesta versão."}, {"nos": ["orq", "portal", "usuario"], "arestas": ["a_ro", "a_op", "a_pu"], "quem": "comum", "titulo": "Entregar informação rastreável", "texto": "A resposta futura deverá manter a identificação do módulo, origem e limitações. A consulta será avaliada antes de se afirmar que funciona.", "carga": null}]}, {"id": "integrado", "nome": "2 · Pergunta que usa os dois grupos", "pergunta": "“Onde fica a biblioteca e quais disciplinas posso cursar?” · integração proposta.", "passos": [{"nos": ["usuario", "portal"], "arestas": ["a_up"], "quem": "comum", "titulo": "Uma pergunta, dois assuntos", "texto": "Localização pertence ao Grupo 09; regras de disciplinas são da frente do Grupo 04.", "carga": null}, {"nos": ["orq"], "arestas": ["a_po"], "quem": "comum", "titulo": "Dividir e encaminhar · proposta", "texto": "O contrato e o encaminhamento entre módulos ainda precisam ser acordados.", "carga": "grupo09 → localização da biblioteca\ngrupo04 → regras acadêmicas"}, {"nos": ["api09", "api04"], "arestas": ["a_o9", "a_o4"], "quem": "comum", "titulo": "Acionar os módulos · proposta", "texto": "Cada grupo permanece responsável pelo próprio código, base e evidências. Não há integração comum em execução.", "carga": null}, {"nos": ["busca", "indice", "llm09", "resp09", "rag04", "base04", "resp04"], "arestas": ["a_9b", "a_bi", "a_il", "a_lr", "a_4r", "a_rb", "a_rr"], "quem": "comum", "titulo": "Preservar as fontes por domínio", "texto": "O desenho mostra a composição pretendida; não comprova recuperação ou resposta implementada pelo Grupo 09.", "carga": null}, {"nos": ["orq"], "arestas": ["a_ro", "a_r4"], "quem": "comum", "titulo": "Compor sem misturar evidências", "texto": "Uma ausência ou limitação de um módulo não pode ser completada como fato pelo outro.", "carga": null}, {"nos": ["portal", "usuario"], "arestas": ["a_op", "a_pu"], "quem": "comum", "titulo": "Apresentar cada origem", "texto": "O estudante poderá conferir quais fontes sustentam cada parte. O piloto independente não depende dessa integração.", "carga": null}]}, {"id": "ausencia", "nome": "3 · Pergunta sem base", "pergunta": "“A sala I10 está livre agora?” · comportamento esperado, ainda não avaliado.", "passos": [{"nos": ["usuario", "portal", "orq"], "arestas": ["a_up", "a_po"], "quem": "comum", "titulo": "Identificar o tipo de informação", "texto": "A pergunta pede ocupação atual. Documentos estáticos e fotos não fornecem esse dado em tempo real.", "carga": null}, {"nos": ["api09", "busca", "indice"], "arestas": ["a_o9", "a_9b", "a_bi"], "quem": "g09", "titulo": "Buscar não cria evidência", "texto": "Mesmo que apareça um texto sobre a sala ou a UAC, isso não comprova que o ambiente está livre.", "carga": null}, {"nos": ["llm09", "resp09"], "arestas": ["a_il", "a_lr"], "quem": "g09", "titulo": "Reconhecer ausência · esperado", "texto": "A futura geração deverá informar a ausência de dados atuais. É um critério de avaliação; ainda não é um acerto medido.", "carga": "Critério: não afirmar ocupação atual\nNão há execução de resposta para mostrar."}, {"nos": ["orq", "portal", "usuario"], "arestas": ["a_ro", "a_op", "a_pu"], "quem": "comum", "titulo": "Explicitar a limitação", "texto": "A avaliação incluirá quatro perguntas sem resposta, além de dezesseis respondíveis. As metas não são resultados.", "carga": null}]}];
  function montarFluxo(raiz) {
    if (!raiz || raiz.dataset.pronto) return;
    raiz.dataset.pronto = "1";
    var NS = "http://www.w3.org/2000/svg";
    var topo = el("div", "rm-fluxo__topo");
    var corpo = el("div", "rm-fluxo__corpo");
    var info = el("div", "rm-fluxo__info");
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 1200 700");
    svg.setAttribute("class", "rm-fluxo__svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Diagrama do Coleta FCTE: preparação executada e consulta e integração planejadas");
    svg.innerHTML =
      '<defs><marker id="rm-seta" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 z" fill="#6b7a8c"/></marker></defs>' +
      '<rect class="rm-grupo rm-grupo--comum" x="184" y="250" width="414" height="150" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--comum" x="198" y="278">Camada comum · G04 + G09</text>' +
      '<rect class="rm-grupo rm-grupo--g09" x="612" y="8" width="584" height="365" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--g09" x="628" y="42">Grupo 09 · Coleta FCTE (RAG do campus)</text>' +
      '<rect class="rm-grupo rm-grupo--g04" x="612" y="412" width="584" height="282" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--g04" x="628" y="448">Grupo 04 · RUmo (integração proposta)</text>' +
      '<text class="rm-legenda-svg" x="12" y="470">linha cheia: fluxo de consulta proposto</text>' +
      '<text class="rm-legenda-svg" x="12" y="494">linha tracejada: ingestão / indexação prevista</text>' +
      '<text class="rm-legenda-svg" x="12" y="518">bolinha amarela: dados em trânsito</text>';
    var nosEl = {}, arestasEl = {}, animacoes = new Set(), remocoes = new Set();
    Object.keys(ARESTAS).forEach(function (k) {
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", ARESTAS[k][0]);
      p.setAttribute("class", "rm-aresta" + (ARESTAS[k][1].indexOf("offline") >= 0 ? " rm-aresta--offline" : "") +
        (ARESTAS[k][1].indexOf("g09") === 0 ? " rm-g09" : ""));
      svg.appendChild(p); arestasEl[k] = p;
    });
    Object.keys(NOS).forEach(function (k) {
      var n = NOS[k], g = document.createElementNS(NS, "g");
      g.setAttribute("class", "rm-no" + (["api04", "rag04", "base04", "resp04"].indexOf(k) >= 0 ? " rm-g04" : ["usuario", "portal", "orq"].indexOf(k) >= 0 ? " rm-comum" : " rm-g09"));
      g.innerHTML = '<rect x="' + n[0] + '" y="' + n[1] + '" width="' + n[2] + '" height="' + n[3] + '" rx="10"/>' +
        '<text x="' + (n[0] + n[2] / 2) + '" y="' + (n[1] + n[3] / 2 - 5) + '" text-anchor="middle">' + n[4] + "</text>" +
        '<text class="rm-sub" x="' + (n[0] + n[2] / 2) + '" y="' + (n[1] + n[3] / 2 + 18) + '" text-anchor="middle">' + n[5] + "</text>";
      svg.appendChild(g); nosEl[k] = g;
    });
    var camadaPacotes = document.createElementNS(NS, "g");
    svg.appendChild(camadaPacotes);

    var cen = 0, passo = -1, play = null;
    var botoesCen = CENARIOS.map(function (c, i) {
      var b = el("button", "rm-fluxo__cen", c.nome);
      b.type = "button";
      b.addEventListener("click", function () { parar(); escolher(i); });
      topo.appendChild(b); return b;
    });
    var ctr = el("div", "rm-fluxo__controles");
    var bAnt = el("button", "rm-fluxo__btn rm-fluxo__btn--sec", "◀");
    var bPlay = el("button", "rm-fluxo__btn", "▶ Reproduzir");
    var bProx = el("button", "rm-fluxo__btn rm-fluxo__btn--sec", "▶|");
    var rotPasso = el("span", "rm-fluxo__passo", "");
    [bAnt, bPlay, bProx].forEach(function (b) { b.type = "button"; });
    bAnt.setAttribute("aria-label", "Passo anterior"); bProx.setAttribute("aria-label", "Próximo passo");
    var bTela = el("button", "rm-fluxo__btn rm-fluxo__btn--sec", "⛶ Tela cheia");
    bTela.type = "button";
    bTela.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (raiz.requestFullscreen) raiz.requestFullscreen().catch(function() {});
    });
    ctr.appendChild(rotPasso); ctr.appendChild(bAnt); ctr.appendChild(bPlay); ctr.appendChild(bProx); ctr.appendChild(bTela);
    topo.appendChild(ctr);

    function animarPacote(path) {
      if (reduzido || !path.getTotalLength) return;
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "10"); c.setAttribute("class", "rm-pacote");
      camadaPacotes.appendChild(c);
      var total = path.getTotalLength(), ini = performance.now(), dur = 900;
      (function quadro(t) {
        var p = Math.min(1, (t - ini) / dur), pt = path.getPointAtLength(total * p);
        c.setAttribute("cx", pt.x); c.setAttribute("cy", pt.y);
        if (p < 1) { var id = requestAnimationFrame(function(t) { animacoes.delete(id); quadro(t); }); animacoes.add(id); } else { var id = setTimeout(function () { remocoes.delete(id); c.remove(); }, 150); remocoes.add(id); }
      })(ini);
    }

    function render() {
      animacoes.forEach(cancelAnimationFrame); animacoes.clear(); remocoes.forEach(clearTimeout); remocoes.clear(); camadaPacotes.replaceChildren();
      var c = CENARIOS[cen];
      botoesCen.forEach(function (b, i) { b.setAttribute("aria-pressed", i === cen ? "true" : "false"); });
      Object.keys(nosEl).forEach(function (k) { nosEl[k].classList.remove("rm-ativo", "rm-feito"); });
      Object.keys(arestasEl).forEach(function (k) { arestasEl[k].classList.remove("rm-ativa"); });
      for (var i = 0; i < passo; i++) c.passos[i].nos.forEach(function (n) { nosEl[n].classList.add("rm-feito"); });
      var html = '<div class="rm-fluxo__pergunta"><b>Pergunta:</b> ' + c.pergunta + "</div>";
      if (passo < 0) {
        html += '<div class="rm-fluxo__texto"><h4>Clique em ▶ Reproduzir</h4><p>Ou avance passo a passo com ▶|. Cada passo acende quem está agindo, anima a seta e mostra aqui embaixo os dados trocados.</p></div>';
        rotPasso.textContent = "0/" + c.passos.length;
      } else {
        var s = c.passos[passo];
        s.nos.forEach(function (n) { nosEl[n].classList.remove("rm-feito"); nosEl[n].classList.add("rm-ativo"); });
        s.arestas.forEach(function (a) { arestasEl[a].classList.add("rm-ativa"); animarPacote(arestasEl[a]); });
        var quem = { g04: "Grupo 04 · RUmo", g09: "Grupo 09", comum: "Camada comum" }[s.quem];
        html += '<div class="rm-fluxo__texto"><span class="rm-fluxo__quem rm-' + s.quem + '">Passo ' + (passo + 1) + " · " + quem + "</span>" +
          "<h4>" + s.titulo + "</h4><p>" + s.texto + "</p></div>" +
          (s.carga ? '<div class="rm-fluxo__dados"><span class="rm-fluxo__quem rm-comum">Dados trocados</span><pre><code>' + esc(s.carga) + "</code></pre></div>" : "");
        rotPasso.textContent = (passo + 1) + "/" + c.passos.length;
      }
      info.innerHTML = html; bAnt.disabled = passo < 0; bProx.disabled = passo >= c.passos.length - 1;
    }
    function escolher(i) { cen = i; passo = -1; render(); }
    function avancar() {
      var n = CENARIOS[cen].passos.length;
      if (passo < n - 1) { passo++; render(); return true; }
      return false;
    }
    function parar() { clearInterval(play); play = null; bPlay.textContent = "▶ Reproduzir"; bPlay.setAttribute("aria-pressed", "false"); animacoes.forEach(cancelAnimationFrame); animacoes.clear(); remocoes.forEach(clearTimeout); remocoes.clear(); camadaPacotes.replaceChildren(); }
    bProx.addEventListener("click", function () { parar(); avancar(); });
    bAnt.addEventListener("click", function () { parar(); if (passo > -1) { passo--; render(); } });
    bPlay.addEventListener("click", function () {
      if (play) { parar(); return; }
      if (passo >= CENARIOS[cen].passos.length - 1) passo = -1;
      bPlay.textContent = "❚❚ Pausar"; bPlay.setAttribute("aria-pressed", "true");
      avancar();
      play = setInterval(function () { if (!avancar()) parar(); }, reduzido ? 1500 : 3200);
    });

    corpo.appendChild(svg); corpo.appendChild(info);
    raiz.appendChild(topo); raiz.appendChild(corpo);
    info.setAttribute("aria-live", "polite");
    raiz.addEventListener("keydown", function(ev) { if (["ArrowLeft", "ArrowRight", "Home", "End"].indexOf(ev.key) < 0) return; ev.preventDefault(); parar(); if(ev.key === "ArrowRight") avancar(); else { passo = ev.key === "Home" ? -1 : ev.key === "End" ? CENARIOS[cen].passos.length - 1 : Math.max(-1, passo - 1); render(); } });
    document.addEventListener("visibilitychange", function() { if(document.hidden) parar(); });
    if (!document.fullscreenEnabled) bTela.hidden = true;
    var inicial = parseInt(raiz.dataset.cenario || "1", 10);
    escolher(isNaN(inicial) ? 1 : inicial);
    var passoInicial = parseInt(raiz.dataset.passo || "-1", 10);
    while (passo < passoInicial && avancar()) {}
  }


  function iniciar() { document.querySelectorAll("[data-fluxo]").forEach(montarFluxo); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
