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
    var s=sv("svg",{viewBox:"0 0 640 350",class:"rm-est__mapa",role:"img","aria-label":"174 chunks agrupados por 37 fontes; esquema, não projeção de embeddings"});
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
  var CENARIOS=[{id:"lema",nome:"LEMA"},{id:"cabines",nome:"Cabines · conversa"},{id:"cosmos",nome:"COSMOS"},{id:"ausencia",nome:"Sem dados atuais"}];
  var INGESTAO=[
    {nome:"Fontes",sub:"42 aprovadas · 37 indexadas",dur:5200,titulo:"1. Catalogar, aprovar e preservar fontes",texto:"O catálogo tem <b>42 aprovações expressas</b>. Cinco exclusões: DOC-014, DOC-024, DOC-029, DOC-037 e DOC-041. O mapa é evidência histórica; quatro downloads estão bloqueados. As outras 37 fontes textuais formam a coleção ativa. KML e coleta continuam como inventários separados. Aprovação não garante vigência ou confirmação em campo.",numeros:[["42","aprovadas"],["37","indexadas"]],arquivo:"catalogo/fontes.csv · data/originais/",desenhar:function(p,d,ctx){var grid=el("div","rm-est__docs");E.sources.forEach(function(s,i){var c=el("span","rm-est__doc rm-eixo--"+(s.indexed?eixo(s.id):"apoio"),esc(s.id)+(s.indexed?"":" ×"));c.title=s.status;grid.appendChild(c);ctx.depois(60+i*45,function(){c.classList.add("rm-on");});});p.appendChild(grid);p.appendChild(legenda());}},
    {nome:"Extração",sub:"HTML → texto",dur:5500,titulo:"2. Preservar original e extrair conteúdo",texto:"O original fica com versão e SHA-256. A extração remove a moldura da página e organiza títulos, seções e parágrafos. Regras de escopo excluem RU; a revisão precisa conferir ambiguidades. O desenho é esquemático e o excerto é de um chunk real.",numeros:[["25","fontes disponíveis"]],arquivo:"scripts/01_adquirir.py · scripts/02_extrair.py",desenhar:function(p,d,ctx){var line=el("div","rm-est__linha"),sample=exemplo("DOC-012");line.appendChild(painel("HTML esquemático","<nav>Menu</nav>\n<main>\n"+exc(sample)+"\n</main>"));line.appendChild(seta());line.appendChild(chunk(sample));p.appendChild(line);}},
    {nome:"Chunking",sub:"300 alvo · até 40 overlap",dur:6000,titulo:"3. Criar fichas com contexto e origem",texto:"<b>agrupar_irmaos</b> reúne seções vizinhas do mesmo título-pai até 300 tokens. Seção longa é subdividida por parágrafo/frase, com até 40 de sobreposição em unidades inteiras. Não mistura documentos. Os números são escolhas iniciais, não parâmetros ótimos comprovados.",numeros:[["174","chunks"],["17–300","tokens"],["222","mediana"]],arquivo:"scripts/04_chunks.py · data/chunks/chunks.jsonl",desenhar:function(p,d,ctx){var doc=el("div","rm-est__corte");[exemplo("DOC-001"),exemplo("DOC-005"),exemplo("DOC-012")].filter(Boolean).forEach(function(s,i){var c=chunk(s);c.classList.remove("rm-on");doc.appendChild(c);ctx.depois(900+i*400,function(){c.classList.add("rm-on");});});p.appendChild(doc);ctx.depois(600,function(){doc.classList.add("rm-cortado");});}},
    {nome:"Embeddings",sub:"E5-small · 384 dim",dur:6000,titulo:"4. Cada ficha recebe um vetor",texto:"O <b>multilingual-e5-small</b> codifica os chunks localmente com <code>passage: </code>. São 384 componentes float32 normalizados. Entradas são contadas antes do encode, sem truncamento silencioso acima de 512 tokens. As barras exibem valores reais de um documento.",numeros:[["174 × 384","matriz"],["CPU","local"],["16","por lote"]],arquivo:"src/unb_gama_rag/embeddings.py · data/index/vetores/",desenhar:function(p,d,ctx){var s=exemplo("DOC-012"),line=el("div","rm-est__linha");line.appendChild(chunk(s));line.appendChild(seta());line.appendChild(caixaModelo("E5-small","passage: · L2"));line.appendChild(seta());line.appendChild(vetor(s,ctx));p.appendChild(line);}},
    {nome:"Chroma",sub:"persistido e reaberto",dur:6000,titulo:"5. Guardar e conferir o catálogo vetorial",texto:"Chroma <b>PersistentClient</b> guarda 174 registros no disco local. IDs estáveis e upsert evitam duplicação; o manifesto aponta a coleção ativa. Reabertura e consulta foram confirmadas em processos novos sem ingestão. O desenho agrupa por fonte; não é projeção de embeddings nem mapa físico.",numeros:[["174","registros"],["1","persistência confirmada"]],arquivo:"data/index/chroma/ · data/index/manifesto.json",desenhar:function(p,d,ctx){p.appendChild(mapa(ctx));p.appendChild(painel("Coleção ativa",E.index.collection+"\n174 chunks · cosseno\n37 fontes · disco local"));}}
  ];
  // As peças e transições seguem a esteira do Grupo 04, com dados do Grupo 09.
  function realcar(texto) {
    return esc(texto).replace(/\[(\d+)\]/g, '<b class="rm-est__cit">[$1]</b>').replace(/\n/g, '<br>');
  }
  function balao(autor, texto, estudante) {
    var b = el("div", "rm-est__balao " + (estudante ? "rm-est__balao--eu" : "rm-est__balao--rumo"));
    b.appendChild(el("small", "", esc(autor)));
    b.appendChild(el("div", "rm-est__mensagem", realcar(texto)));
    return b;
  }
  function fontes(chat, d, ctx, atraso) {
    var usadas = d.registro.source_ids.map(function(id) {
      return d.registro.retrieved.find(function(t) { return t.id === id; });
    }).filter(Boolean);
    if (!usadas.length) {
      var aviso = el("div", "rm-est__recusa", "Sem dados atuais nos trechos · nenhuma ocupação foi inventada");
      chat.appendChild(aviso);
      ctx.depois(atraso, function() { aviso.classList.add("rm-on"); });
      return;
    }
    var fs = el("div", "rm-est__fontes");
    usadas.forEach(function(t, i) {
      var a = el("a", "rm-est__fonte rm-eixo--" + eixo(t.source_id),
        '<b>[' + (i + 1) + '] ' + esc(t.source_id) + '</b><span>' + esc(t.title) +
        '</span><small>' + esc(t.section) + ' · versão ' + esc(t.version) + ' ↗</small>');
      a.href = t.url; a.target = "_blank"; a.rel = "noopener";
      fs.appendChild(a);
      ctx.depois(atraso + i * 300, function() { a.classList.add("rm-on"); });
    });
    chat.appendChild(fs);
  }
  function hibrida(d) { return d.registro.method === "hibrida_rrf"; }
  var STOP = new Set(("a ao aos as o os e ou de da das do dos em na nas no nos um uma uns umas " +
    "para por com sem que qual quais como onde quando quanto quantas quantos " +
    "se eu voce voces me meu minha seus suas seu sua isso esse essa esses essas " +
    "este esta estes estas neste nesta nesse nessa ha tem sao ser fica ficam sobre tambem agora").split(" "));
  function fichas(texto, ctx) {
    var box = el("div", "rm-est__fichas");
    (texto.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]+/g) || []).forEach(function(t, i) {
      var f = el("span", "rm-est__ficha" + (STOP.has(t) || t.length < 2 ? " rm-stop" : ""), esc(t));
      box.appendChild(f);
      ctx.depois(700 + i * 80, function() { f.classList.add("rm-on"); });
    });
    return box;
  }
  function buscaAnimada(p, d, ctx) {
    var box = el("div", "rm-est__mapa-box");
    box.appendChild(el("div", "rm-est__painel-tit", "Pergunta → cinco chunks recuperados"));
    var svg = sv("svg", {viewBox:"0 0 640 310", class:"rm-est__mapa", role:"img",
      "aria-label":"Esquema animado da pergunta conectada aos cinco trechos reais recuperados"});
    var q = {x:320, y:155};
    svg.appendChild(sv("circle", {cx:q.x, cy:q.y, r:90, class:"rm-est__radar"}));
    d.registro.retrieved.forEach(function(t, i) {
      var angle = (-90 + i * 72) * Math.PI / 180;
      var x = q.x + Math.cos(angle) * 230, y = q.y + Math.sin(angle) * 105;
      var line = sv("line", {x1:q.x, y1:q.y, x2:x, y2:y, class:"rm-est__liga rm-oculto"});
      var length = Math.hypot(x - q.x, y - q.y);
      line.style.strokeDasharray = length; line.style.strokeDashoffset = reduzido ? 0 : length;
      var point = sv("circle", {cx:x, cy:y, r:8, class:"rm-hit rm-oculto rm-eixo--" + eixo(t.source_id)});
      var label = sv("text", {x:x, y:y + 25, "text-anchor":"middle", class:"rm-est__hit-rot rm-oculto"},
        (i + 1) + ' · ' + t.source_id + ' · d=' + t.distance.toFixed(3));
      point.appendChild(sv("title", {}, t.id + ' · ' + t.title));
      [line, point, label].forEach(function(n) { svg.appendChild(n); });
      ctx.depois(800 + i * 380, function() {
        line.classList.remove("rm-oculto"); line.style.strokeDashoffset = 0;
        point.classList.remove("rm-oculto"); label.classList.remove("rm-oculto");
      });
    });
    var star = [];
    for (var i = 0; i < 10; i++) {
      var radius = i % 2 ? 6 : 15, a = (-90 + i * 36) * Math.PI / 180;
      star.push((q.x + Math.cos(a) * radius) + ',' + (q.y + Math.sin(a) * radius));
    }
    svg.appendChild(sv("polygon", {points:star.join(' '), class:"rm-est__estrela"}));
    svg.appendChild(sv("text", {x:q.x, y:q.y + 32, "text-anchor":"middle", class:"rm-est__hit-rot rm-forte"}, "sua pergunta"));
    box.appendChild(svg);
    box.appendChild(el("div", "rm-est__nota", "Distâncias reais; posições esquemáticas, sem projeção dos embeddings."));
    p.appendChild(box);
  }
  var CONSULTA = [
    {
      nome:"Pergunta", sub:"estudante", dur:5000,
      titulo:"1. O estudante faz uma pergunta",
      texto:"A mensagem chega pelo chat do <b>FCTE Campus</b> à API local. Em um complemento, previousRequestId permite recuperar o assunto anterior. A conversa ajuda a interpretar a pergunta; os fatos ainda precisam de fontes.",
      arquivo:"PWA → /api/rag/chat → API /api/v1/chat",
      desenhar:function(p, d, ctx) {
        var chat = el("div", "rm-est__chat");
        var anterior = E.demos.find(function(x) { return x.request_id === d.registro.previous_request_id; });
        if (!anterior && d.registro.previous_answer) anterior = {answer:d.registro.previous_answer};
        if (anterior) {
          var contexto = balao("Assistente FCTE · mensagem anterior", anterior.answer, false);
          contexto.classList.add("rm-on", "rm-est__balao--anterior"); chat.appendChild(contexto);
        }
        var b = balao("Estudante", "", true), t = b.querySelector(".rm-est__mensagem");
        t.classList.add("rm-est__digitando"); chat.appendChild(b); p.appendChild(chat);
        ctx.digitar(t, d.pergunta, 28, function() { t.classList.add("rm-fim"); });
        if (d.registro.query !== d.pergunta) {
          var nota = el("div", "rm-est__pbloco rm-est__pbloco--q", '<b>Assunto recuperado para a busca</b><br>' + esc(d.registro.query));
          chat.appendChild(nota); ctx.depois(2500, function() { nota.classList.add("rm-on"); });
        }
      }
    },
    {
      nome:"Vira vetor", sub:"E5 · palavras", dur:6000,
      titulo:"2. A pergunta vira vetor e termos de busca",
      texto:function(d) { return "O <b>mesmo E5-small</b> dos documentos recebe a consulta com <code>query:</code> e produz 384 componentes normalizados. " +
        (hibrida(d) ? "Em paralelo, BM25 procura palavras exatas: acentos e caixa são normalizados, palavras vazias são retiradas. O desenho destaca esses termos." : "Esta execução histórica usou apenas busca densa. BM25 faz parte da versão atual e dos exemplos LEMA e cabines."); },
      numeros:[["384", "dimensões"], ["L2", "normalização"]], arquivo:"embeddings.py · busca_lexical.py",
      desenhar:function(p, d, ctx) {
        var faixa = el("div", "rm-est__faixa"), linha = el("div", "rm-est__linha");
        faixa.appendChild(el("div", "rm-est__faixa-tit", "Representação por <b>significado</b>"));
        linha.appendChild(el("div", "rm-est__q", esc('query: ' + d.registro.query)));
        linha.appendChild(seta()); linha.appendChild(caixaModelo("E5-small", "384 componentes · L2"));
        linha.appendChild(seta());
        var vet = el("div", "rm-est__vetor-esquema");
        for (var i = 0; i < 24; i++) {
          var celula = el("span", ""); celula.style.animationDelay = (i * .05) + 's'; vet.appendChild(celula);
        }
        linha.appendChild(vet); faixa.appendChild(linha); p.appendChild(faixa);
        p.appendChild(el("div", "rm-est__nota", "Representação visual do processamento; os valores do vetor da pergunta não foram exportados."));
        if (hibrida(d)) {
          var termos = el("div", "rm-est__faixa");
          termos.appendChild(el("div", "rm-est__faixa-tit", "Busca por <b>palavras</b> · termos riscados são ignorados"));
          termos.appendChild(fichas(d.registro.query, ctx)); p.appendChild(termos);
        }
      }
    },
    {
      nome:"Busca", sub:"chunks do Chroma", dur:6000,
      titulo:"3. A busca encontra candidatos",
      texto:function(d) { return hibrida(d) ?
        "A busca densa consulta os vetores no <b>Chroma persistido</b>. BM25 ordena os textos pelos termos da pergunta. Até 30 candidatos de cada lista seguem para a fusão. As conexões ilustram os cinco trechos que chegaram ao resultado desta execução." :
        "Na avaliação inicial, a busca usava a distância cosseno do Chroma. As conexões mostram os cinco trechos realmente recuperados. Um vizinho pode não responder à pergunta: distância não é probabilidade de verdade."; },
      arquivo:"busca.py · busca_lexical.py · Chroma PersistentClient",
      desenhar:buscaAnimada
    },
    {
      nome:"Ranking", sub:"até cinco trechos", dur:6500,
      titulo:"4. Selecionar os trechos para o contexto",
      texto:function(d) { return hibrida(d) ?
        "A <b>fusão RRF</b> soma <code>1 ÷ (60 + posição)</code> nas listas densa e lexical. O sistema seleciona até cinco chunks, no máximo dois por fonte. As barras exibem as notas RRF registradas, relativas à maior nota desta lista; não são percentuais de confiança." :
        "Neste registro da busca densa, os candidatos foram ordenados pela distância cosseno: <b>menor é mais próximo</b>. Mostramos a distância real, sem atribuir uma nota RRF que essa versão não calculou. O limite é de cinco chunks e dois por fonte."; },
      numeros:[["5", "trechos"], ["2", "máximo por fonte"]], arquivo:"busca.py · fundir_rrf()",
      desenhar:function(p, d, ctx) {
        var funil = el("div", "rm-est__funil");
        if (hibrida(d)) {
          funil.appendChild(el("span", "rm-est__pilula", "Até 30 vetoriais"));
          funil.appendChild(el("span", "rm-est__mais", "+"));
          funil.appendChild(el("span", "rm-est__pilula", "Até 30 lexicais"));
          funil.appendChild(el("code", "rm-est__formula", "RRF = Σ 1 / (60 + posição)"));
        } else funil.appendChild(el("span", "rm-est__pilula", "Avaliação inicial · distância cosseno"));
        p.appendChild(funil);
        var lista = el("ol", "rm-est__rank");
        var max = Math.max.apply(null, d.registro.retrieved.map(function(t) { return t.rrf || 0; }));
        d.registro.retrieved.forEach(function(t, i) {
          var li = el("li", "rm-eixo--" + eixo(t.source_id));
          li.innerHTML = '<span class="rm-est__n">' + (i + 1) + '</span>' +
            '<span class="rm-est__rank-txt"><b>' + esc(t.source_id) + '</b> ' + esc(t.title) +
            '<small>' + esc(t.id) + (d.registro.source_ids.indexOf(t.id) >= 0 ? ' · citado na resposta' : '') + '</small></span>' +
            (hibrida(d) ? '<span class="rm-est__trilha"><i style="--w:' + Math.round((t.rrf || 0) / max * 100) + '%"></i></span>' : '<span></span>') +
            '<code>' + (hibrida(d) ? 'RRF ' + t.rrf.toFixed(4) : 'd ' + t.distance.toFixed(4)) + '</code>';
          lista.appendChild(li); ctx.depois(400 + i * 350, function() { li.classList.add("rm-on"); });
        });
        p.appendChild(lista);
      }
    },
    {
      nome:"Prompt", sub:"regras + evidências", dur:6500,
      titulo:"5. Montar o contexto com regras e fontes",
      texto:"O Gemini recebe a pergunta, instruções de fundamentação e os trechos identificados. Cada chunk carrega origem e versão. <b>O conteúdo das fontes é dado, não comando.</b> A conversa anterior só ajuda a entender o assunto. Aqui os excertos foram abreviados para a apresentação.",
      arquivo:"geracao.py · conversa.py",
      desenhar:function(p, d, ctx) {
        var doc = el("div", "rm-est__prompt"), blocos = [];
        blocos.push(el("div", "rm-est__pbloco rm-est__pbloco--regras",
          '<b>system · regras</b><span>Usar apenas as evidências recuperadas.</span><span>Citar IDs existentes; admitir quando faltam dados.</span><span>Histórico de conversa não é evidência.</span>'));
        d.registro.retrieved.forEach(function(t) {
          blocos.push(el("div", "rm-est__pbloco rm-eixo--" + eixo(t.source_id),
            '<b>' + esc(t.source_id) + ' · ' + esc(t.id) + '</b><br>' + esc(t.excerpt) +
            '<br><small>' + esc(t.section) + ' · versão ' + esc(t.version) + '</small>'));
        });
        blocos.push(el("div", "rm-est__pbloco rm-est__pbloco--q", '<b>Pergunta:</b> ' + esc(d.pergunta)));
        blocos.forEach(function(b, i) { doc.appendChild(b); ctx.depois(200 + i * 380, function() { b.classList.add("rm-on"); }); });
        p.appendChild(doc);
      }
    },
    {
      nome:"Gemini", sub:"resposta com fontes", dur:function(d) { return 3500 + d.registro.answer.length * 20; },
      titulo:"6. O assistente escreve a resposta",
      texto:"O <b>Gemini</b> redige usando os trechos recuperados. O backend valida o formato e os IDs citados. A animação reproduz uma resposta real, com digitação e citações. Ela não faz outra chamada à API nem simula um novo resultado.",
      numeros:[["0,1", "temperatura"]], arquivo:"geracao.py · gemini-3.5-flash-lite",
      desenhar:function(p, d, ctx) {
        var linha = el("div", "rm-est__linha rm-est__geracao");
        linha.appendChild(caixaModelo("Gemini", "geração da resposta")); linha.appendChild(seta());
        var chat = el("div", "rm-est__chat");
        chat.appendChild(balao("Estudante", d.pergunta, true));
        var b = balao("Assistente FCTE · escrevendo…", "", false), t = b.querySelector(".rm-est__mensagem");
        t.classList.add("rm-est__digitando"); chat.appendChild(b); linha.appendChild(chat); p.appendChild(linha);
        ctx.depois(650, function() {
          b.classList.add("rm-on");
          ctx.digitar(t, d.registro.answer, 20, function() {
            t.innerHTML = realcar(d.registro.answer); t.classList.add("rm-fim");
            b.querySelector("small").textContent = "Assistente FCTE · resposta pronta";
          });
        });
      }
    },
    {
      nome:"Resposta", sub:"chat + fontes", dur:7500,
      titulo:"7. A resposta chega ao estudante com as fontes",
      texto:function(d) { return d.registro.source_ids.length ?
        "O estudante recebe a resposta e abre as fontes em cartões. Cada <b>[n]</b> corresponde a um chunk realmente citado, com documento, seção e versão. O registro da consulta preserva a trilha para conferência. Validade do ID não substitui revisão do suporte de cada afirmação." :
        "Nesta pergunta sobre ocupação atual, o assistente informa o limite dos dados. Não inventa disponibilidade de sala. A recusa registrada pode ser conferida junto dos trechos recuperados na demonstração."; },
      arquivo:"servico.py · execucoes/chat-<requestId>.json",
      desenhar:function(p, d, ctx) {
        var chat = el("div", "rm-est__chat");
        chat.appendChild(balao("Estudante", d.pergunta, true));
        var b = balao("Assistente FCTE", d.registro.answer, false); chat.appendChild(b);
        ctx.depois(300, function() { b.classList.add("rm-on"); });
        fontes(chat, d, ctx, 1100); p.appendChild(chat);
        var registro = el("details", "rm-est__registro");
        registro.appendChild(el("summary", "", "Ver registro desta conversa"));
        registro.appendChild(el("code", "", esc(d.registro.request_id)));
        registro.appendChild(el("div", "", esc(d.registro.prompt_version + ' · ' + d.registro.method)));
        p.appendChild(registro);
      }
    }
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
        "<h4>" + e.titulo + "</h4><div class=rm-est__alerta>" + esc(est.modo === "consulta" ? d.registro.label : "Implementado · artefatos reais") + "</div><p>" + val(e.texto, d) + "</p>" +
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
