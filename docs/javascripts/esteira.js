/* Adaptado de residencia-grupo-4/docs/javascripts/esteira.js.
   Mesmas peças visuais e controlador; fontes e estado do piloto do Grupo 09.
   Nenhuma chamada de API ou inferência é executada por esta apresentação. */
(function () {
  "use strict";
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";
  var E = window.FCTE_EVIDENCIAS || { examples: [], sources: [], chunks: [] };
  function el(tag, cls, html) { var e = document.createElement(tag); if(cls) e.className=cls; if(html !== undefined) e.innerHTML=html; return e; }
  function sv(tag, attrs, text) { var e=document.createElementNS(SVGNS,tag); Object.keys(attrs).forEach(function(k){ e.setAttribute(k,attrs[k]); }); if(text !== undefined) e.textContent=text; return e; }
  function esc(s) { return String(s ?? "").replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function milhar(n) { return Number(n).toLocaleString("pt-BR"); }
  function exemplo(id) { return E.examples.find(function(e){ return e.source_id === id; }); }
  function exc(d) { return d ? d.excerpt+(d.excerpt_truncated ? "…" : "") : "Sem amostra nesta exportação."; }
  function eixo(id) { return id === "MAP-001" ? "apoio" : ["DOC-001","DOC-007"].indexOf(id) >= 0 ? "fluxo" : "ru"; }
  function seta() { return el("div","rm-est__seta","<span>→</span>"); }
  // Rede e apresentação do modelo preservadas da referência.
  function rede() {
    var s=sv("svg",{viewBox:"0 0 120 90",class:"rm-est__rede","aria-hidden":"true"});
    var layers=[[20,45,70],[15,35,55,75],[30,60]],xs=[18,60,102];
    layers.forEach(function(ys,c){ if(c<layers.length-1) ys.forEach(function(y){ layers[c+1].forEach(function(y2){s.appendChild(sv("line",{x1:xs[c],y1:y,x2:xs[c+1],y2:y2}));}); }); });
    layers.forEach(function(ys,c){ys.forEach(function(y,i){var n=sv("circle",{cx:xs[c],cy:y,r:6});n.style.animationDelay=(c*.25+i*.1)+"s";s.appendChild(n);});}); return s;
  }
  function caixaModelo(name, sub) { var c=el("div","rm-est__modelo"); c.appendChild(rede());c.appendChild(el("b","",esc(name)));if(sub)c.appendChild(el("small","",esc(sub)));return c; }
  function painel(title, text, cls) { var p=el("div","rm-est__painel "+(cls||""));p.appendChild(el("div","rm-est__painel-tit",esc(title)));p.appendChild(el("pre","rm-est__mono",esc(text)));return p; }
  function chunk(d) { var c=el("div","rm-est__chunk rm-on rm-est__chunk--mini");c.appendChild(el("div","rm-est__cab","<b>"+esc(d?.source_id)+"</b> · "+esc(d?.section)));c.appendChild(el("div","rm-est__txt",esc(exc(d))));c.appendChild(el("div","rm-est__tam",esc(d?.chunk_id)+" · "+esc(d?.input_tokens)+" tokens"));return c; }
  function vetor(d,ctx) {
    var out=el("div","rm-est__saida"),box=el("div","rm-est__vetor rm-est__vetor--verde");
    var values=d?.vector.head || [];
    values.forEach(function(v,i){var bar=el("span","rm-est__barra"),n=el("i",v<0?"rm-neg":"");n.style.setProperty("--h",Math.round(Math.abs(v)/.15*100)+"%");n.style.transitionDelay=reduzido?"0s":(i*.03)+"s";bar.title="Dimensão "+(i+1)+": "+v;bar.appendChild(n);box.appendChild(bar);});
    out.appendChild(box);out.appendChild(el("code","rm-est__nums",esc("["+values.slice(0,5).join("; ")+"; …] · 384 dimensões")));
    out.appendChild(el("div","rm-est__nota","16 componentes reais do vetor de documento. Não é um vetor de pergunta."));ctx.depois(700,function(){box.classList.add("rm-on");});return out;
  }
  function legenda() {return el("div","rm-est__legenda",'<span class="rm-eixo--ru"><i></i>Serviços e laboratórios</span><span class="rm-eixo--fluxo"><i></i>Infraestrutura</span><span class="rm-eixo--apoio"><i></i>Mapeamento da equipe</span>');}
  // Mesmo efeito de chegada dos pontos, sem simular uma projeção calculada dos embeddings.
  function mapa(ctx, travel) {
    var s=sv("svg",{viewBox:"0 0 640 324",class:"rm-est__mapa",role:"img","aria-label":"Esquema ilustrativo de 79 chunks agrupados por fonte; não é uma projeção de embeddings nem resultado de busca"});
    var groups=[{id:"DOC-001",n:1,x:100,y:85},{id:"DOC-002",n:12,x:285,y:85},{id:"DOC-005",n:48,x:485,y:100},{id:"DOC-007",n:1,x:100,y:220},{id:"DOC-012",n:6,x:285,y:220},{id:"MAP-001",n:11,x:485,y:240}];
    var offset=0;
    groups.forEach(function(g){s.appendChild(sv("text",{x:g.x,y:g.y-48,"text-anchor":"middle",class:"rm-est__mapa-rot rm-eixo--"+eixo(g.id)},g.id+" · "+g.n));
      for(var i=0;i<g.n;i++){var angle=i*2.4,r=8+Math.sqrt(i)*7,x=g.x+Math.cos(angle)*r,y=g.y+Math.sin(angle)*r*.65;var c=sv("circle",{r:4.5,class:"rm-pt rm-eixo--"+eixo(g.id)});s.appendChild(c);(function(c,x,y,k){if(travel&&!reduzido){c.style.transform="translate(-30px,162px)";c.style.opacity="0";ctx.depois(120+k*18,function(){c.style.transform="translate("+x+"px,"+y+"px)";c.style.opacity="";});}else c.style.transform="translate("+x+"px,"+y+"px)";})(c,x,y,offset++);}
    });return s;
  }
  var EXEMPLOS=[
    {id:"cosmos",pergunta:"Onde fica o laboratório COSMOS?",amostra:exemplo("DOC-005")},
    {id:"biblioteca",pergunta:"A biblioteca tem espaço para estudo individual?",amostra:exemplo("DOC-012")},
    {id:"ausencia",pergunta:"A sala I10 está livre agora?",amostra:null}
  ];
  var CENARIOS=[{id:"cosmos",nome:"COSMOS"},{id:"biblioteca",nome:"Biblioteca"},{id:"ausencia",nome:"Sem base atual"}];
  var INGESTAO=[
    {nome:"Fontes",sub:"27 HTMLs + KML",dur:5200,titulo:"1. Fontes preservadas entram no catálogo",texto:"Preservamos <b>27 HTMLs</b> com origem e hash, além do KML da equipe. O piloto seleciona cinco páginas e um arquivo de mapa. Aquisição não equivale à curadoria completa de vinte documentos. As fichas revisadas da coleta poderão complementar o índice em outra etapa.",numeros:[["27","HTMLs"],["5 + 1","fontes no piloto"]],arquivo:"catalog/ · data/raw/official/ · data/imports/maps/",desenhar:function(p,d,ctx){
      var grid=el("div","rm-est__docs");for(var i=1;i<=27;i++){var id="DOC-"+String(i).padStart(3,"0"),c=el("span","rm-est__doc rm-eixo--"+eixo(id),id);grid.appendChild(c);(function(c,i){ctx.depois(60+i*45,function(){c.classList.add("rm-on");});})(c,i);}var k=el("span","rm-est__doc rm-eixo--apoio","MAP-001");grid.appendChild(k);ctx.depois(1400,function(){k.classList.add("rm-on");});p.appendChild(grid);p.appendChild(legenda());
    }},
    {nome:"Extração",sub:"HTML/KML → texto",dur:6200,titulo:"2. Extração com vínculo à origem",texto:"Selecionamos infraestrutura, contato, laboratórios, salas e biblioteca. Seletores HTML preservam a posição de origem; o KML gera fichas de marcadores. Dos 14 pontos, 11 entram no recorte textual. O exemplo visual é abreviado e o HTML mostrado é esquemático; os excertos são dos artefatos reais.",numeros:[["5","páginas"],["14 → 11","marcadores"]],arquivo:"scripts/prepare_pilot.py",desenhar:function(p,d,ctx){
      var sample=exemplo("DOC-005"),line=el("div","rm-est__linha"),raw=el("div","rm-est__painel"),clean=el("div","rm-est__painel rm-est__painel--ok");raw.appendChild(el("div","rm-est__painel-tit","HTML esquemático · excerto real"));clean.appendChild(el("div","rm-est__painel-tit","Texto preparado · DOC-005"));var a=el("pre","rm-est__mono"),b=el("pre","rm-est__mono");raw.appendChild(a);clean.appendChild(b);['<nav>Menu da página</nav>','<section>','  '+exc(sample),'</section>'].forEach(function(t,i){var n=el("span","rm-est__ln "+(i===0?"rm-lixo":""),esc(t));a.appendChild(n);ctx.depois(100+i*160,function(){n.classList.add("rm-on");});if(i===0)ctx.depois(1400,function(){n.classList.add("rm-marcar");});});[sample?.section,exc(sample),"source_id + seletor HTML + intervalo de caracteres"].forEach(function(t,i){var n=el("span","rm-est__ln",esc(t));b.appendChild(n);ctx.depois(2200+i*450,function(){n.classList.add("rm-on");});});line.appendChild(raw);line.appendChild(seta());line.appendChild(clean);p.appendChild(line);
    }},
    {nome:"Chunking",sub:"seção / entidade",dur:6500,titulo:"3. Texto organizado em unidades recuperáveis",texto:"O corte respeita seção e entidade: setor, laboratório, assunto da biblioteca ou marcador. O alvo é <b>300 tokens</b> com contexto, com teto operacional de 480. Sobreposição aproximada de 40 só ao dividir uma seção longa. Neste piloto, os 79 chunks têm 47–246 tokens e não precisaram de sobreposição.",numeros:[["79","chunks"],["47–246","tokens"],["0","sobreposição aplicada"]],arquivo:"scripts/prepare_pilot.py · config/rag-plan.json",desenhar:function(p,d,ctx){
      var doc=el("div","rm-est__corte");doc.appendChild(el("div","rm-est__painel-tit","Amostras reais · cada bloco mantém sua própria fonte"));[exemplo("DOC-005"),exemplo("DOC-012"),exemplo("MAP-001")].filter(Boolean).forEach(function(sample,i){var c=chunk(sample);c.classList.remove("rm-on");doc.appendChild(c);ctx.depois(2000+i*500,function(){c.classList.add("rm-on");});});p.appendChild(doc);ctx.depois(1300,function(){doc.classList.add("rm-cortado");});
    }},
    {nome:"Embeddings",sub:"E5-small · 384 dim",dur:6000,titulo:"4. Cada chunk vira um vetor de 384 números",texto:"O <b>intfloat/multilingual-e5-small</b> executado localmente recebeu cada entrada com <code>passage: </code>, contexto e texto. Pooling médio e normalização L2 mantêm o mesmo espaço para a futura pergunta. As barras são componentes reais de um embedding do piloto, sem números aleatórios.",numeros:[["79 × 384","matriz"],["CPU","float32"],["16","por lote"]],arquivo:"scripts/embed_pilot.py · embeddings/vectors.npy",desenhar:function(p,d,ctx){var sample=exemplo("DOC-005"),line=el("div","rm-est__linha");line.appendChild(chunk(sample));line.appendChild(seta());line.appendChild(caixaModelo("E5-small","passage: · CPU"));line.appendChild(seta());line.appendChild(vetor(sample,ctx));p.appendChild(line);p.appendChild(el("div","rm-est__nota","Modelo e revisão fixados; não misturar vetores de modelos diferentes."));}},
    {nome:"Banco vetorial",sub:"Chroma · pendente",dur:6500,pendente:true,titulo:"5. Próxima etapa: persistir o índice",texto:"O banco vetorial <b>ainda não foi implementado</b>. A proposta é persistir vetores, texto e metadados no Chroma, com IDs estáveis e cosseno. O desenho agrupa os 79 chunks por fonte para explicar a organização; não é uma projeção calculada dos embeddings nem uma consulta ao Chroma.",numeros:[["79","vetores preparados"],["0","coleções implementadas"]],arquivo:"Próxima etapa · implementação ainda pendente",desenhar:function(p,d,ctx){var line=el("div","rm-est__linha rm-est__linha--mapa"),side=el("div","rm-est__mapa-box");side.appendChild(el("div","rm-est__painel-tit","Índice proposto · esquema por fonte"));side.appendChild(mapa(ctx,true));side.appendChild(el("div","rm-est__nota","Organização ilustrativa; posições sem significado semântico medido."));line.appendChild(side);line.appendChild(painel("Cada registro deverá conter","chunk_id\nsource_id\ntexto + embedding\nseção + versão + origem\nstatus de revisão"));p.appendChild(line);p.appendChild(legenda());}}
  ];
  var CONSULTA=[
    {nome:"Pergunta",sub:"exemplo proposto",dur:4500,pendente:true,titulo:"1. O estudante faz uma pergunta",texto:"Esta fase explica o fluxo futuro. A pergunta é ilustrativa e não será enviada a uma API. COSMOS e biblioteca possuem fontes candidatas; ocupação atual exige dados que não estão na base.",arquivo:"Interface de consulta · a implementar",desenhar:function(p,d,ctx){var chat=el("div","rm-est__chat"),b=el("div","rm-est__balao rm-est__balao--eu"),t=el("span","rm-est__digitando");b.appendChild(el("small","","Estudante · exemplo"));b.appendChild(t);chat.appendChild(b);p.appendChild(chat);ctx.digitar(t,d.pergunta,28,function(){t.classList.add("rm-fim");});}},
    {nome:"Vira vetor",sub:"query: · E5-small",dur:6000,pendente:true,titulo:"2. Vetorizar com o mesmo modelo",texto:"A pergunta receberá <code>query: </code>, o mesmo E5, revisão, dimensão e normalização dos documentos. O embedding de consulta ainda não foi calculado. Por isso mostramos a estrutura esperada, sem barras ou valores inventados.",numeros:[["384","dimensões previstas"]],arquivo:"Embedding de consulta · a implementar",desenhar:function(p,d){var line=el("div","rm-est__linha");line.appendChild(painel("Entrada","query: "+d.pergunta));line.appendChild(seta());line.appendChild(caixaModelo("E5-small","mesma revisão · L2"));line.appendChild(seta());line.appendChild(painel("Saída prevista","384 componentes\n(vetor ainda não calculado)"));p.appendChild(line);}},
    {nome:"Busca",sub:"top-5 planejado",dur:6500,pendente:true,titulo:"3. Recuperar evidências relevantes",texto:"O sistema deverá recuperar até cinco trechos e considerar campus, revisão e validade. A indicação abaixo é <b>gabarito manual proposto</b>, sem ranking, distância ou similaridade calculados. Sem evidência atual, a semelhança textual não justifica uma afirmação.",numeros:[["5","resultados previstos"]],arquivo:"Busca no Chroma · a implementar",desenhar:function(p,d,ctx){p.appendChild(el("div","rm-est__alerta","Gabarito proposto · não é resultado de recuperação"));if(d.amostra){var c=chunk(d.amostra);p.appendChild(c);p.appendChild(el("div","rm-est__nota","Fonte esperada: "+esc(d.amostra.source_id)+". A execução futura deverá comprovar se ela aparece no top-5."));}else p.appendChild(painel("Sem evidência de ocupação","A base não informa se a sala I10 está livre agora.\nRecuperar textos sobre salas não fornece esse dado."));}},
    {nome:"Contexto",sub:"trechos + pergunta",dur:6500,pendente:true,titulo:"4. Montar um contexto identificado",texto:"As evidências recuperadas deverão ser numeradas e acompanhadas de origem. O exemplo mostra o formato do contexto; a amostra pertence ao gabarito e não foi recuperada por uma busca. Instruções encontradas nas fontes serão tratadas como dados.",arquivo:"Montagem do contexto · a implementar",desenhar:function(p,d,ctx){var doc=el("div","rm-est__prompt");var blocks=[el("div","rm-est__pbloco rm-est__pbloco--regras","<b>REGRAS</b><span>Responder somente com as evidências.</span><span>Citar as fontes e reconhecer ausência.</span>"),el("div","rm-est__pbloco",d.amostra?"<b>AMOSTRA DO GABARITO · "+esc(d.amostra.source_id)+"</b><br>"+esc(exc(d.amostra)):"Nenhuma evidência de ocupação atual disponível."),el("div","rm-est__pbloco rm-est__pbloco--q","<b>PERGUNTA</b><br>"+esc(d.pergunta))];blocks.forEach(function(b,i){doc.appendChild(b);ctx.depois(300+i*550,function(){b.classList.add("rm-on");});});p.appendChild(doc);}},
    {nome:"LLM",sub:"Gemini · previsto",dur:5500,pendente:true,titulo:"5. Gerar uma resposta fundamentada",texto:"O Gemini é o gerador proposto, separado do modelo de embeddings. A futura integração deverá limitar afirmações ao contexto e reconhecer lacunas. A geração RAG ainda não foi executada; a tela mostra critérios de saída, sem simular uma resposta real.",arquivo:"Geração RAG · a implementar",desenhar:function(p,d,ctx){var line=el("div","rm-est__linha");line.appendChild(caixaModelo("Gemini","gerador proposto"));line.appendChild(seta());var out=el("div","rm-est__painel rm-est__painel--ok rm-est__gerado");out.appendChild(el("div","rm-est__painel-tit","Critério esperado · não é resposta gerada"));var t=el("div","rm-est__digitando");out.appendChild(t);line.appendChild(out);p.appendChild(line);ctx.digitar(t,d.amostra?"A resposta deverá usar evidências, citar fontes e explicitar limitações.":"O sistema deverá reconhecer a ausência de informação de ocupação atual.",22,function(){t.classList.add("rm-fim");});}},
    {nome:"Fontes",sub:"validar e avaliar",dur:6500,pendente:true,titulo:"6. Conferir fontes e guardar a execução",texto:"A demonstração final deverá preservar pergunta, ranking, chunks, resposta e referências. Cada citação precisa resolver até documento, versão e trecho. A avaliação manual prevê 16 perguntas respondíveis e quatro sem resposta. Ainda não há métricas de recuperação ou geração medidas.",arquivo:"Registro de execução e avaliação · pendentes",desenhar:function(p,d,ctx){var chat=el("div","rm-est__chat");chat.appendChild(el("div","rm-est__balao rm-est__balao--eu rm-on","<small>Pergunta proposta</small>"+esc(d.pergunta)));if(d.amostra){var source=d.amostra;var fs=el("div","rm-est__fontes"),a=el("a","rm-est__fonte rm-eixo--"+eixo(source.source_id),"<b>Fonte candidata · "+esc(source.source_id)+"</b><span>"+esc(source.section)+"</span><small>Artefato real · não é citação de resposta gerada ↗</small>");a.href=source.source_url;a.target="_blank";a.rel="noopener";fs.appendChild(a);chat.appendChild(fs);ctx.depois(400,function(){a.classList.add("rm-on");});}else{var n=el("div","rm-est__recusa","Critério: reconhecer ausência · resultado ainda não medido");chat.appendChild(n);ctx.depois(400,function(){n.classList.add("rm-on");});}p.appendChild(chat);}}
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
    var bCon = el("button", "rm-est__modo", '<b>2</b> Pergunta <small>planejada · por pergunta</small>');
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
        "<h4>" + e.titulo + "</h4><div class=rm-est__alerta>" + (e.pendente ? "Planejado · sem execução" : "Executado no piloto") + "</div><p>" + val(e.texto, d) + "</p>" +
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
