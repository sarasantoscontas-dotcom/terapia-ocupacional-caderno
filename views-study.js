/* Bibliotecas de Resumos, Flashcards e Bibliografia */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
const link=(label,href,cls="")=>'<a class="to-btn '+cls+'" href="'+E(href)+'">'+E(label)+'</a>';
const note='Distribuição curricular ilustrativa. Confira o PPC, a carga horária e o elenco de disciplinas da sua instituição.';
const totalDis=s=>s.subjects.length;
const activeDeck=(n,d)=>window.TO_GET_DECK?window.TO_GET_DECK(n,d):d.topics;
const totalTopics=s=>s.subjects.reduce((n,d)=>n+d.topics.length,0);
const periodCards=()=>window.TO_SEMESTERS.map(x=>A.card(x.title,x.focus,"#periodo/"+x.number,"PERCURSO ACADÊMICO","Explorar disciplinas e assuntos"));
function resumos(){
A.crumb(["Caderno","Resumos Prontos"]);
const ss=window.TO_SEMESTERS;
const body=A.views("resumos",[["galeria","▦ Galeria"],["tabela","☷ Tabela"],["trilha","→ Trilha de períodos"]]);
let content;
if(S.views.resumos==="tabela")content=A.table(["Semestre","Área de estudo","Organização","Acessar"],ss.map(x=>['<a href="#periodo/'+x.number+'">'+E(x.title)+'</a>',E(x.focus),"Disciplinas, assuntos e resumos",'<a href="#periodo/'+x.number+'">Abrir →</a>']));
else if(S.views.resumos==="trilha")content=A.trail(ss.map(s=>({title:s.title,desc:s.focus,link:"#periodo/"+s.number})));
else content=A.gallery(periodCards());
A.main(A.shell("resumos","Resumos Prontos",A.hero("BIBLIOTECA ACADÊMICA","Resumos por semestre","Explore a graduação na sequência semestre → disciplina → assunto → resumo. Cada texto contém conceitos, raciocínio aplicado, exemplo contextualizado e pergunta de revisão.",note)+body+window.TO_DEPTH.summaryLibrary()+content+window.TO_CORE_DEEP.render("resumos")));
}
function periodo(parts){
const s=A.sem(parts[1]);if(!s){location.hash="#resumos";return}
A.crumb(["Caderno","Resumos",s.title]);const ss=s.subjects;
const rows=ss.map(d=>['<a href="#disciplina/'+s.number+'/'+d.id+'">'+E(d.title)+'</a>',E(d.topics.map(x=>x.title).join(" · ")),"Biblioteca de resumos e aplicações",'<a href="#disciplina/'+s.number+'/'+d.id+'">Abrir →</a>']);
const v=A.views("periodo",[["galeria","▦ Galeria"],["tabela","☷ Tabela"],["trilha","→ Trilha"]]);
const content=S.views.periodo==="tabela"?A.table(["Disciplina","Temas de estudo","Conteúdo","Acessar"],rows):S.views.periodo==="trilha"?A.trail(ss.map(d=>({title:d.title,desc:d.topics.map(t=>t.title).join(" · "),link:"#disciplina/"+s.number+"/"+d.id}))):A.gallery(ss.map((d,i)=>A.card(d.title,d.topics.map(t=>t.title).join(" • "),"#disciplina/"+s.number+"/"+d.id,s.title+" · FUNDAMENTAÇÃO E PRÁTICA","Abrir disciplina")));
A.main(A.shell("resumos",s.title,link("← Todos os semestres","#resumos")+A.hero("PERÍODO "+String(s.number).padStart(2,"0"),s.title,s.focus+". Escolha uma disciplina e depois o assunto para abrir o conteúdo completo.",note)+v+content,ss.map(d=>({title:d.title,href:"#disciplina/"+s.number+"/"+d.id}))));
}
function disciplina(parts){
const s=A.sem(parts[1]),d=A.discipline(parts[1],parts[2]);if(!s||!d){location.hash="#resumos";return}
A.crumb(["Caderno","Resumos",s.title,d.title]);
const v=A.views("disciplina",[["galeria","▦ Galeria"],["tabela","☷ Tabela"],["trilha","→ Trilha de assuntos"]]);
let content;
if(S.views.disciplina==="tabela")content=A.table(["Assunto","Ideia central","Status","Abrir"],d.topics.map(t=>['<a href="'+A.hrefTopic(s.number,d.id,t.id)+'">'+E(t.title)+'</a>',E(t.concept.slice(0,140))+"…",S.completed.includes(t.id)?"Estudado":"A estudar",'<a href="'+A.hrefTopic(s.number,d.id,t.id)+'">Ler →</a>']));
else if(S.views.disciplina==="trilha")content=A.trail(d.topics.map(t=>({title:t.title,desc:t.concept,link:A.hrefTopic(s.number,d.id,t.id)})));
else content=A.gallery(d.topics.map(t=>A.card(t.title,t.concept,A.hrefTopic(s.number,d.id,t.id),S.completed.includes(t.id)?"ESTUDADO":"LEITURA ACADÊMICA","Ler resumo")));
A.main(A.shell("resumos",d.title,link("← "+s.title,"#periodo/"+s.number)+A.hero("DISCIPLINA · "+s.title,d.title,"Entre em cada assunto para aprofundar os fundamentos, desenvolver raciocínio ocupacional e registrar suas próprias anotações.")+v+content,[{title:"Voltar ao período",href:"#periodo/"+s.number},...d.topics.map(t=>({title:t.title,href:A.hrefTopic(s.number,d.id,t.id)}))]));
}
function resumo(parts){
const s=A.sem(parts[1]),d=A.discipline(parts[1],parts[2]),t=A.topic(parts[1],parts[2],parts[3]);if(!s||!d||!t){location.hash="#resumos";return}
A.crumb(["Caderno","Resumos",s.title,d.title,t.title]);
const href=A.hrefTopic(s.number,d.id,t.id),isRead=S.completed.includes(t.id),fav=S.favorites.includes(t.id),source=window.TO_SOURCES.find(x=>x.id===d.ref);
const nav=d.topics.map((x,i)=>({title:x.title,href:A.hrefTopic(s.number,d.id,x.id)}));
const content=link("← "+d.title,"#disciplina/"+s.number+"/"+d.id)+'<div class="to-meta">'+A.badge(s.title)+A.badge(d.title)+A.badge(isRead?"Estudado":"A estudar")+'</div><div class="to-actions">'+A.button(isRead?"✓ Marcar como não estudado":"✓ Marcar como estudado","read",'data-id="'+E(t.id)+'"',"primary")+A.button(fav?"★ Salvo":"☆ Favoritar","favorite",'data-id="'+E(t.id)+'"')+A.button("Imprimir / PDF","print")+'</div>'+
'<div class="to-study-layout"><article class="to-article"><small class="to-compact">CADERNO · '+E(s.title.toUpperCase())+' / '+E(d.title.toUpperCase())+'</small><h1>'+E(t.title)+'</h1><p class="to-lead">'+E(t.concept)+'</p><h2 id="conceitos">Fundamentos e conceitos</h2><p>'+E(t.concept)+'</p><h2 id="raciocinio">Raciocínio e decisões profissionais</h2><p>'+E(t.reasoning)+'</p><h2 id="pratica">Exemplo de aplicação contextualizada</h2><p>'+E(t.application)+'</p><details class="to-disclosure"><summary>Analisar o caso: tarefas, ambiente e desfechos</summary><p>Registre o que já foi observado, o que permanece como hipótese e que indicador ocupacional poderia avaliar uma mudança. Reflita sobre as opções de apoio e verifique segurança e objetivos com supervisão, quando pertinente.</p></details><details class="to-disclosure" open><summary>Questão de interpretação e aplicação</summary><p><strong>'+E(t.q)+'</strong></p><p>'+E(t.a)+'</p></details><details class="to-disclosure"><summary>Pontos para relacionar com outras disciplinas</summary><p>Considere quais condições ambientais, demandas da tarefa, oportunidades e valores influenciam este conteúdo. Compare com outras explicações e documente quais fontes originais precisam ser examinadas.</p></details><h2 id="fonte">Referencial de aprofundamento</h2><p>Fonte de referência temática para consulta e conferência dos conceitos: '+E((window.TO_SOURCES.find(x=>x.id===d.ref)||{}).title||'Fontes de aprofundamento da área')+'. Esta síntese é autoral e não substitui a leitura das publicações originais.</p><div class="to-note">Ética acadêmica: nunca inserir nomes, imagens, prontuários ou detalhes identificáveis de pessoas atendidas. Materiais de estudo não substituem supervisão nem orientações clínicas individualizadas.</div></article>'+
'<aside class="to-sidebox"><h3>Dentro deste resumo</h3><a href="#conceitos" data-anchor="conceitos">Conceitos</a><a href="#raciocinio" data-anchor="raciocinio">Raciocínio</a><a href="#pratica" data-anchor="pratica">Aplicação</a><a href="#fonte" data-anchor="fonte">Referencial</a><h3 style="margin-top:20px">Minhas anotações</h3><textarea data-note="'+E(t.id)+'" class="to-input" rows="9" placeholder="Ex.: relações com outras aulas, dúvidas, termos para pesquisar…">'+E(S.notes[t.id]||"")+'</textarea><p class="to-compact">Salvo automaticamente neste navegador.</p><div class="to-progress"><span style="width:'+(isRead?100:0)+'%"></span></div><p class="to-meter">'+(isRead?"Leitura concluída":"Leitura pendente")+'</p></aside></div><div class="to-actions">'+(d.topics[0].id===t.id?link("Próximo assunto →",A.hrefTopic(s.number,d.id,d.topics[1].id)):link("← Assunto anterior",A.hrefTopic(s.number,d.id,d.topics[0].id)))+'</div>';
A.main(A.shell("resumos",d.title,content+window.TO_DEPTH.summaryDetail(t,s,d),nav));
}
A.onAction("read",b=>{const id=b.dataset.id;S.completed=S.completed.includes(id)?S.completed.filter(x=>x!==id):[...S.completed,id];A.save();A.render(true);A.toast("Progresso atualizado.")});
A.onAction("favorite",b=>{const id=b.dataset.id;S.favorites=S.favorites.includes(id)?S.favorites.filter(x=>x!==id):[...S.favorites,id];A.save();A.render(true)});
A.onAction("print",()=>window.print());
document.addEventListener("input",e=>{if(e.target.dataset.note!==undefined){S.notes[e.target.dataset.note]=e.target.value;A.save()}});
document.addEventListener("click",e=>{const a=e.target.closest("[data-anchor]");if(a){e.preventDefault();document.getElementById(a.dataset.anchor)?.scrollIntoView({behavior:"smooth",block:"start"})}});
function flashcards(parts){
const n=Number(parts[1]),s=A.sem(n);
A.crumb(["Caderno","Flashcards",s?s.title:"Todos os períodos"]);
const start=A.hero("REVISÃO ATIVA","Flashcards por semestre",s?"Selecione uma disciplina para praticar recuperação ativa e marcar a dificuldade de cada questão.":"Escolha um período e depois uma disciplina. As respostas ficam ocultas até você tentar recordar.");
if(!s){
A.main(A.shell("flashcards","Flashcards",start+window.TO_DEPTH.flashRoot()+window.TO_CORE_DEEP.render("flashcards")+A.gallery(window.TO_SEMESTERS.map(x=>A.card(x.title,x.focus,"#flashcards/"+x.number,"ESTUDO POR DISCIPLINA","Escolher período")))));
return}
A.main(A.shell("flashcards",s.title,link("← Todos os períodos","#flashcards")+start+A.views("flashcards",[["galeria","▦ Galeria"],["tabela","☷ Tabela"]])+(S.views.flashcards==="tabela"?A.table(["Disciplina","Área de estudo","Abrir"],s.subjects.map(d=>['<a href="#deck/'+s.number+'/'+d.id+'">'+E(d.title)+'</a>',E(d.topics.map(t=>t.title).join(" · ")),'<a href="#deck/'+s.number+'/'+d.id+'">Revisar →</a>'])):A.gallery(s.subjects.map(d=>A.card(d.title,"Perguntas conceituais com respostas explicativas para revisar conteúdos desta disciplina.","#deck/"+s.number+"/"+d.id,"CARTÕES DE REVISÃO","Iniciar revisão"))))));
}
let reveal=false;
function deck(parts){
const s=A.sem(parts[1]),d=A.discipline(parts[1],parts[2]);if(!s||!d){location.hash="#flashcards";return}
A.crumb(["Caderno","Flashcards",s.title,d.title]);
const key=s.number+"/"+d.id;const cards=activeDeck(s.number,d);let index=Math.max(0,Math.min(Number(S.flashIndex[key]||0),cards.length-1));const t=cards[index];
const done=cards.filter(x=>S.flashLevels[x.id]==="dominei").length;
const card='<div class="to-flash-card"><small>REVISÃO ATIVA · '+E(d.title)+'</small><h2>'+E(t.q)+'</h2>'+(reveal?'<div class="to-answer"><small>RESPOSTA COMENTADA</small><p>'+E(t.a)+'</p><p class="to-compact">Relação com o conteúdo: '+E(t.concept)+'</p></div>':'<p class="to-muted">Tente responder antes de revelar.</p>')+'</div>';
const controls='<div class="to-actions" style="justify-content:center">'+A.button("← Anterior","deckPrev",'data-key="'+E(key)+'"')+A.button(reveal?"Ocultar resposta":"Revelar resposta","deckReveal",'',"primary")+A.button("Próximo →","deckNext",'data-key="'+E(key)+'"')+'</div>'+(reveal?'<div class="to-actions" style="justify-content:center">'+A.button("Preciso rever","deckRate",'data-level="rever" data-id="'+E(t.id)+'" data-key="'+E(key)+'"')+A.button("Difícil","deckRate",'data-level="dificil" data-id="'+E(t.id)+'" data-key="'+E(key)+'"')+A.button("Lembrei","deckRate",'data-level="lembrei" data-id="'+E(t.id)+'" data-key="'+E(key)+'"')+A.button("Dominei","deckRate",'data-level="dominei" data-id="'+E(t.id)+'" data-key="'+E(key)+'"',"primary")+'</div>':"");
A.main(A.shell("flashcards",d.title,link("← "+s.title,"#flashcards/"+s.number)+A.hero("BARALHO · "+s.title,d.title,"Revise os conceitos da disciplina, mantenha sua resposta mental e só então consulte a explicação.")+'<div class="to-progress"><span style="width:'+(done/cards.length*100)+'%"></span></div>'+card+controls+'<div class="to-section"><h2>Aprofundamento da revisão</h2><p>'+E(t.concept||t.a)+'</p>'+(t.extra?'':'<span class="to-pill">Conceito relacionado à disciplina atual</span>')+'</div>'));
}
A.onAction("deckReveal",()=>{reveal=!reveal;A.render(true)});
A.onAction("deckNext",b=>{const [n,did]=b.dataset.key.split("/"),d=A.discipline(n,did);S.flashIndex[b.dataset.key]=(Number(S.flashIndex[b.dataset.key]||0)+1)%activeDeck(n,d).length;reveal=false;A.save();A.render(true)});
A.onAction("deckPrev",b=>{const [n,did]=b.dataset.key.split("/"),d=A.discipline(n,did);S.flashIndex[b.dataset.key]=(Number(S.flashIndex[b.dataset.key]||0)+activeDeck(n,d).length-1)%activeDeck(n,d).length;reveal=false;A.save();A.render(true)});
A.onAction("deckRate",b=>{S.flashLevels[b.dataset.id]=b.dataset.level;const [n,did]=b.dataset.key.split("/"),d=A.discipline(n,did);S.flashIndex[b.dataset.key]=(Number(S.flashIndex[b.dataset.key]||0)+1)%activeDeck(n,d).length;reveal=false;A.save();A.render(true)});
let refSem="todos",refType="todos";
function bibliografia(){
 A.crumb(["Caderno","Bibliografia"]);
 const sources=[...(window.TO_BIBLIOGRAPHY||window.TO_SOURCES),...(S.customRefs||[]).map(r=>({...r,semesters:r.semesters||[1,2,3,4,5,6,7,8],custom:true}))];
 const types=[...new Set(sources.map(s=>s.area||s.type))].sort();
 const valid=sources.filter(s=>(refSem==="todos"||s.semesters?.includes(Number(refSem)))&&(refType==="todos"||((s.area||s.type)===refType)));
 const filters='<div class="to-toolbar"><input class="to-filter to-search" id="bibSearch" type="search" placeholder="Pesquisar obras, autores ou áreas..." value="'+E(window.TO_BIB_SEARCH||"")+'"><select id="refSem" class="to-filter"><option value="todos">Todos os períodos</option>'+window.TO_SEMESTERS.map(s=>'<option value="'+s.number+'" '+(refSem===String(s.number)?"selected":"")+'>'+E(s.title)+'</option>').join("")+'</select><select id="refType" class="to-filter"><option value="todos">Todas as áreas</option>'+types.map(t=>'<option value="'+E(t)+'" '+(refType===t?"selected":"")+'>'+E(t)+'</option>').join("")+'</select>'+A.button("Limpar filtros","clearRef")+'</div>';
 const listing=valid.filter(s=>{const q=(window.TO_BIB_SEARCH||"").toLocaleLowerCase("pt-BR");return !q||(s.title+" "+s.org+" "+s.note+" "+s.area).toLocaleLowerCase("pt-BR").includes(q)});
 const perPage=18;const maxPage=Math.max(0,Math.ceil(listing.length/perPage)-1);window.TO_BIB_PAGE=Math.min(Math.max(0,window.TO_BIB_PAGE||0),maxPage);const pageItems=listing.slice(window.TO_BIB_PAGE*perPage,(window.TO_BIB_PAGE+1)*perPage);
 const cards=pageItems.map(s=>'<article class="to-card"><small>'+E(s.area||s.type||"Acervo acadêmico")+'</small><h3>'+E(s.title)+'</h3><p><b>'+E(s.org||"Referência de estudo")+'</b></p><p>'+E(s.note||"")+'</p><details class="to-disclosure"><summary>Como utilizar esta referência no caderno</summary><p><b>Disciplina/área:</b> '+E(s.area||s.type||"Terapia Ocupacional")+'</p><p><b>Organização sugerida:</b> registre conceito principal, páginas ou seções consultadas, aplicação possível, comparação com outra fonte e anotação crítica. Confira a edição vigente antes de citar.</p><textarea class="to-input" rows="3" data-bib-note="'+E(s.id)+'" placeholder="Minhas notas sobre esta referência...">'+E((S.bibNotes||{})[s.id]||"")+'</textarea></details><div class="to-actions">'+A.button(S.refsFav.includes(s.id)?"★ Favorita":"☆ Favoritar","refFav",'data-id="'+E(s.id)+'"')+(s.custom?A.button("Excluir ficha","removeRef",'data-id="'+E(s.id)+'"',"danger"):"")+'</div>'+window.TO_DEPTH.bibliographyCard(s)+'</article>');
 const rows=pageItems.map(s=>[E(s.title),E(s.org||"—"),E(s.area||s.type||"—"),E(s.note||"—")]);
 const form='<details class="to-disclosure"><summary>+ Adicionar ficha de referência à minha biblioteca</summary><div class="to-grid2" style="margin-top:15px"><label class="to-field">Nome da referência<input id="refTitle" placeholder="Título do livro, artigo ou documento"></label><label class="to-field">Autor ou instituição<input id="refAuthor" placeholder="Identificação da fonte"></label><label class="to-field">Ano ou edição<input id="refYear" placeholder="Ano / edição consultada"></label><label class="to-field">Área de estudo<input id="refArea" placeholder="Ex.: pediatria, saúde mental"></label></div><label class="to-field">Para que serve esta referência?<textarea id="refPurpose" rows="3" placeholder="Conceitos, métodos ou disciplinas que posso estudar..."></textarea></label><div class="to-actions">'+A.button("Salvar ficha bibliográfica","addRef",'',"primary")+'</div></details>';
 A.main(A.shell("bibliografia","Minha Bibliografia",A.hero("ACERVO DE REFERÊNCIAS","Bibliografia de Terapia Ocupacional","Uma biblioteca de consulta dentro do caderno: nome, autoria ou instituição, finalidade acadêmica, área temática e espaço para seus fichamentos. Não há redirecionamento externo.")+window.TO_DEPTH.bibliographyHeader()+window.TO_CORE_DEEP.render("bibliografia")+filters+A.views("bibliografia",[["galeria","▦ Galeria"],["tabela","☷ Tabela"]])+(S.views.bibliografia==="tabela"?A.table(["Referência","Instituição","Área","Para que serve"],rows):A.gallery(cards))+'<div class="to-actions to-bib-pagination">'+A.button("← Anterior","depthBibPrev")+'<span class="to-pill">Página '+(window.TO_BIB_PAGE+1)+' de '+(maxPage+1)+'</span>'+A.button("Próxima →","depthBibNext")+'</div>'+form+'<p class="to-footer-note">As fichas orientam estudo; confirme títulos, edições e dados de publicação em catálogos institucionais antes de utilizá-las em trabalhos. Alguns itens representam normas, instrumentos ou periódicos, não livros únicos.</p>'));
}
document.addEventListener("change",e=>{if(e.target.id==="refSem"){refSem=e.target.value;window.TO_BIB_PAGE=0;A.render(true)}if(e.target.id==="refType"){refType=e.target.value;window.TO_BIB_PAGE=0;A.render(true)}});
A.onAction("clearRef",()=>{refSem="todos";refType="todos";window.TO_BIB_SEARCH="";window.TO_BIB_PAGE=0;A.render(true)});
A.onAction("depthBibPrev",()=>{window.TO_BIB_PAGE=Math.max(0,(window.TO_BIB_PAGE||0)-1);A.render(true)});
A.onAction("depthBibNext",()=>{window.TO_BIB_PAGE=(window.TO_BIB_PAGE||0)+1;A.render(true)});
A.onAction("refFav",b=>{const id=b.dataset.id;S.refsFav=S.refsFav.includes(id)?S.refsFav.filter(x=>x!==id):[...S.refsFav,id];A.save();A.render(true)});
A.onAction("removeRef",b=>{S.customRefs=S.customRefs.filter(x=>x.id!==b.dataset.id);A.save();A.render(true)});
A.onAction("addRef",()=>{const title=A.$("#refTitle")?.value.trim(),org=A.$("#refAuthor")?.value.trim(),year=A.$("#refYear")?.value.trim(),area=A.$("#refArea")?.value.trim(),note=A.$("#refPurpose")?.value.trim();if(!title||!org||!note){A.toast("Informe nome, autoria e finalidade da referência.");return}S.customRefs.push({id:"custom-"+Date.now(),title,org,year:year||"Edição a conferir",area:area||"Meu acervo",type:"Ficha pessoal",note,semesters:[1,2,3,4,5,6,7,8]});A.save();A.render(true);A.toast("Ficha bibliográfica cadastrada.")});
document.addEventListener("input",e=>{if(e.target.dataset.bibNote){S.bibNotes=S.bibNotes||{};S.bibNotes[e.target.dataset.bibNote]=e.target.value;A.save()}});
document.addEventListener("change",e=>{if(e.target.id==="bibSearch"){window.TO_BIB_SEARCH=e.target.value;window.TO_BIB_PAGE=0;A.render(true)}});
A.register("resumos",resumos);
A.register("periodo",periodo);
A.register("disciplina",disciplina);
A.register("resumo",resumo);
A.register("flashcards",flashcards);
A.register("deck",deck);
A.register("bibliografia",bibliografia);
})();