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
  var NOS = {"usuario": [12, 300, 150, 84, "Estudante", "pergunta em português"], "portal": [196, 300, 170, 84, "PWA FCTE Campus", "interface local"], "orq": [400, 300, 185, 84, "Orquestrador", "encaminhamento proposto"], "api09": [630, 62, 165, 76, "API RAG local", "POST /api/v1/chat"], "busca": [825, 62, 165, 76, "Busca híbrida", "E5 + BM25 → RRF"], "indice": [1020, 62, 165, 76, "Chroma local", "94 registros · cosseno"], "llm09": [825, 178, 165, 76, "LLM gerador", "Gemini API · externo"], "resp09": [630, 178, 165, 76, "Resposta", "fontes ou abstenção"], "base": [630, 288, 165, 70, "Base curada", "25 fontes textuais"], "ingest": [825, 288, 165, 70, "Ingestão", "94 chunks e vetores"], "api04": [630, 470, 165, 76, "Módulo Grupo 04", "integração proposta"], "rag04": [825, 470, 165, 76, "RAG do RUmo", "RU e disciplinas"], "base04": [1020, 470, 165, 76, "Base do G04", "fontes do outro grupo"], "resp04": [630, 600, 165, 76, "Resposta do G04", "fontes identificadas"]};
  var ARESTAS = {"a_up": ["M162,325 L196,325", "comum"], "a_po": ["M366,325 L400,325", "comum"], "a_op": ["M400,360 L366,360", "comum"], "a_pu": ["M196,360 L162,360", "comum"], "a_o9": ["M585,318 C612,318 604,100 630,100", "g09"], "a_9b": ["M795,100 L825,100", "g09"], "a_bi": ["M990,100 L1020,100", "g09"], "a_il": ["M1102,138 C1102,190 1030,216 990,216", "g09"], "a_lr": ["M825,216 L795,216", "g09"], "a_ro": ["M630,225 C590,225 520,255 505,300", "g09"], "a_bg": ["M795,323 L825,323", "g09 offline"], "a_gi": ["M990,323 C1160,323 1160,230 1160,138", "g09 offline"], "a_o4": ["M585,366 C612,366 604,508 630,508", "g04"], "a_4r": ["M795,508 L825,508", "g04"], "a_rb": ["M990,508 L1020,508", "g04"], "a_rr": ["M907,546 C907,638 840,638 795,638", "g04"], "a_r4": ["M630,638 C540,638 480,470 480,384", "g04"], "a_p9": ["M366,318 C585,318 590,100 630,100", "g09"], "a_9p": ["M630,225 C525,225 445,285 280,300", "g09"]};
  var CENARIOS = [{"id": "ingestao", "nome": "0 · Antes das perguntas: ingestão", "pergunta": "Base textual aprovada e Chroma implementado; KML permanece inventário separado.", "passos": [{"nos": ["base"], "arestas": [], "quem": "g09", "titulo": "Curar e preservar as fontes", "texto": "27 fontes aprovadas pelo responsável; 25 disponíveis e indexadas. DOC-014 e DOC-024 têm aquisição bloqueada. Validade desconhecida não vira garantia de atualidade.", "carga": "catalogo/fontes.csv\n25 fontes utilizáveis · originais com versão e SHA-256"}, {"nos": ["ingest"], "arestas": ["a_bg"], "quem": "g09", "titulo": "Extrair e dividir com contexto", "texto": "Agrupar seções irmãs até 300 tokens. Subdividir seção longa com até 40 de sobreposição em unidades inteiras, sem misturar documentos.", "carga": "94 chunks · mínimo 17 · mediana 202 · máximo 300 tokens"}, {"nos": ["ingest"], "arestas": [], "quem": "g09", "titulo": "Codificar documentos localmente", "texto": "E5 multilíngue small: mesma revisão, passage:, 384 dimensões e normalização L2. Sem treinar modelo novo.", "carga": "94 × 384 · float32 · matriz NPZ com IDs e hash"}, {"nos": ["indice"], "arestas": ["a_gi"], "quem": "g09", "titulo": "Persistir e reabrir o índice", "texto": "Chroma PersistentClient no disco. Upsert e coleção versionada; manifesto publicado após completude. Reabertura e consulta em processos novos sem ingestão comprovadas.", "carga": "data/index/chroma/\nfcte-796894d0d378f4f8d429"}]}, {"id": "g09", "nome": "1 · Consulta real do Grupo 09", "pergunta": "Qual é a localização do LEMA? · execução real posterior à correção.", "passos": [{"nos": ["usuario", "portal"], "arestas": ["a_up"], "quem": "comum", "titulo": "Pergunta no PWA local", "texto": "O FCTE Campus já possui chat. A animação reproduz um registro e não faz outra chamada de API.", "carga": null}, {"nos": ["api09"], "arestas": ["a_p9"], "quem": "g09", "titulo": "API do Grupo 09, sem orquestrador comum", "texto": "O proxy do Vite encaminha a pergunta para a API local 8001. A chave permanece no backend. O orquestrador continua uma integração futura.", "carga": "POST /api/v1/chat\nQual é a localização do LEMA?"}, {"nos": ["busca"], "arestas": ["a_9b"], "quem": "g09", "titulo": "Codificar e buscar por significado e palavras", "texto": "O E5 gera o vetor query:; BM25 procura termos específicos. RRF combina as posições dos rankings.", "carga": "E5 384 dim · BM25 k1=1.2, b=0.75\nRRF k=60 · até 30 candidatos por ranking"}, {"nos": ["indice"], "arestas": ["a_bi"], "quem": "g09", "titulo": "Selecionar evidência recuperada", "texto": "O ranking real inclui o diretório que associa o LEMA ao LDTEA, térreo, sala 103. Até cinco trechos, máximo dois por fonte.", "carga": "DOC-005 · c_f2c6f00293fae365\nDistância não é probabilidade de verdade."}, {"nos": ["llm09"], "arestas": ["a_il"], "quem": "g09", "titulo": "Gerar com evidências identificadas", "texto": "Gemini recebe a pergunta e os trechos. Fontes são dados, nunca instruções; não inventar sala, horário ou disponibilidade.", "carga": "gemini-3.5-flash-lite · temperatura 0,1\nprompt campus-rag-v2"}, {"nos": ["resp09"], "arestas": ["a_lr"], "quem": "g09", "titulo": "Resposta registrada, com fonte", "texto": "Os IDs citados são conferidos contra a recuperação. O suporte semântico ainda requer julgamento na avaliação.", "carga": "O Laboratório de Estruturas e Materiais Aeroespaciais (LEMA) está localizado no Prédio LDTEA, no térreo, na sala 103. [1]"}, {"nos": ["portal", "usuario"], "arestas": ["a_9p", "a_pu"], "quem": "g09", "titulo": "Mostrar fonte e registrar a execução", "texto": "A resposta volta diretamente ao PWA local. Registro preserva recuperação, versão da base, método e prompt.", "carga": "3b0b6497-b098-4ec3-a922-eb0d2b8af0bf"}]}, {"id": "integrado", "nome": "2 · Integração futura entre grupos", "pergunta": "Onde fica a biblioteca e quais disciplinas posso cursar? · proposta, não execução.", "passos": [{"nos": ["usuario", "portal"], "arestas": ["a_up"], "quem": "comum", "titulo": "Uma pergunta, dois assuntos", "texto": "Localização pertence ao Grupo 09. RU e disciplinas são responsabilidade do Grupo 04.", "carga": null}, {"nos": ["orq"], "arestas": ["a_po"], "quem": "comum", "titulo": "Orquestrar · integração proposta", "texto": "O contrato comum precisa ser acordado. O PWA local do Grupo 09 já funciona independentemente dele.", "carga": "grupo09 → localização\ngrupo04 → regras acadêmicas"}, {"nos": ["api09", "api04"], "arestas": ["a_o9", "a_o4"], "quem": "comum", "titulo": "Preservar os módulos", "texto": "Cada equipe mantém seu pipeline, fontes e responsabilidades. As conexões entre grupos neste cenário são futuras.", "carga": null}, {"nos": ["resp09", "resp04", "orq"], "arestas": ["a_ro", "a_r4"], "quem": "comum", "titulo": "Compor com procedência", "texto": "Não completar uma lacuna de um módulo como se fosse evidência do outro. Identificar fonte e domínio de cada afirmação.", "carga": null}, {"nos": ["portal", "usuario"], "arestas": ["a_op", "a_pu"], "quem": "comum", "titulo": "Apresentar sem misturar evidências", "texto": "Essa composição não foi executada. A entrega 2 demonstra a consulta independente do Grupo 09.", "carga": null}]}, {"id": "ausencia", "nome": "3 · Ausência reconhecida", "pergunta": "A sala I10 está livre agora? · registro da avaliação inicial densa.", "passos": [{"nos": ["usuario", "portal", "api09"], "arestas": ["a_up", "a_p9"], "quem": "g09", "titulo": "Pergunta exige dado atual", "texto": "A API recebeu uma pergunta de ocupação, que documentos estáticos não conseguem comprovar.", "carga": null}, {"nos": ["busca", "indice"], "arestas": ["a_9b", "a_bi"], "quem": "g09", "titulo": "Recuperação não cria o dado ausente", "texto": "Houve cinco resultados nessa execução densa, sem evidência de ocupação atual. Esse ranking anterior não é apresentado como avaliação da configuração híbrida.", "carga": null}, {"nos": ["llm09", "resp09"], "arestas": ["a_il", "a_lr"], "quem": "g09", "titulo": "Abstenção real, não palpite", "texto": "O gerador declarou insuficiência em vez de afirmar que a sala estava livre.", "carga": "A base de conhecimento não possui informações sobre a ocupação atual ou disponibilidade da sala I10."}, {"nos": ["portal", "usuario"], "arestas": ["a_9p", "a_pu"], "quem": "g09", "titulo": "Conferir o registro", "texto": "A rodada teve 15 perguntas: 12 respondíveis e três sem resposta. Ausência ponta a ponta foi 2/3, com uma falha técnica; não 100%.", "carga": "54ec3595-e6db-493b-82d3-0ff97bc29f09"}]}];
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
    svg.setAttribute("aria-label", "Diagrama do FCTE Campus: RAG local implementado e integração comum futura");
    svg.innerHTML =
      '<defs><marker id="rm-seta" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 z" fill="#6b7a8c"/></marker></defs>' +
      '<rect class="rm-grupo rm-grupo--comum" x="184" y="250" width="414" height="150" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--comum" x="198" y="278">PWA local · orquestrador futuro</text>' +
      '<rect class="rm-grupo rm-grupo--g09" x="612" y="8" width="584" height="365" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--g09" x="628" y="42">Grupo 09 · Coleta FCTE (RAG do campus)</text>' +
      '<rect class="rm-grupo rm-grupo--g04" x="612" y="412" width="584" height="282" rx="14"/>' +
      '<text class="rm-rotulo rm-rotulo--g04" x="628" y="448">Grupo 04 · RUmo (integração proposta)</text>' +
      '<text class="rm-legenda-svg" x="12" y="470">Consulta G09 implementada; comum proposto</text>' +
      '<text class="rm-legenda-svg" x="12" y="494">linha tracejada: ingestão e indexação</text>' +
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
