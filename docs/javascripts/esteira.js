/* Identidade e controles adaptados do Grupo 04. Reproduz artefatos e execuções
   reais do Grupo 09; não realiza chamadas de API no site de documentação. */
(function () {
  "use strict";
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  var E = window.FCTE_EVIDENCIAS || { examples: [], sources: [], chunks: [], demos: [] };
  function el(tag, cls, html) { var e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;return e; }
  function sv(tag, attrs, text) { var e=document.createElementNS(SVGNS,tag);Object.keys(attrs).forEach(function(k){e.setAttribute(k,attrs[k]);});if(text!==undefined)e.textContent=text;return e; }
  function esc(s) {return String(s??"").replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function milhar(n) {return Number(n).toLocaleString("pt-BR");}
  function exemplo(id) {return E.examples.find(function(e){return e.source_id===id;});}
  function exc(d) {return d?d.excerpt+(d.excerpt_truncated?"…":""):"Sem amostra nesta exportação.";}
  function eixo(id) {return ["DOC-025","DOC-026","DOC-027"].indexOf(id)>=0?"apoio":["DOC-001","DOC-007"].indexOf(id)>=0?"fluxo":"ru";}
  function seta() {return el("div","rm-est__seta","<span>→</span>");}
  function rede() {
    var s=sv("svg",{viewBox:"0 0 120 90",class:"rm-est__rede","aria-hidden":"true"});
    var layers=[[20,45,70],[15,35,55,75],[30,60]],xs=[18,60,102];
    layers.forEach(function(ys,c){if(c<layers.length-1)ys.forEach(function(y){layers[c+1].forEach(function(y2){s.appendChild(sv("line",{x1:xs[c],y1:y,x2:xs[c+1],y2:y2}));});});});
    layers.forEach(function(ys,c){ys.forEach(function(y,i){var n=sv("circle",{cx:xs[c],cy:y,r:6});n.style.animationDelay=(c*.25+i*.1)+"s";s.appendChild(n);});});return s;
  }
  function caixaModelo(name,sub) {var c=el("div","rm-est__modelo");c.appendChild(rede());c.appendChild(el("b","",esc(name)));if(sub)c.appendChild(el("small","",esc(sub)));return c;}
  function painel(title,text,cls) {var p=el("div","rm-est__painel "+(cls||""));p.appendChild(el("div","rm-est__painel-tit",esc(title)));p.appendChild(el("pre","rm-est__mono",esc(text)));return p;}
  function chunk(d) {var c=el("div","rm-est__chunk rm-on rm-est__chunk--mini");c.appendChild(el("div","rm-est__cab","<b>"+esc(d?.source_id)+"</b> · "+esc(d?.section)));c.appendChild(el("div","rm-est__txt",esc(exc(d))));c.appendChild(el("div","rm-est__tam",esc(d?.chunk_id)+" · "+esc(d?.input_tokens)+" tokens"));return c;}
  function vetor(d,ctx) {
    var out=el("div","rm-est__saida"),box=el("div","rm-est__vetor rm-est__vetor--verde"),values=d?.vector.head||[];
    values.forEach(function(v,i){var bar=el("span","rm-est__barra"),n=el("i",v<0?"rm-neg":"");n.style.setProperty("--h",Math.min(100,Math.round(Math.abs(v)/.15*100))+"%");n.style.transitionDelay=reduzido?"0s":(i*.03)+"s";bar.title="Dimensão "+(i+1)+": "+v;bar.appendChild(n);box.appendChild(bar);});
    out.appendChild(box);out.appendChild(el("code","rm-est__nums",esc("["+values.slice(0,5).join("; ")+"; …] · 384 dimensões")));
    out.appendChild(el("div","rm-est__nota","16 componentes reais do vetor de documento, não do vetor da pergunta."));ctx.depois(700,function(){box.classList.add("rm-on");});return out;
  }
  function legenda() {return el("div","rm-est__legenda",'<span class="rm-eixo--ru"><i></i>Serviços e laboratórios</span><span class="rm-eixo--fluxo"><i></i>Infraestrutura</span><span class="rm-eixo--apoio"><i></i>Transporte documental</span>');}
  function mapa(ctx) {
    var s=sv("svg",{viewBox:"0 0 640 350",class:"rm-est__mapa",role:"img","aria-label":"94 chunks agrupados por 25 fontes; esquema, não projeção de embeddings"});
    E.sources.filter(function(g){return g.indexed;}).forEach(function(g,k){
      var x=65+(k%5)*128,y=38+Math.floor(k/5)*68;
      s.appendChild(sv("text",{x:x,y:y-18,"text-anchor":"middle",class:"rm-est__mapa-rot rm-eixo--"+eixo(g.id)},g.id+" · "+g.chunks));
      for(var i=0;i<g.chunks;i++){var a=i*2.4,r=6+Math.sqrt(i)*5,px=x+Math.cos(a)*r,py=y+Math.sin(a)*r*.65;
        var c=sv("circle",{r:3.5,class:"rm-pt rm-eixo--"+eixo(g.id)});c.style.transform="translate("+px+"px,"+py+"px)";s.appendChild(c);
        if(!reduzido){c.style.opacity="0";(function(c,k){ctx.depois(100+k*35,function(){c.style.opacity="";});})(c,k);}
      }
    });return s;
  }
  var EXEMPLOS=["lema","cabines","cosmos","ausencia"].map(function(id){var r=E.demos.find(function(d){return d.id===id;});return r?{id:id,pergunta:r.question,registro:r}:null;}).filter(Boolean);
  var CENARIOS=[{id:"lema",nome:"LEMA"},{id:"cabines",nome:"Cabines · conversa"},{id:"cosmos",nome:"COSMOS · avaliação inicial"},{id:"ausencia",nome:"Sem dados atuais"}];
  var INGESTAO=[
    {nome:"Fontes",sub:"27 aprovadas · 25 indexadas",dur:5200,titulo:"1. Catalogar, aprovar e preservar fontes",texto:"O catálogo tem <b>27 aprovações expressas</b>. Duas aquisições foram bloqueadas: DOC-014 e DOC-024. As outras 25 fontes textuais formam a coleção ativa. KML e coleta continuam como inventários separados. Aprovação não garante vigência ou confirmação em campo.",numeros:[["27","aprovadas"],["25","indexadas"]],arquivo:"catalogo/fontes.csv · data/originais/",desenhar:function(p,d,ctx){var grid=el("div","rm-est__docs");E.sources.forEach(function(s,i){var c=el("span","rm-est__doc rm-eixo--"+(s.indexed?eixo(s.id):"apoio"),esc(s.id)+(s.indexed?"":" ×"));c.title=s.status;grid.appendChild(c);ctx.depois(60+i*45,function(){c.classList.add("rm-on");});});p.appendChild(grid);p.appendChild(legenda());}},
    {nome:"Extração",sub:"HTML → texto",dur:5500,titulo:"2. Preservar original e extrair conteúdo",texto:"O original fica com versão e SHA-256. A extração remove a moldura da página e organiza títulos, seções e parágrafos. Regras de escopo excluem RU; a revisão precisa conferir ambiguidades. O desenho é esquemático e o excerto é de um chunk real.",numeros:[["25","fontes disponíveis"]],arquivo:"scripts/01_adquirir.py · scripts/02_extrair.py",desenhar:function(p,d,ctx){var line=el("div","rm-est__linha"),sample=exemplo("DOC-012");line.appendChild(painel("HTML esquemático","<nav>Menu</nav>\n<main>\n"+exc(sample)+"\n</main>"));line.appendChild(seta());line.appendChild(chunk(sample));p.appendChild(line);}},
    {nome:"Chunking",sub:"300 alvo · até 40 overlap",dur:6000,titulo:"3. Criar fichas com contexto e origem",texto:"<b>agrupar_irmaos</b> reúne seções vizinhas do mesmo título-pai até 300 tokens. Seção longa é subdividida por parágrafo/frase, com até 40 de sobreposição em unidades inteiras. Não mistura documentos. Os números são escolhas iniciais, não parâmetros ótimos comprovados.",numeros:[["94","chunks"],["17–300","tokens"],["202","mediana"]],arquivo:"scripts/04_chunks.py · data/chunks/chunks.jsonl",desenhar:function(p,d,ctx){var doc=el("div","rm-est__corte");[exemplo("DOC-001"),exemplo("DOC-005"),exemplo("DOC-012")].filter(Boolean).forEach(function(s,i){var c=chunk(s);c.classList.remove("rm-on");doc.appendChild(c);ctx.depois(900+i*400,function(){c.classList.add("rm-on");});});p.appendChild(doc);ctx.depois(600,function(){doc.classList.add("rm-cortado");});}},
    {nome:"Embeddings",sub:"E5-small · 384 dim",dur:6000,titulo:"4. Cada ficha recebe um vetor",texto:"O <b>multilingual-e5-small</b> codifica os chunks localmente com <code>passage: </code>. São 384 componentes float32 normalizados. Entradas são contadas antes do encode, sem truncamento silencioso acima de 512 tokens. As barras exibem valores reais de um documento.",numeros:[["94 × 384","matriz"],["CPU","local"],["16","por lote"]],arquivo:"src/unb_gama_rag/embeddings.py · data/index/vetores/",desenhar:function(p,d,ctx){var s=exemplo("DOC-012"),line=el("div","rm-est__linha");line.appendChild(chunk(s));line.appendChild(seta());line.appendChild(caixaModelo("E5-small","passage: · L2"));line.appendChild(seta());line.appendChild(vetor(s,ctx));p.appendChild(line);}},
    {nome:"Chroma",sub:"persistido e reaberto",dur:6000,titulo:"5. Guardar e conferir o catálogo vetorial",texto:"Chroma <b>PersistentClient</b> guarda 94 registros no disco local. IDs estáveis e upsert evitam duplicação; o manifesto aponta a coleção ativa. Reabertura e consulta foram confirmadas em processos novos sem ingestão. O desenho agrupa por fonte; não é projeção de embeddings nem mapa físico.",numeros:[["94","registros"],["1","persistência confirmada"]],arquivo:"data/index/chroma/ · data/index/manifesto.json",desenhar:function(p,d,ctx){p.appendChild(mapa(ctx));p.appendChild(painel("Coleção ativa",E.index.collection+"\n94 chunks · cosseno\n25 fontes · disco local"));}}
  ];
  var CONSULTA=[
    {nome:"Pergunta",sub:"registro real",dur:4500,titulo:"1. Receber a mensagem na API",texto:"A aplicação envia texto à API local. Complementos podem carregar previousRequestId; o backend usa o assunto de um registro anterior da mesma base. Cada cenário abaixo identifica método, pergunta e execução reais. Este site apenas reproduz o registro.",arquivo:"PWA → /api/rag/chat → API /api/v1/chat",desenhar:function(p,d,ctx){p.appendChild(el("div","rm-est__alerta",esc(d.registro.label)));var b=painel("Pergunta submetida",d.pergunta);p.appendChild(b);if(d.registro.query!==d.pergunta)p.appendChild(painel("Consulta contextualizada",d.registro.query));}},
    {nome:"Vetor",sub:"query: · E5",dur:4800,titulo:"2. Representar a consulta no mesmo espaço",texto:"O E5 da pergunta usa query:, mesma revisão, dimensão e normalização dos documentos. O vetor foi calculado na execução. Seus componentes não foram exportados, por isso não desenhamos números inventados. Os vetores dos documentos não são recalculados a cada pergunta.",arquivo:"src/unb_gama_rag/embeddings.py",desenhar:function(p,d){var line=el("div","rm-est__linha");line.appendChild(painel("Entrada","query: "+d.registro.query));line.appendChild(seta());line.appendChild(caixaModelo("E5-small","384 componentes · L2"));p.appendChild(line);}},
    {nome:"Recuperação",sub:"ranking registrado",dur:6500,titulo:"3. Recuperar e selecionar evidências",texto:"A configuração atual combina busca densa e BM25 por RRF, devolvendo até cinco trechos, no máximo dois por fonte. O ranking exibido é o da execução selecionada: os casos antigos são densos, os posteriores são híbridos. Distância cosseno e RRF não são probabilidade de verdade.",arquivo:"busca.py · busca_lexical.py · Chroma",desenhar:function(p,d){p.appendChild(el("div","rm-est__alerta",esc(d.registro.label+" · "+d.registro.method)));var list=el("ol","rm-est__ranking");d.registro.retrieved.forEach(function(r){var li=el("li","",'<b>'+esc(r.source_id)+' · '+esc(r.id)+'</b><br>'+esc(r.title)+'<br><small>Distância '+r.distance.toFixed(6)+(r.rrf!==null?' · RRF '+r.rrf.toFixed(5):'')+(d.registro.source_ids.indexOf(r.id)>=0?' · citado':'')+'</small>');list.appendChild(li);});p.appendChild(list);}},
    {nome:"Contexto",sub:"evidências com IDs",dur:5800,titulo:"4. Fornecer contexto, sem transformar história em prova",texto:"O Gemini recebe a pergunta e trechos com IDs, origem e versão. O assunto anterior ajuda a interpretar complementos, mas não substitui evidência. Fontes são tratadas como dados, nunca comandos. Aqui mostramos excertos abreviados dos trechos efetivamente recuperados.",arquivo:"geracao.py · conversa.py",desenhar:function(p,d){var r=d.registro.retrieved.find(function(t){return d.registro.source_ids.indexOf(t.id)>=0;})||d.registro.retrieved[0];p.appendChild(painel("Instrução do sistema","Usar somente evidências recuperadas.\nCitar IDs válidos ou reconhecer insuficiência."));p.appendChild(painel(r.source_id+" · "+r.id,r.excerpt+"\nVersão "+r.version));}},
    {nome:"Gemini",sub:"resposta registrada",dur:6000,titulo:"5. Redigir uma resposta com fontes ou admitir ausência",texto:"Gemini redige a resposta; E5 só representa o texto. O backend valida o formato e confere se os IDs citados foram recuperados. Isso não prova suporte semântico automaticamente. A animação digita o texto de uma execução real, sem chamar a API novamente.",arquivo:"Gemini gemini-3.5-flash-lite · temperatura 0,1",desenhar:function(p,d,ctx){var box=painel("Resposta real · "+d.registro.status,""),t=box.querySelector("pre");p.appendChild(box);ctx.digitar(t,d.registro.answer,20);}},
    {nome:"Fontes",sub:"rastreabilidade e avaliação",dur:6000,titulo:"6. Conferir a evidência e guardar a execução",texto:"A cadeia é afirmação → chunk → documento, seção, versão e original com hash. A primeira avaliação julgou 15 perguntas e registrou também falhas. Os percentuais dessa rodada densa não são atribuídos automaticamente à busca híbrida. O índice continua local; o Pages publica só documentação e excertos.",arquivo:"execucoes/chat-<requestId>.json · avaliacao/",desenhar:function(p,d){var used=d.registro.retrieved.filter(function(t){return d.registro.source_ids.indexOf(t.id)>=0;});if(!used.length)p.appendChild(painel("Ausência reconhecida",d.registro.answer));used.forEach(function(r){var a=el("a","rm-est__fonte rm-on","<b>"+esc(r.source_id)+" · "+esc(r.title)+"</b><span>"+esc(r.id)+" · versão "+esc(r.version)+"</span>");a.href=r.url;a.target="_blank";a.rel="noopener";p.appendChild(a);});p.appendChild(painel("Registro",d.registro.request_id+"\n"+d.registro.prompt_version+" · "+d.registro.method));}}
  ];
  function montar(raiz) {
    if (raiz.getAttribute("data-pronto")) return;
    raiz.setAttribute("data-pronto", "1");
    var DEMO = EXEMPLOS;
    var cens = CENARIOS.map(function (c) {
      for (var i = 0; i < DEMO.length; i++) if (DEMO[i].id === c.id) return { nome: c.nome, d: DEMO[i] };
      return null;
    }).filter(Boolean);

    var est = { modo: "ingestao", cen: 0, passo: 0, tocando: false, modoEst: "" };
    var timers = [], proximo = null;

    var ctx = {
      depois: function (ms, fn) { timers.push(setTimeout(fn, reduzido ? 0 : ms)); },
      digitar: function (alvo, texto, vel, fim) {
        if (reduzido) { alvo.textContent = texto; if (fim) fim(); return; }
        var i = 0;
        (function passo() {
          i += texto.length > 160 ? 3 : 1;
          alvo.textContent = texto.slice(0, i);
          if (i < texto.length) timers.push(setTimeout(passo, vel));
          else if (fim) fim();
        })();
      },
      contar: function (alvo, total, ms) {
        if (reduzido) { alvo.textContent = milhar(total); return; }
        var t0 = null, vivo = true;
        timers.push({ cancelar: function () { vivo = false; } });
        (function quadro(t) {
          if (!vivo) return;
          if (t0 === null) t0 = t;
          var f = Math.min(1, (t - t0) / ms);
          alvo.textContent = milhar(Math.round(total * (1 - Math.pow(1 - f, 3))));
          if (f < 1) requestAnimationFrame(quadro);
        })(performance.now());
      }
    };
    function limpar() {
      timers.forEach(function (t) { if (t && t.cancelar) t.cancelar(); else clearTimeout(t); });
      timers = [];
      clearTimeout(proximo);
    }

    // topo: modos, cenários e controles
    var topo = el("div", "rm-est__topo");
    var modos = el("div", "rm-est__modos");
    var bIng = el("button", "rm-est__modo", '<b>1</b> Ingestão <small>offline · por versão</small>');
    var bCon = el("button", "rm-est__modo", '<b>2</b> Pergunta <small>online · por pergunta</small>');
    [bIng, bCon].forEach(function (b) { b.type = "button"; modos.appendChild(b); });
    if (!cens.length) bCon.disabled = true;
    bIng.addEventListener("click", function () { parar(); est.modo = "ingestao"; est.passo = 0; render(); });
    bCon.addEventListener("click", function () { parar(); est.modo = "consulta"; est.passo = 0; render(); });

    var boxCen = el("div", "rm-est__cens");
    boxCen.appendChild(el("span", "rm-est__cens-rot", "Exemplo:"));
    var bCens = cens.map(function (c, i) {
      var b = el("button", "rm-est__cen", esc(c.nome));
      b.type = "button";
      b.addEventListener("click", function () { parar(); est.cen = i; est.passo = 0; render(); });
      boxCen.appendChild(b);
      return b;
    });

    var ctr = el("div", "rm-est__ctr");
    var bAnt = el("button", "rm-est__btn rm-est__btn--sec", "◀");
    var bPlay = el("button", "rm-est__btn", "▶ Reproduzir");
    var bProx = el("button", "rm-est__btn rm-est__btn--sec", "▶|");
    var rotPasso = el("span", "rm-est__passo");
    var bTela = el("button", "rm-est__btn rm-est__btn--sec",
      '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" style="vertical-align:-2px"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>');
    bAnt.setAttribute("aria-label", "Passo anterior");
    bProx.setAttribute("aria-label", "Próximo passo");
    bTela.setAttribute("aria-label", "Tela cheia"); bTela.title = "Tela cheia";
    [bAnt, bPlay, bProx, rotPasso, bTela].forEach(function (b) { if (b.tagName === "BUTTON") b.type = "button"; ctr.appendChild(b); });
    topo.appendChild(modos); topo.appendChild(boxCen); topo.appendChild(ctr);

    // esteira
    var esteira = el("div", "rm-est__esteira");
    var trilho = el("div", "rm-est__trilho");
    var cheio = el("span", "rm-est__cheio"), pacote = el("span", "rm-est__pacote");
    trilho.appendChild(cheio); trilho.appendChild(pacote);
    var estacoes = el("div", "rm-est__estacoes");
    esteira.appendChild(trilho); esteira.appendChild(estacoes);

    // palco
    var palco = el("div", "rm-est__palco");
    var visual = el("div", "rm-est__visual");
    var info = el("div", "rm-est__info");
    info.setAttribute("aria-live", "polite");
    palco.appendChild(visual); palco.appendChild(info);

    raiz.appendChild(topo); raiz.appendChild(esteira); raiz.appendChild(palco);

    function etapas() { return est.modo === "ingestao" ? INGESTAO : CONSULTA; }
    function dado() { return cens.length ? cens[est.cen].d : null; }
    function val(v, d) { return typeof v === "function" ? v(d) : v; }

    function montarEstacoes() {
      estacoes.innerHTML = "";
      var lista = etapas();
      estacoes.style.setProperty("--n", lista.length);
      trilho.style.setProperty("--n", lista.length);
      lista.forEach(function (e, i) {
        var b = el("button", "rm-est__estacao", '<span class="rm-est__num">' + (i + 1) + "</span><b>" + e.nome + "</b><small>" + e.sub + "</small>");
        b.type = "button";
        b.addEventListener("click", function () { parar(); est.passo = i; render(); });
        estacoes.appendChild(b);
      });
      est.modoEst = est.modo;
    }

    function render() {
      limpar();
      var lista = etapas(), e = lista[est.passo], d = dado();
      if (est.modoEst !== est.modo) montarEstacoes();
      raiz.classList.toggle("rm-consulta", est.modo === "consulta");
      raiz.classList.toggle("rm-tocando", est.tocando);
      bIng.setAttribute("aria-pressed", est.modo === "ingestao");
      bCon.setAttribute("aria-pressed", est.modo === "consulta");
      bCens.forEach(function (b, i) { b.setAttribute("aria-pressed", i === est.cen); });
      boxCen.hidden = est.modo !== "consulta";

      Array.prototype.forEach.call(estacoes.children, function (b, i) {
        b.classList.toggle("rm-ativo", i === est.passo);
        b.classList.toggle("rm-feito", i < est.passo);
        if (i === est.passo) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      });
      var pos = ((est.passo + 0.5) / lista.length * 100) + "%";
      pacote.style.left = pos; cheio.style.width = pos;

      visual.innerHTML = "";
      visual.classList.remove("rm-entrar"); void visual.offsetWidth; visual.classList.add("rm-entrar");
      e.desenhar(visual, d, ctx);

      var nums = (e.numeros || []).map(function (n) { return "<span><b>" + n[0] + "</b> " + n[1] + "</span>"; }).join("");
      info.innerHTML =
        '<div class="rm-est__fase">' + (est.modo === "ingestao" ? "Fase 1 · Ingestão · offline" : "Fase 2 · Pergunta · online") + "</div>" +
        "<h4>" + e.titulo + "</h4><div class=rm-est__alerta>" + (e.pendente ? "Planejado · sem execução" : "Implementado · artefatos reais") + "</div><p>" + val(e.texto, d) + "</p>" +
        (nums ? '<div class="rm-est__numeros">' + nums + "</div>" : "") +
        '<div class="rm-est__arquivo">No código: <code>' + e.arquivo + "</code></div>";

      rotPasso.textContent = (est.passo + 1) + " / " + lista.length;
      bAnt.disabled = est.passo === 0 && est.modo === "ingestao";
      bProx.disabled = est.modo === "consulta" && est.passo === CONSULTA.length - 1;
      bPlay.setAttribute("aria-pressed", est.tocando);
      bPlay.textContent = est.tocando ? "❚❚ Pausar" : "▶ Reproduzir";
      if (est.tocando) proximo = setTimeout(avancar, val(e.dur, d) + (reduzido ? 1500 : 0));
    }

    function avancar() {
      if (est.passo < etapas().length - 1) est.passo++;
      else if (est.modo === "ingestao" && cens.length) { est.modo = "consulta"; est.passo = 0; }
      else { est.tocando = false; }
      render();
    }
    function voltar() {
      if (est.passo > 0) est.passo--;
      else if (est.modo === "consulta") { est.modo = "ingestao"; est.passo = INGESTAO.length - 1; }
      render();
    }
    function parar() { est.tocando = false; clearTimeout(proximo); bPlay.setAttribute("aria-pressed", "false"); bPlay.textContent = "▶ Reproduzir"; raiz.classList.remove("rm-tocando"); }

    bPlay.addEventListener("click", function () {
      if (est.tocando) { parar(); bPlay.textContent = "▶ Reproduzir"; raiz.classList.remove("rm-tocando"); return; }
      // terminou tudo? recomeça do início
      if (est.modo === "consulta" && est.passo === CONSULTA.length - 1) { est.modo = "ingestao"; est.passo = 0; }
      est.tocando = true;
      render();
    });
    bProx.addEventListener("click", function () { parar(); avancar(); });
    bAnt.addEventListener("click", function () { parar(); voltar(); });
    bTela.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen().catch(function() {});
      else if (raiz.requestFullscreen) raiz.requestFullscreen().catch(function() {});
    });
    raiz.addEventListener("keydown", function (ev) {
      if (ev.target.closest && ev.target.closest("a")) return;
      if (ev.key === "ArrowRight") { parar(); avancar(); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { parar(); voltar(); ev.preventDefault(); }
    });

    document.addEventListener("visibilitychange", function() { if(document.hidden) { parar(); limpar(); } });
    if (!document.fullscreenEnabled) bTela.hidden = true;
    if (raiz.getAttribute("data-modo") === "consulta" && cens.length) est.modo = "consulta";
    render();
  }

  function iniciar() { document.querySelectorAll("[data-esteira]").forEach(montar); }
  if (typeof document$ !== "undefined") document$.subscribe(iniciar);  // navegação instantânea do Material
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
