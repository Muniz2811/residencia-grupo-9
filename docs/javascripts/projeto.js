/* Identidade e componentes do Grupo 04 adaptados aos artefatos do Grupo 09.
   Interações do site estático: não chamam o endpoint RAG da aplicação. */
(function () {
  "use strict";
  const data = window.FCTE_EVIDENCIAS;
  if (!data) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = motion.matches;
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normalize = value => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const excerpt = example => esc(example.excerpt) + (example.excerpt_truncated ? "…" : "");
  function bars(vector) {
    const max = Math.max(...vector.head.map(Math.abs), 0.001);
    return '<div class="fcte-vector" aria-label="Primeiras 16 dimensões reais do vetor">' + vector.head.map(v => '<i style="--h:' + Math.max(3, Math.abs(v) / max * 95) + '%"' + (v < 0 ? " data-negative" : "") + ' title="' + v + '"></i>').join("") + "</div>";
  }
  function keyboardTabs(buttons, show) {
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => show(index));
      button.addEventListener("keydown", event => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = buttons.length - 1;
        if (next !== undefined) { event.preventDefault(); show(next); buttons[next].focus(); }
      });
    });
  }
  function hero() {
    const root = document.querySelector("[data-hero-demo]");
    if (!root) return;
    const panel = root.querySelector("[role=tabpanel]");
    const buttons = [...root.querySelectorAll("[data-query-tab]")];
    const question = root.querySelector(".rm-chat__q"), answer = root.querySelector(".rm-chat__r");
    const list = root.querySelector(".rm-chat__trechos"), info = root.querySelector(".rm-chat__info");
    const sources = root.querySelector(".rm-chat__fontes"), pause = root.querySelector("[data-demo-pause]");
    const typed = document.querySelector("[data-palavras]"), words = typed?.dataset.palavras.split("|") || [];
    const campusHero = root.closest(".rm-hero");
    const scenes = [
      { question: "Onde fica a sala 304 do laboratório COSMOS?", answer: "O diretório de laboratórios da FCTE indica o COSMOS no prédio LDTEA, no 2º andar, sala 304. Confira a fonte para confirmar a informação.", context: ["DOC-005 · Diretório de laboratórios", "COSMOS · localização descrita na fonte"], status: "Sala · exemplo baseado em documento", source: "Fonte: DOC-005", url: data.examples.find(e => e.source_id === "DOC-005")?.source_url },
      { question: "Qual ônibus pego amanhã para chegar à FCTE às 8h?", answer: "O planejador de viagens ainda é uma evolução do projeto. Hoje posso explicar onde consultar linhas e horários; não calculo qual ônibus pegar nem a chegada ao campus.", context: ["Origem + destino + dia e horário", "Linhas e horários programados · integração futura"], status: "Transporte · funcionalidade planejada", source: "Sem linha ou horário calculados" },
      { question: "Me passa uma receita de bolo de chocolate?", answer: "Meu foco é orientar sobre locais e deslocamentos da FCTE. Posso ajudar a localizar um ambiente e consultar orientações documentais do campus.", context: ["Pergunta fora do domínio do campus", "Reconhecer o limite e orientar a conversa"], status: "Fora do escopo · exemplo de redirecionamento", source: "Sem consulta à base" }
    ];
    const duration = 11000, timers = new Set();
    let current = 0, cycle = null, paused = false, hovering = false, focused = false;
    root.style.setProperty("--rm-duracao-cena", duration + "ms");
    function later(ms, fn) {
      const timer = setTimeout(() => { timers.delete(timer); fn(); }, ms);
      timers.add(timer);
    }
    function clear() { timers.forEach(clearTimeout); timers.clear(); clearTimeout(cycle); }
    function type(target, text, speed, done) {
      if (!target) { done?.(); return; }
      if (paused || reduced || document.hidden) { target.textContent = text; done?.(); return; }
      target.textContent = "";
      let position = 0;
      function write() {
        position += speed > 20 ? 1 : 2;
        target.textContent = text.slice(0, position);
        if (position < text.length) later(speed, write); else done?.();
      }
      write();
    }
    function yellow(text) {
      if (!typed) return;
      if (paused || reduced || document.hidden) { typed.textContent = text; return; }
      function erase() {
        const previous = typed.textContent;
        if (previous.length) { typed.textContent = previous.slice(0, -1); later(25, erase); }
        else type(typed, text, 60);
      }
      erase();
    }
    function schedule() {
      clearTimeout(cycle);
      if (!paused && !reduced && !hovering && !focused && !document.hidden) cycle = setTimeout(() => show((current + 1) % scenes.length), duration);
    }
    function show(index) {
      clear(); current = index;
      const scene = scenes[index];
      buttons.forEach((button, i) => { button.setAttribute("aria-selected", String(i === index)); button.tabIndex = i === index ? 0 : -1; });
      panel.setAttribute("aria-labelledby", buttons[index].id);
      root.querySelector("[data-question-readable]").textContent = scene.question;
      root.querySelector("[data-answer-readable]").textContent = scene.answer;
      question.textContent = ""; answer.textContent = ""; list.replaceChildren(); sources.replaceChildren();
      info.textContent = scene.status;
      scene.context.forEach((text, i) => {
        const li = document.createElement("li"), marker = document.createElement("em");
        marker.textContent = i + 1; li.append(marker, document.createTextNode(text)); list.appendChild(li);
      });
      function reference() {
        if (scene.url) { const link = document.createElement("a"); link.textContent = scene.source + " ↗"; link.href = scene.url; link.target = "_blank"; link.rel = "noopener"; sources.appendChild(link); }
        else sources.textContent = scene.source;
      }
      function respond() {
        [...list.children].forEach((li, i) => later(paused || reduced ? 0 : i * 200, () => li.classList.add("rm-on")));
        later(paused || reduced ? 0 : 650, () => type(answer, scene.answer, 14, reference));
      }
      type(question, scene.question, 28, respond);
      yellow(words[index] || "informações do campus");
      root.classList.toggle("fcte-demo-static", paused || reduced);
      schedule();
    }
    function applyPause() {
      campusHero.classList.toggle("fcte-motion-paused", paused || reduced);
      pause.setAttribute("aria-pressed", String(paused || reduced));
      pause.textContent = reduced ? "Movimento reduzido" : paused ? "Retomar animações" : "Pausar animações";
      pause.disabled = reduced;
      campusHero.dispatchEvent(new CustomEvent("fcte:motion", { detail: { paused: paused || reduced } }));
      show(current);
    }
    keyboardTabs(buttons, show);
    pause.addEventListener("click", () => { paused = !paused; applyPause(); });
    root.addEventListener("mouseenter", () => { hovering = true; clearTimeout(cycle); });
    root.addEventListener("mouseleave", () => { hovering = false; schedule(); });
    root.addEventListener("focusin", () => { focused = true; clearTimeout(cycle); });
    root.addEventListener("focusout", event => { if (!root.contains(event.relatedTarget)) { focused = false; schedule(); } });
    document.addEventListener("visibilitychange", () => { if (document.hidden) clear(); else show(current); });
    motion.addEventListener("change", () => { reduced = motion.matches; applyPause(); });
    applyPause();
  }
  function reveal() {
    const nodes = document.querySelectorAll(".rm-revelar");
    if (reduced || !("IntersectionObserver" in window)) { nodes.forEach(n => n.classList.add("rm-visivel")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("rm-visivel"); observer.unobserve(entry.target); }
    }), { threshold: 0.05 });
    nodes.forEach(node => observer.observe(node));
  }
  function canvas() {
    const element = document.querySelector(".rm-hero__painel");
    if (!element) return;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    // Fichas flutuantes e repulsão do cursor adaptadas do fundo do Grupo 04.
    const terms = ["Cálculo 1", "Álgebra Linear", "Física 1", "Engenharia de Software", "Aeroespacial", "Automotiva", "Eletrônica", "Energia", "UAC", "UED", "LDTEA", "COSMOS · sala 304", "Biblioteca Gama", "Praça da FCTE", "Salas e laboratórios", "Linhas de ônibus", "Horários programados", "Caminhada até o campus", "KML → GeoJSON", "174 chunks", "E5 · 384 dim", "Fonte + revisão", "Coleta FCTE", "UnB Gama"];
    const host = element.closest(".rm-hero"), mouse = { x: -1000, y: -1000 };
    let width = 0, height = 0, cards = [], frame = null, previous = 0;
    let paused = host.classList.contains("fcte-motion-paused"), visible = true;
    function card(y) { return { text: terms[Math.floor(Math.random() * terms.length)], x: Math.random() * width, y: y ?? Math.random() * height, speed: .15 + Math.random() * .35, alpha: .12 + Math.random() * .2, size: 10 + Math.random() * 4, vx: 0, vy: 0 }; }
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = element.clientWidth; height = element.clientHeight;
      element.width = width * ratio; element.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cards = Array.from({ length: Math.max(16, Math.min(85, Math.round(width * height / 16000))) }, () => card());
      if (frame === null) draw(performance.now());
    }
    function draw(now) {
      frame = null;
      if (!element.isConnected) return;
      const moving = !reduced && !paused && !document.hidden && visible;
      const delta = Math.min(2, Math.max(.25, (now - (previous || now - 16.67)) / 16.67)); previous = now;
      ctx.clearRect(0, 0, width, height);
      cards.forEach((item, index) => {
        const dx = item.x - mouse.x, dy = item.y - mouse.y, distance = Math.hypot(dx, dy);
        const nearby = distance < 140 ? 1 - distance / 140 : 0;
        if (moving) {
          if (distance < 120) { const force = (1 - distance / 120) * .65 * delta; item.vx += dx / (distance || 1) * force; item.vy += dy / (distance || 1) * force; }
          item.vx *= Math.pow(.92, delta); item.vy *= Math.pow(.92, delta);
          item.x += item.vx * delta; item.y += (item.vy - item.speed) * delta;
          if (item.y < -25 || item.x < -220 || item.x > width + 100 || item.y > height + 80) { cards[index] = card(height + 20); return; }
        }
        ctx.font = "600 " + item.size + "px 'Source Code Pro', monospace";
        const textWidth = ctx.measureText(item.text).width;
        ctx.globalAlpha = Math.min(.9, item.alpha + nearby * .6);
        ctx.strokeStyle = nearby ? "#ffcc00" : "#2fa65f"; ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(item.x - 6, item.y - item.size, textWidth + 12, item.size + 8, 4);
        else ctx.rect(item.x - 6, item.y - item.size, textWidth + 12, item.size + 8);
        ctx.stroke(); ctx.fillStyle = nearby ? "#ffe680" : "#d6e6f5"; ctx.fillText(item.text, item.x, item.y);
      });
      ctx.globalAlpha = 1;
      if (moving) frame = requestAnimationFrame(draw);
    }
    function refresh() { if (frame !== null) cancelAnimationFrame(frame); frame = null; previous = 0; draw(performance.now()); }
    host.addEventListener("pointermove", event => { if (event.pointerType === "touch") return; const box = element.getBoundingClientRect(); mouse.x = event.clientX - box.left; mouse.y = event.clientY - box.top; });
    host.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1000; });
    host.addEventListener("fcte:motion", event => { paused = event.detail.paused; refresh(); });
    document.addEventListener("visibilitychange", refresh);
    motion.addEventListener("change", () => { reduced = motion.matches; refresh(); });
    window.addEventListener("resize", resize, { passive: true });
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(element);
    if ("IntersectionObserver" in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; refresh(); }).observe(host);
    resize();
  }
  const stages = [["01 · Adquirir", "Executado", "42 referências catalogadas", "37 fontes indexadas com versão e hash", "DOC-014 e DOC-024 têm aquisição bloqueada, sem vetores fictícios."], ["02 · Curar", "Aprovação registrada", "Catálogo, escopo, revisão e limitações", "42 aprovações expressas; 37 fontes indexáveis", "Aprovação não é confirmação em campo ou garantia de vigência."], ["03 · Extrair", "Executado", "HTML/PDF e regras de recorte por fonte", "Títulos, seções e parágrafos em JSON", "Original preservado. Extração heurística pode exigir correção editorial."], ["04 · Dividir", "Executado", "Textos aprovados e entidades", "174 chunks; 17–300 tokens, mediana 222", "Alvo 300; sobreposição até 40 só em subdivisão; limite técnico 512."], ["05 · Codificar", "Executado", "174 entradas com passage:", "174 × 384 valores float32, normalizados", "E5 local, revisão fixa. A pergunta usa query: no mesmo espaço."], ["06 · Indexar", "Persistência comprovada", "Vetores, textos e metadados", "Chroma local com 174 registros e manifesto", "Reabertura e consulta em processos novos sem ingestão confirmadas."], ["07 · Consultar", "Implementado e avaliado", "Pergunta e contexto curto opcional", "Busca híbrida, Gemini, fontes e registro", "Reavaliação híbrida: 15 saídas válidas, 75 trechos e 49 fatos julgados; todas as tentativas registradas."]];
  function pipeline() {
    document.querySelectorAll("[data-pipeline]").forEach((root, number) => {
      root.className = "fcte-pipeline";
      const base = "pipeline-" + number;
      root.innerHTML = '<div class="fcte-pipeline__tabs" role="tablist" aria-label="Etapas da preparação">' + stages.map((stage, i) => '<button type="button" role="tab" id="' + base + '-tab-' + i + '" aria-controls="' + base + '-panel"' + "" + '>' + esc(stage[0]) + '</button>').join("") + '</div><div id="' + base + '-panel" class="fcte-pipeline__panel" role="tabpanel" tabindex="0"></div>';
      const buttons = [...root.querySelectorAll("button")], panel = root.querySelector("[role=tabpanel]");
      function show(index) {
        buttons.forEach((button, i) => { button.setAttribute("aria-selected", String(i === index)); button.tabIndex = i === index ? 0 : -1; });
        const stage = stages[index];
        panel.setAttribute("aria-labelledby", buttons[index].id);
        panel.innerHTML = '<span class="selo ' + "selo--verde" + '">' + esc(stage[1]) + '</span><h3>' + esc(stage[0]) + '</h3><dl><dt>Entrada</dt><dd>' + esc(stage[2]) + '</dd><dt>Saída</dt><dd>' + esc(stage[3]) + '</dd></dl><p class="fcte-note">' + esc(stage[4]) + '</p>';
      }
      keyboardTabs(buttons, show); show(0);
    });
  }
  function explorer() {
    document.querySelectorAll("[data-chunk-explorer]").forEach((root, number) => {
      root.className = "fcte-explorer";
      root.innerHTML = '<label for="artifact-select-' + number + '">Escolha um chunk real da coleção ativa</label><select id="artifact-select-' + number + '" class="fcte-select">' + data.examples.map((e, i) => '<option value="' + i + '">' + esc(e.source_id + " · " + e.section) + '</option>').join("") + '</select><div data-artifact-detail></div>';
      const select = root.querySelector("select"), detail = root.querySelector("[data-artifact-detail]");
      function show() {
        const e = data.examples[Number(select.value)];
        detail.innerHTML = '<div class="fcte-explorer__meta"><span class="selo">' + esc(e.source_id) + '</span><span class="selo selo--verde">' + e.input_tokens + ' tokens completos</span><span class="selo selo--verde">Aprovado</span></div><h3>' + esc(e.section) + '</h3><p class="fcte-explorer__id">' + esc(e.chunk_id) + '</p><blockquote>' + excerpt(e) + '</blockquote><p class="fcte-note">Excerto curto selecionado. Os tokens são da entrada completa.</p><details><summary>Conferir origem e vínculo</summary><p>Versão: <code>' + esc(e.version) + '</code>. Validade: ' + esc(e.validity) + '.</p><p>SHA-256 do original: <code>' + esc(e.source_sha256) + '</code></p><p>Linha do vetor: <code>' + e.row + '</code>. Rastreabilidade por fonte, seção, versão e hash.</p></details>' + bars(e.vector) + '<p class="fcte-note">16 de 384 dimensões reais. Norma L2: ' + e.vector.l2_norm.toFixed(7) + '.</p>';
      }
      select.addEventListener("change", show); show();
    });
  }
  function catalog() {
    document.querySelectorAll("[data-chunk-catalog]").forEach((root, index) => {
      root.innerHTML = '<div class="fcte-catalog-controls"><label for="chunk-filter-' + index + '">Filtrar metadados</label><input class="fcte-filter" type="search" id="chunk-filter-' + index + '" placeholder="Ex.: biblioteca, DOC-005, Infraestrutura"><span data-count aria-live="polite"></span></div><div class="fcte-catalog-list" data-list></div><p class="fcte-note">Filtro textual do catálogo exportado. Não usa embeddings nem executa recuperação RAG.</p>';
      const input = root.querySelector("input"), list = root.querySelector("[data-list]"), count = root.querySelector("[data-count]");
      function show() {
        const term = normalize(input.value);
        const hits = data.chunks.filter(c => normalize(c.id + " " + c.section + " " + c.source_id).includes(term));
        count.textContent = hits.length + " de " + data.chunks.length;
        list.innerHTML = hits.map(c => '<article><b>' + esc(c.section) + '</b><p class="fcte-explorer__id">' + esc(c.id) + '</p><p>' + esc(c.source_id) + " · " + c.input_tokens + ' tokens · aprovado</p></article>').join("") || "<p>Nenhum metadado corresponde ao filtro.</p>";
      }
      input.addEventListener("input", show); show();
    });
  }
  function map() {
    document.querySelectorAll("[data-campus-map]").forEach((root, index) => {
      if (root.dataset.ready) return;
      root.dataset.ready = "true";
      const points = data.points;
      if (!points.length) { root.textContent = "Nenhum marcador disponível nesta exportação."; return; }
      root.innerHTML = '<label for="map-select-' + index + '">Selecionar marcador da equipe</label><select class="fcte-select" id="map-select-' + index + '">' + points.map((p, i) => '<option value="' + i + '">' + (i + 1) + " · " + esc(p.name) + (p.eligible ? "" : " · não selecionado no inventário") + '</option>').join("") + '</select><div class="fcte-map-layout"><div><div class="fcte-map-canvas" data-map-canvas role="region" aria-label="Mapa do campus Gama com os marcadores da equipe"></div><p class="fcte-map-status" data-map-status role="status" hidden></p><div class="fcte-map-toolbar"><button type="button" data-map-fit>Ver todos os pontos</button><a data-map-external target="_blank" rel="noopener">Abrir no OpenStreetMap ↗</a></div><div class="fcte-map-legend"><span>Selecionados no inventário</span><span>A revisar / fora do escopo</span></div></div><div class="fcte-map-detail" data-map-detail></div></div>';
      const select = root.querySelector("select"), detail = root.querySelector("[data-map-detail]");
      const canvas = root.querySelector("[data-map-canvas]"), status = root.querySelector("[data-map-status]");
      const fit = root.querySelector("[data-map-fit]"), external = root.querySelector("[data-map-external]");
      const L = window.L, markers = [];
      let campusMap = null;
      function show(value, pan = true) {
        if (!points[value]) return;
        select.value = String(value);
        const p = points[value];
        markers.forEach((marker, i) => {
          const element = marker.getElement();
          element?.classList.toggle("is-selected", i === value);
          element?.setAttribute("aria-pressed", String(i === value));
          element?.setAttribute("aria-label", (i + 1) + " · " + points[i].name + (points[i].eligible ? " · selecionado no inventário" : " · não selecionado no inventário"));
          marker.setZIndexOffset(i === value ? 1000 : 0);
        });
        external.href = 'https://www.openstreetmap.org/?mlat=' + encodeURIComponent(p.coordinates[1]) + '&mlon=' + encodeURIComponent(p.coordinates[0]) + '#map=18/' + p.coordinates[1] + '/' + p.coordinates[0];
        if (pan && campusMap) campusMap.panTo([p.coordinates[1], p.coordinates[0]], { animate: !reduced });
        detail.innerHTML = '<span class="selo ' + (p.eligible ? "selo--verde" : "selo--cinza") + '">' + (p.eligible ? "Selecionado no inventário" : "Não selecionado no inventário") + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.description || "Marcador sem descrição adicional no KML.") + '</p><p>Latitude: <code>' + p.coordinates[1] + '</code><br>Longitude: <code>' + p.coordinates[0] + '</code></p><p class="fcte-explorer__id">' + esc(p.id) + '</p>' + (p.building_id ? '<p>Associação textual: <b>' + esc(p.building_id) + '</b>.</p>' : "") + (p.candidate_building_id ? '<p>Associação candidata: <b>' + esc(p.candidate_building_id) + '</b>; confirmar em campo.</p>' : "") + '<p class="fcte-note">Fonte: anotação da equipe no KML. Ponto sem contorno e sem verificação de acesso atual.</p>';
      }
      select.addEventListener("change", () => show(Number(select.value)));
      const initial = Math.max(0, points.findIndex(p => p.name.startsWith("UAC -")));
      if (!L) {
        canvas.hidden = true; fit.hidden = true; status.hidden = false;
        status.textContent = "Não foi possível carregar o mapa. Confira sua conexão ou use o link para abrir o ponto no OpenStreetMap. As fichas continuam disponíveis.";
        show(initial, false); return;
      }
      campusMap = L.map(canvas, { scrollWheelZoom: false, zoomAnimation: !reduced, fadeAnimation: !reduced });
      const tiles = L.tileLayer(root.dataset.mapTiles || "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      tiles.on("tileerror", () => { status.hidden = false; status.textContent = "O mapa-base não carregou completamente. Confira sua conexão; os marcadores e as fichas continuam disponíveis."; });
      tiles.on("tileload", () => { status.hidden = true; });
      tiles.addTo(campusMap);
      points.forEach((p, i) => {
        const marker = L.marker([p.coordinates[1], p.coordinates[0]], {
          title: (i + 1) + " · " + p.name,
          keyboard: true,
          icon: L.divIcon({ className: 'fcte-map-pin' + (p.eligible ? '' : ' is-excluded'), html: '<span>' + (i + 1) + '</span>', iconSize: [28, 28], iconAnchor: [14, 14] })
        }).addTo(campusMap);
        const label = document.createElement("span"); label.textContent = (i + 1) + " · " + p.name;
        marker.bindTooltip(label, { direction: "top", offset: [0, -12] });
        marker.on("click", () => show(i));
        markers.push(marker);
      });
      const bounds = L.latLngBounds(points.map(p => [p.coordinates[1], p.coordinates[0]]));
      function fitAll() { campusMap.fitBounds(bounds, { padding: [32, 32], maxZoom: 18, animate: false }); }
      fit.addEventListener("click", fitAll);
      L.control.scale({ imperial: false }).addTo(campusMap);
      fitAll(); show(initial, false);
      if ("ResizeObserver" in window) new ResizeObserver(() => campusMap.invalidateSize({ pan: false })).observe(canvas);
    });
  }
  function init() {
    document.documentElement.classList.add("rm-js");
    hero(); reveal(); canvas(); pipeline(); explorer(); catalog(); map();
    const progress = document.createElement("div"); progress.className = "rm-progresso"; progress.setAttribute("aria-hidden", "true"); document.body.appendChild(progress);
    const update = () => { const range = document.documentElement.scrollHeight - innerHeight; progress.style.transform = "scaleX(" + (range > 0 ? scrollY / range : 0) + ")"; };
    window.addEventListener("scroll", update, { passive: true }); update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true }); else init();
})();
