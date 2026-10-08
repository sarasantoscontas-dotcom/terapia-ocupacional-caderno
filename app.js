/* Núcleo da aplicação: navegação, persistência por navegador, componentes reutilizáveis. */
(()=>{
"use strict";
const KEY="to-caderno-2026-v1";
const defaults={
 completed:[],favorites:[],notes:{},flashLevels:{},flashIndex:{},refsFav:[],customRefs:[],
 views:{resumos:"galeria",periodo:"galeria",disciplina:"galeria",flashcards:"galeria",bibliografia:"galeria",semestres:"galeria",periodsemester:"painel",tcc:"painel",pesquisa:"painel"},
 semesterCurrent:1,subjectData:{},semesterNotes:{},tasks:[],
 tcc:{title:"",question:"",justification:"",goal:"",method:"",keywords:"",supervisor:"",institution:"",deadline:"",chapters:{},tasks:[
 {id:"t1",name:"Delimitar tema e problema",stage:"A fazer",date:""},
 {id:"t2",name:"Pesquisar literatura relevante",stage:"Em andamento",date:""},
 {id:"t3",name:"Revisar desenho metodológico e ética",stage:"A fazer",date:""},
 {id:"t4",name:"Estruturar capítulos",stage:"A fazer",date:""}],checklist:[]},
 research:{population:"",concept:"",context:"",question:"",design:"",search:"",inclusion:"",exclusion:"",ethical:"",analysis:"",articles:[],notes:"",checklist:[]}
};
const stored=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}})();
const state={...defaults,...stored,views:{...defaults.views,...stored.views},tcc:{...defaults.tcc,...stored.tcc},research:{...defaults.research,...stored.research}};
if(!Array.isArray(state.tasks))state.tasks=[];
const $=(q,r=document)=>r.querySelector(q);
const $$=(q,r=document)=>Array.from(r.querySelectorAll(q));
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url=s=>/^https:\/\//i.test(s||"")?s:"#bibliografia";
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast("Não foi possível salvar neste navegador; verifique o armazenamento disponível.")}};
const slug=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const sem=n=>window.TO_SEMESTERS.find(s=>s.number===Number(n));
const discipline=(n,id)=>sem(n)?.subjects.find(d=>d.id===id);
const topic=(n,did,id)=>discipline(n,did)?.topics.find(t=>t.id===id);
const all=()=>window.TO_ALL;
const hrefTopic=(n,did,id)=>"#resumo/"+n+"/"+did+"/"+id;
const countRead=(n)=>window.TO_ALL.filter(x=>(!n||x.semester===Number(n))&&state.completed.includes(x.id)).length;
const badge=(text)=>'<span class="to-pill">'+escape(text)+'</span>';
const button=(title,action,extra="",cls="")=>'<button type="button" class="to-btn '+cls+'" data-action="'+escape(action)+'" '+extra+'>'+escape(title)+'</button>';
const modules=[
 {id:"resumos",title:"Resumos Prontos",icon:"✎",tag:"BIBLIOTECA POR SEMESTRE",note:"ler · compreender · relacionar",desc:"Cada semestre leva às disciplinas, assuntos e textos de estudo, com anotações e progresso."},
 {id:"flashcards",title:"Flashcards",icon:"↻",tag:"REVISÃO ATIVA",note:"perguntar · recordar · consolidar",desc:"Cartões por semestre e disciplina, com respostas ocultas e marcação de dificuldade."},
 {id:"bibliografia",title:"Bibliografia",icon:"▦",tag:"FONTES VERIFICÁVEIS",note:"pesquisar · conferir · citar",desc:"Referências institucionais e bases científicas com acesso aos documentos originais."},
 {id:"tcc",title:"Meu TCC",icon:"✧",tag:"PROJETO ACADÊMICO",note:"planejar · escrever · revisar",desc:"Temas de Terapia Ocupacional, capítulos editáveis, quadro de tarefas e cronograma."},
 {id:"pesquisa",title:"Pesquisa Acadêmica",icon:"⌕",tag:"LABORATÓRIO DE PESQUISA",note:"perguntar · buscar · analisar",desc:"Pergunta PCC, buscas, protocolo, fichamentos e matriz de evidências."},
 {id:"semestres",title:"Controle de Semestre",icon:"▤",tag:"ORGANIZAÇÃO DA GRADUAÇÃO",note:"acompanhar · cumprir · evoluir",desc:"Disciplinas, médias, calendário, Kanban, tarefas e visão de todos os períodos."}
];
const crumb=arr=>{$("#breadcrumbs").textContent=arr.join("  ›  ")};
const main=html=>{$("#app").innerHTML=html};
const sidebar=(active,title,links=[])=>'<aside class="sidebar"><div class="sidebar-kicker">MEU CADERNO DE TERAPIA OCUPACIONAL</div><div class="sidebar-title">'+escape(title)+'</div><nav class="ws-nav isolated">'+modules.map(m=>'<a class="'+(m.id===active?"active":"")+'" href="#'+m.id+'"><span>'+m.icon+'</span> '+escape(m.title)+'</a>').join("")+'<a class="home-back" href="#home">← Página inicial</a></nav>'+(links.length?'<div class="side-sections">'+links.map(x=>'<a href="'+escape(x.href)+'">'+escape(x.title)+'</a>').join("")+'</div>':"")+'</aside>';
const shell=(active,title,content,links=[])=>'<div class="page workspace">'+sidebar(active,title,links)+'<div class="workspace-main">'+content+'</div></div>';
const hero=(label,title,description,note="")=>'<header class="module-hero"><span>'+escape(label)+'</span><h1>'+escape(title)+'</h1><p>'+escape(description)+'</p>'+(note?'<div class="to-warning">'+escape(note)+'</div>':"")+'</header>';
const stats=items=>'<div class="to-stats">'+items.map(x=>'<div class="to-stat"><strong>'+escape(x[0])+'</strong><small>'+escape(x[1])+'</small></div>').join("")+'</div>';
const views=(name,options)=>'<div class="to-tabs" aria-label="Visualização">'+options.map(x=>'<button class="'+(state.views[name]===x[0]?"active":"")+'" data-action="view" data-group="'+escape(name)+'" data-value="'+escape(x[0])+'">'+escape(x[1])+'</button>').join("")+'</div>';
const card=(title,desc,link,meta="",footer="Abrir página")=>'<a class="to-card" href="'+escape(link)+'"><small>'+escape(meta)+'</small><h3>'+escape(title)+'</h3><p>'+escape(desc)+'</p><footer><span>'+escape(footer)+'</span><b>↗</b></footer></a>';
const gallery=items=>'<div class="to-gallery">'+items.join("")+'</div>';
const table=(headers,rows)=>'<div class="to-table-wrap"><table class="to-table"><thead><tr>'+headers.map(h=>'<th>'+escape(h)+'</th>').join("")+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
const trail=(items)=>'<div class="to-steps">'+items.map((v,i)=>'<a href="'+escape(v.link)+'" class="to-step"><b>'+String(i+1).padStart(2,"0")+'</b><div><h3>'+escape(v.title)+'</h3><p>'+escape(v.desc)+'</p></div><span style="margin-left:auto">→</span></a>').join("")+'</div>';
const editable=(label,path,value,rows=0,help="")=>'<label class="to-field">'+escape(label)+(rows?'<textarea data-store="'+escape(path)+'" rows="'+rows+'" placeholder="'+escape(help)+'">'+escape(value??"")+'</textarea>':'<input data-store="'+escape(path)+'" value="'+escape(value??"")+'" placeholder="'+escape(help)+'">')+'</label>';
const getPath=(path)=>path.split(".").reduce((obj,k)=>obj?.[k],state);
const setPath=(path,value)=>{const keys=path.split(".");if(keys.some(k=>!k||k==="__proto__"||k==="constructor"||k==="prototype"))return;let p=state;keys.slice(0,-1).forEach(k=>{if(typeof p[k]!=="object"||p[k]===null)p[k]={};p=p[k]});p[keys.at(-1)]=value;save()};
const citeLink=(id)=>{const s=window.TO_SOURCES.find(x=>x.id===id)||window.TO_SOURCES[0];return '<a href="'+escape(s.url)+'" target="_blank" rel="noopener noreferrer">'+escape(s.org)+': '+escape(s.title)+'</a>'};
let timeout;
function toast(m){const e=$("#toast");if(!e)return;e.textContent=m;e.hidden=false;clearTimeout(timeout);timeout=setTimeout(()=>e.hidden=true,3400)}
function home(){
crumb(["Caderno","Início"]);
const moduleCards=modules.map(m=>'<a class="module-card" href="#'+m.id+'"><div class="module-cover"><div class="module-doodle">'+m.icon+'</div><span>'+m.tag+'</span></div><div class="module-body"><small class="handwritten">'+m.note+'</small><h3>'+m.title+'</h3><p>'+m.desc+'</p><footer><span>Abrir módulo</span><b>→</b></footer></div></a>').join("");
const counts=window.TO_COUNTS;
main('<section class="page"><section class="home-hero"><span class="hero-wash wash-a"></span><span class="hero-wash wash-b"></span><span class="hero-wash wash-c"></span><span class="paper-tape"></span><div class="hero-copy"><span class="hero-kicker">CADERNO DO ESTUDANTE</span><h1><span>Terapia Ocupacional</span><em>estudar o cotidiano, compreender a participação, organizar a graduação</em></h1><p>Um espaço acadêmico para reunir fundamentos da ocupação humana, saúde, inclusão, contextos de intervenção, pesquisa científica e planejamento de toda a trajetória universitária.</p><div class="hero-tags"><span>organizado por semestre</span><span>resumos e revisão ativa</span><span>espaços editáveis</span><span>TCC e pesquisa</span></div></div><div class="hero-notes"><article class="floating-note note-pink"><small>ocupação</small><strong>O significado transforma a atividade.</strong></article><article class="floating-note note-blue"><small>participação</small><strong>Contexto também faz parte do cuidado.</strong></article><article class="floating-note note-yellow"><small>estudo</small><strong>Aprender, conectar e pesquisar.</strong></article></div></section><section class="home-intro"><div><span class="handwritten">meu caderno universitário</span><h2>Seu espaço de estudo e organização</h2><p>Bibliotecas aninhadas por semestre, cartões interativos, fontes verificáveis e ambientes de escrita. O material é um guia de estudo e não substitui estágio supervisionado, protocolos assistenciais ou a matriz oficial da sua instituição.</p></div><aside><span>UM CADERNO QUE EVOLUI</span><strong>Teoria, prática acadêmica e projetos no mesmo lugar.</strong></aside></section>'+stats([[counts.semesters,"Semestres-modelo"],[counts.disciplines,"Disciplinas organizadas"],[counts.topics,"Assuntos com resumos"],[countRead(),"Assuntos estudados"]])+'<section><header class="section-head"><div><span>BIBLIOTECAS E WORKSPACES</span><h2>Seis ambientes para a graduação</h2></div><p>escolha por onde começar</p></header><div class="module-grid">'+moduleCards+'</div></section><section class="to-section" style="margin-top:24px"><div class="to-flex"><div><span class="handwritten">continuar estudando</span><h2>Seu percurso acadêmico</h2><p>Acompanhe os conteúdos e monte seu planejamento personalizado.</p></div><a class="to-btn primary" href="#semestres">Abrir meu semestre →</a></div>'+gallery(window.TO_SEMESTERS.slice(0,3).map(s=>card(s.title,s.focus,"#periodo/"+s.number,s.subjects.length+" disciplinas","Explorar período")))+'</section><p class="to-footer-note">Matriz curricular ilustrativa: ordem, duração, disciplinas, estágios e exigências variam conforme o Projeto Pedagógico do Curso. Suas informações são salvas neste navegador, não em uma conta na nuvem. Evite inserir dados pessoais de pacientes.</p></section>');
}
const routes={home:home};
function register(name,fn){routes[name]=fn}
function render(preserve=false){
const old=window.scrollY,parts=decodeURI((location.hash||"#home").replace(/^#/,"")).split("/").filter(Boolean);
try{(routes[parts[0]]||home)(parts)}catch(error){console.error(error);main('<section class="page"><div class="to-empty">Ocorreu um erro ao abrir a página. <a href="#home">Voltar ao início</a>.</div></section>')}
if(preserve)window.scrollTo({top:old,behavior:"instant"});else window.scrollTo({top:0,behavior:"instant"});
}
const actions={view:btn=>{state.views[btn.dataset.group]=btn.dataset.value;save();render(true)}};
function onAction(name,fn){actions[name]=fn}
document.addEventListener("click",e=>{const btn=e.target.closest("[data-action]");if(!btn)return;const fn=actions[btn.dataset.action];if(fn){e.preventDefault();fn(btn,e)}});
document.addEventListener("input",e=>{const f=e.target.closest("[data-store]");if(f)setPath(f.dataset.store,f.value)});
window.addEventListener("hashchange",()=>render(false));
$("#searchBtn").addEventListener("click",()=>{location.hash="#buscar"});
register("buscar",()=>{
crumb(["Caderno","Buscar"]);
main(shell("resumos","Busca Geral",hero("BUSCA ACADÊMICA","Encontre um assunto","Pesquise títulos de assuntos, disciplinas, referências e temas de TCC.")+'<div class="to-toolbar"><input id="toSearch" class="to-filter to-search" type="search" placeholder="Ex.: ocupação, envelhecimento, brincar, método..." autofocus></div><div id="toSearchResults" class="to-stack"></div>'));
setTimeout(()=>{$("#toSearch")?.focus();runSearch()},0);
});
function runSearch(){
const q=($("#toSearch")?.value||"").toLocaleLowerCase("pt-BR").trim();
let found=[];
if(q.length>=2){
found=all().filter(t=>(t.title+" "+t.concept+" "+t.discipline).toLocaleLowerCase("pt-BR").includes(q)).slice(0,35).map(t=>card(t.title,t.concept.slice(0,150)+"…",hrefTopic(t.semester,t.disciplineId,t.id),t.semester+"º semestre · "+t.discipline));
found.push(...window.TO_SOURCES.filter(s=>(s.title+" "+s.org+" "+s.area).toLocaleLowerCase("pt-BR").includes(q)).slice(0,5).map(s=>card(s.title,s.note,"#bibliografia","Bibliografia · "+s.org)));
}
$("#toSearchResults").innerHTML=q.length<2?'<div class="to-empty">Digite ao menos duas letras para pesquisar nos conteúdos.</div>':found.length?gallery(found):'<div class="to-empty">Nenhum resultado encontrado. Tente outra palavra-chave.</div>';
}
document.addEventListener("input",e=>{if(e.target.id==="toSearch")runSearch()});
window.TO_APP={state,save,escape,url,slug,sem,discipline,topic,all,hrefTopic,countRead,badge,button,modules,crumb,main,sidebar,shell,hero,stats,views,card,gallery,table,trail,editable,citeLink,toast,register,render,onAction,setPath,getPath,$,$$};
})();