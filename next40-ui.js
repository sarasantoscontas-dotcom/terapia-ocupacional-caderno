/* 40 workspaces inéditos e totalmente isolados, com ferramentas independentes. */
(()=>{
"use strict";
const A=window.TO_APP, S=A.state, E=A.escape;
const list=window.TO_NEXT_MODULES_DATA||[],cats=window.TO_NEXT_CATEGORIES||[];
S.next40=S.next40&&typeof S.next40==="object"?S.next40:{};
const stages=["A fazer","Em andamento","Em revisão","Concluído"];
const modes=[["painel","✦ Meu painel"],["kanban","▤ Quadro Kanban"],["matriz","▦ Matriz de decisões"],["linha","↗ Linha do tempo"],["notas","☷ Cartões e fichas"]];
const safe=s=>E(String(s??""));
const selected=m=>cats.find(c=>c.id===m.group)||cats[0];
const url=m=>"#novo/"+m.id;
const htmlBtn=(label,action,m,extra="")=>'<button type="button" class="to-btn '+(action==="new40AddTask"||action==="new40AddRecord"||action==="new40AddNote"?"primary":"")+'" data-action="'+action+'" data-n40-id="'+safe(m.id)+'" '+extra+'>'+safe(label)+'</button>';
const input=(m,name,kind,index,field,value,rows=0)=>{
 const ds=' data-n40-id="'+safe(m.id)+'" data-n40-group="'+safe(kind)+'" data-n40-index="'+index+'" data-n40-field="'+safe(field)+'"';
 return '<label class="new40-field"><span>'+safe(name)+'</span>'+(rows?
 '<textarea class="to-input" rows="'+rows+'"'+ds+'>'+safe(value)+'</textarea>':
 '<input class="to-input"'+ds+' value="'+safe(value)+'">')+'</label>';
};
const select=(m,group,index,field,current,values=stages)=>{
 return '<select class="to-filter" data-n40-id="'+safe(m.id)+'" data-n40-group="'+group+'" data-n40-index="'+index+'" data-n40-field="'+field+'">'+values.map(v=>'<option value="'+safe(v)+'" '+(v===current?"selected":"")+'>'+safe(v)+'</option>').join("")+'</select>';
};
const seed=m=>({
 view:"painel",
 fields:m.fields.map(f=>({label:f.label,text:f.value})),
 target:m.goal,
 scenario:m.scenario,
 deliverable:m.deliverable,
 question:"Que informações observáveis e que fontes oficiais ajudam a avaliar "+m.name.toLowerCase()+" sem extrapolar conclusões?",
 reflection:"Situação simulada: "+m.scenario+" Próximo passo: "+m.steps[0]+".",
 resources:"Fonte de aprofundamento a conferir: "+m.reference,
 steps:m.steps.map((title,i)=>({id:"etapa-"+i,title,owner:"Estudante / profissional",date:"",status:i===0?"Em andamento":"A fazer",note:i===0?m.goal:"Ajustar à instituição, ao contexto e à finalidade do módulo."})),
 records:m.dimensions.map((label,i)=>({id:"registro-"+i,aspect:label,source:m.fields[i]?.value||m.scenario,analysis:(i===0?m.goal:i===1?m.deliverable:i===2?m.caution:m.reference),status:i===0?"Em andamento":"A fazer"})),
 notes:[
 {id:"nota-0",title:"Ponto de partida",body:m.scenario,color:"lemon"},
 {id:"nota-1",title:"Critério e fundamento",body:m.fields[0].value,color:"lilac"},
 {id:"nota-2",title:"Entrega deste ambiente",body:m.deliverable,color:"mint"}
 ],
 checks:m.steps.concat(["Verificar fontes, competência, ética e limites antes de aplicar","Revisar aprendizagem e registrar próxima decisão"]).map((label,i)=>({id:"ck-"+i,label,done:false}))
});
const get=m=>{
 const found=S.next40[m.id];
 if(found&&typeof found==="object"&&Array.isArray(found.steps))return found;
 return S.next40[m.id]=seed(m);
};
const card=m=>{
 const c=selected(m);
 return '<a class="new40-card new40-theme-'+safe(c.id)+'" href="'+url(m)+'" data-new40-card="'+safe(m.id)+'">'+
 '<div class="new40-card-ornaments" aria-hidden="true"><span>'+safe(c.emoji)+'</span><i></i></div>'+
 '<small>'+safe(c.name)+'</small><h3>'+safe(m.name)+'</h3><p>'+safe(m.description)+'</p>'+
 '<footer><span>Abrir ferramenta exclusiva</span><b aria-hidden="true">↗</b></footer></a>';
};
const categories=()=>cats.map(c=>{
 const members=list.filter(m=>m.group===c.id);
 return '<section class="new40-category new40-theme-'+safe(c.id)+'" data-new40-group="'+safe(c.id)+'"><div class="new40-category-heading">'+
 '<div><span class="new40-overline">MAIS POSSIBILIDADES PARA MINHA JORNADA</span><h2>'+safe(c.name)+'</h2></div>'+
 '<div class="new40-category-mark" aria-hidden="true">'+safe(c.emoji)+'</div></div><div class="new40-gallery">'+members.map(card).join("")+'</div></section>';
}).join("");
function catalogSections(){return '<div class="new40-library">'+
 '<header class="new40-library-header"><span class="new40-overline">NOVA COLEÇÃO · CADERNO EM EXPANSÃO</span>'+
 '<h2>Laboratórios de vida acadêmica e profissional</h2>'+
 '<p>Ferramentas adicionais completas e individuais para a faculdade, TCC, pesquisa, estágios, rotina e carreira profissional em Terapia Ocupacional.</p>'+
 '<a class="to-btn primary" href="#novos">Explorar a nova coleção →</a></header>'+categories()+'</div>';}
function catalogPage(){
 A.crumb(["Caderno","Novos laboratórios"]);
 A.main('<section class="page new40-collection">'+
 '<a class="to-btn" href="#home">← Voltar ao Caderno</a>'+
 '<div class="new40-collection-hero"><span class="new40-overline">TERAPIA OCUPACIONAL · DA UNIVERSIDADE À CARREIRA</span>'+
 '<h1>Meus novos laboratórios</h1><p>Abra cada ambiente como um caderno próprio, com conteúdo preenchido, campos editáveis e organização independente.</p>'+
 '<input id="new40Search" type="search" class="to-filter" placeholder="Buscar formação, trabalho, pesquisa, serviço ou ferramenta..." aria-label="Buscar novos módulos"></div>'+
 catalogSections()+'</section>');
}
const nav=m=>'<aside class="sidebar new40-sidebar"><div class="sidebar-kicker">MEU CADERNO · AMBIENTE INDEPENDENTE</div>'+
 '<div class="sidebar-title">'+safe(m.name)+'</div><nav class="ws-nav isolated"><span class="to-nav-label">APENAS ESTE AMBIENTE</span>'+
 '<a href="'+url(m)+'" class="active">✦ '+safe(m.name)+'</a>'+
 '<span class="to-nav-label">IR PARA UM PAINEL DESTE MÓDULO</span>'+
 '<button type="button" data-action="new40Jump" data-target="n40-fields">✎ Campos preenchidos</button>'+
 '<button type="button" data-action="new40Jump" data-target="n40-work">▦ Minhas ferramentas</button>'+
 '<button type="button" data-action="new40Jump" data-target="n40-check">✓ Verificações e reflexão</button>'+
 '<span class="to-nav-label">SAIR DESTE AMBIENTE</span><a href="#novos">← Todos os novos módulos</a><a href="#home">⌂ Início do Caderno</a></nav></aside>';
const section=(title,text,content,id="")=>'<section class="to-section new40-section" '+(id?'id="'+id+'"':'')+'><div class="new40-section-title"><div><h2>'+safe(title)+'</h2><p>'+safe(text)+'</p></div><span aria-hidden="true">✳</span></div>'+content+'</section>';
const progress=d=>{const n=d.checks.filter(c=>c.done).length,p=d.steps.filter(c=>c.status==="Concluído").length;
 return '<div class="new40-progress-stats"><div><b>'+p+' / '+d.steps.length+'</b><span>Etapas realizadas</span></div><div><b>'+n+' / '+d.checks.length+'</b><span>Verificações concluídas</span></div><div><b>'+d.records.length+'</b><span>Registros da matriz</span></div></div>'};
function fields(m,d){
 const all=d.fields.map((f,i)=>input(m,f.label,"fields",i,"text",f.text,4)).join("");
 return section("Minha ficha de trabalho","Campos exclusivos de "+m.name+", preenchidos com exemplos pertinentes ao assunto. Você pode escrever em todos.",
 '<div class="new40-field-grid">'+all+'</div>'+
 '<div class="new40-feature-grid">'+
 input(m,"Objetivo a desenvolver","root",0,"target",d.target,4)+
 input(m,"Situação de estudo ou trabalho","root",0,"scenario",d.scenario,4)+
 input(m,"Produto esperado","root",0,"deliverable",d.deliverable,4)+
 input(m,"Pergunta crítica deste módulo","root",0,"question",d.question,4)+
 input(m,"Fontes e documentos para conferência","root",0,"resources",d.resources,4)+
 '</div>',"n40-fields");
}
function kanban(m,d){return '<div class="new40-kanban">'+stages.map((status,i)=>
 '<section class="new40-kanban-column new40-k-'+i+'"><h3>'+safe(status)+'</h3><div class="new40-kanban-cards">'+
 d.steps.map((t,j)=>t.status===status?'<article class="new40-ticket"><label>Atividade'+
 input(m,"","steps",j,"title",t.title,2)+'</label><p>'+safe(t.note)+'</p>'+
 '<label>Andamento'+select(m,"steps",j,"status",t.status)+'</label>'+
 htmlBtn("Excluir etapa","new40DeleteTask",m,'data-n40-index="'+j+'"')+'</article>':"").join("")+'</div></section>').join("")+'</div>'+
 '<div class="to-actions">'+htmlBtn("+ Nova atividade","new40AddTask",m)+'</div>';}
function matrix(m,d){return '<div class="to-table-wrap"><table class="to-table new40-matrix"><thead><tr><th>Critério ou dimensão</th><th>Informação / exemplo</th><th>Decisão e interpretação</th><th>Situação</th><th></th></tr></thead><tbody>'+
 d.records.map((r,i)=>'<tr><td>'+input(m,"","records",i,"aspect",r.aspect,3)+'</td>'+
 '<td>'+input(m,"","records",i,"source",r.source,4)+'</td>'+
 '<td>'+input(m,"","records",i,"analysis",r.analysis,4)+'</td>'+
 '<td>'+select(m,"records",i,"status",r.status)+'</td>'+
 '<td>'+htmlBtn("×","new40DeleteRecord",m,'data-n40-index="'+i+'"')+'</td></tr>').join("")+'</tbody></table></div>'+
 '<div class="to-actions">'+htmlBtn("+ Nova linha de análise","new40AddRecord",m)+'</div>';}
function timeline(m,d){return '<div class="new40-timeline">'+d.steps.map((t,i)=>
 '<article class="new40-milestone"><span class="new40-milestone-no">'+String(i+1).padStart(2,"0")+'</span>'+
 '<div>'+input(m,"Etapa","steps",i,"title",t.title,2)+
 '<div class="new40-inline-fields">'+input(m,"Responsável","steps",i,"owner",t.owner)+
 '<label class="new40-field"><span>Prazo que você definir</span><input type="date" class="to-input" data-n40-id="'+m.id+'" data-n40-group="steps" data-n40-index="'+i+'" data-n40-field="date" value="'+safe(t.date)+'"></label></div>'+
 input(m,"Orientação para a etapa","steps",i,"note",t.note,3)+
 select(m,"steps",i,"status",t.status)+htmlBtn("Excluir","new40DeleteTask",m,'data-n40-index="'+i+'"')+
 '</div></article>').join("")+'</div>'+
 '<div class="to-actions">'+htmlBtn("+ Nova etapa","new40AddTask",m)+'</div>';}
function notes(m,d){return '<div class="new40-notes">'+d.notes.map((n,i)=>
 '<article class="new40-paper new40-paper-'+i%6+'"><div class="new40-paper-tape" aria-hidden="true"></div>'+
 input(m,"Título","notes",i,"title",n.title)+input(m,"Anotação específica","notes",i,"body",n.body,5)+
 '<label class="new40-field"><span>Cor deste cartão</span>'+select(m,"notes",i,"color",n.color,["lemon","lilac","mint","rose","sky","peach"])+'</label>'+
 htmlBtn("Excluir anotação","new40DeleteNote",m,'data-n40-index="'+i+'"')+'</article>').join("")+'</div>'+
 '<div class="to-actions">'+htmlBtn("+ Novo cartão","new40AddNote",m)+'</div>';}
function dashboard(m,d){return '<div class="new40-dashboard">'+
 '<article class="new40-spotlight"><span>PERGUNTA ORIENTADORA</span><h3>'+safe(d.question)+'</h3><p>'+safe(d.target)+'</p></article>'+
 '<article class="new40-brief"><span>EXEMPLO FICTÍCIO</span><p>'+safe(d.scenario)+'</p></article>'+
 '<article class="new40-brief"><span>ENTREGA DESSE MÓDULO</span><p>'+safe(d.deliverable)+'</p></article>'+
 '<article class="new40-brief"><span>ATENÇÃO PROFISSIONAL</span><p>'+safe(m.caution)+'</p></article>'+
 '</div>'+kanban(m,d);}
function check(m,d){return section("Revisão, responsabilidades e diário",
 "Conferências do próprio módulo; exemplos não são dados clínicos nem substituem avaliação, orientação ou normas oficiais.",
 '<div class="new40-check-grid">'+d.checks.map((c,i)=>
 '<label class="new40-check"><input type="checkbox" data-n40-check="'+m.id+'" data-n40-index="'+i+'" '+(c.done?"checked":"")+'><span>'+safe(c.label)+'</span></label>').join("")+'</div>'+
 '<div class="new40-journal">'+input(m,"Meu diário de decisões e reflexões","root",0,"reflection",d.reflection,6)+'</div>'+
 '<details class="to-disclosure new40-caution" open><summary>Fontes, responsabilidade e limites éticos</summary>'+
 '<p><b>Fonte a verificar:</b> '+safe(m.reference)+'</p><p><b>Cuidados essenciais:</b> '+safe(m.caution)+'</p>'+
 '<p>Esta é uma ferramenta de planejamento educacional com exemplos fictícios. Não cadastre informações identificáveis de pacientes, participantes ou equipes. Para exercício profissional, confirme requisitos do CREFITO regional e normas institucionais vigentes.</p></details>',"n40-check");}
function modulePage(parts){
 const m=list.find(x=>x.id===parts[1]);
 if(!m){location.hash="#novos";return}
 const c=selected(m),d=get(m);
 A.crumb(["Caderno",c.name,m.name]);
 const tabs='<div class="to-tabs new40-tabs" aria-label="Organizações independentes do módulo">'+modes.map(([key,label])=>
 '<button type="button" data-action="new40Mode" data-n40-id="'+m.id+'" data-n40-mode="'+key+'" class="'+(d.view===key?"active":"")+'">'+label+'</button>').join("")+'</div>';
 const active=d.view==="kanban"?kanban(m,d):d.view==="matriz"?matrix(m,d):d.view==="linha"?timeline(m,d):d.view==="notas"?notes(m,d):dashboard(m,d);
 const body='<div class="new40-workspace-tools"><a href="#novos" class="to-btn">← Novos módulos</a>'+
 htmlBtn("Exportar este caderno","new40Export",m)+htmlBtn("Imprimir","new40Print",m)+'</div>'+
 '<header class="new40-module-hero"><div class="new40-hero-stamp" aria-hidden="true">'+safe(c.emoji)+'</div>'+
 '<span class="new40-overline">'+safe(c.name)+'</span><h1>'+safe(m.name)+'</h1><p>'+safe(m.description)+'</p>'+
 '<div class="new40-hero-tags"><span>Ferramenta independente</span><span>Exemplos preenchidos</span><span>Registros editáveis</span></div></header>'+
 progress(d)+
 '<div class="new40-page-content">'+fields(m,d)+
 '<div class="new40-anchor" id="n40-work">'+section("Minha bancada de ferramentas",
 "Alterne entre painel, Kanban, matriz, cronograma e fichas. Cada visualização utiliza somente dados deste ambiente.",
 tabs+active)+'</div>'+check(m,d)+'</div>';
 A.main('<div class="page workspace new40-workspace new40-theme-'+safe(c.id)+'">'+nav(m)+'<main class="workspace-main">'+body+'</main></div>');
}
const changeField=(e)=>{
 const d=e.target.dataset,m=list.find(x=>x.id===d.n40Id);if(!m)return;
 const v=get(m),group=d.n40Group,index=Number(d.n40Index),key=d.n40Field;
 if(group==="root"&&["target","scenario","deliverable","question","reflection","resources"].includes(key)){v[key]=e.target.value;A.save();return}
 if(group==="fields"&&key==="text"&&v.fields[index]){v.fields[index].text=e.target.value;A.save();return}
 if(["steps","records","notes"].includes(group)&&v[group][index]&&Object.prototype.hasOwnProperty.call(v[group][index],key)){
 v[group][index][key]=e.target.value;A.save();
 }
};
document.addEventListener("input",changeField);
document.addEventListener("change",e=>{
 const d=e.target.dataset;
 if(d.n40Id){changeField(e);if(d.n40Field==="status"||d.n40Field==="color")A.render(true)}
 if(d.n40Check){const v=S.next40[d.n40Check]?.checks?.[Number(d.n40Index)];if(v){v.done=e.target.checked;A.save()}}
});
A.onAction("new40Mode",b=>{const m=list.find(x=>x.id===b.dataset.n40Id);if(!m||!modes.some(v=>v[0]===b.dataset.n40Mode))return;get(m).view=b.dataset.n40Mode;A.save();A.render(true)});
const action=(key,fn)=>A.onAction(key,b=>{const m=list.find(x=>x.id===b.dataset.n40Id);if(!m)return;fn(get(m),m,b);A.save();A.render(true)});
action("new40AddTask",(v,m)=>v.steps.push({id:"task-"+Date.now(),title:"Nova etapa de "+m.name,owner:"Estudante / profissional",date:"",status:"A fazer",note:"Descrever objetivo, critério e recurso de maneira contextualizada."}));
action("new40DeleteTask",(v,m,b)=>v.steps.splice(Number(b.dataset.n40Index),1));
action("new40AddRecord",(v,m)=>v.records.push({id:"record-"+Date.now(),aspect:"Novo critério de "+m.name,source:"Informação ou evidência a conferir",analysis:"Interpretação e decisão a justificar",status:"A fazer"}));
action("new40DeleteRecord",(v,m,b)=>v.records.splice(Number(b.dataset.n40Index),1));
action("new40AddNote",(v,m)=>v.notes.push({id:"note-"+Date.now(),title:"Minha ideia sobre "+m.name,body:"Registrar observação, fonte e próximo passo sem dados pessoais de terceiros.",color:"peach"}));
action("new40DeleteNote",(v,m,b)=>v.notes.splice(Number(b.dataset.n40Index),1));
A.onAction("new40Jump",b=>{const node=document.getElementById(b.dataset.target);if(node&&node.scrollIntoView)node.scrollIntoView({behavior:"smooth",block:"start"})});
A.onAction("new40Print",()=>{if(typeof window.print==="function")window.print()});
A.onAction("new40Export",b=>{
 const m=list.find(x=>x.id===b.dataset.n40Id);if(!m)return;
 try{
 const payload=JSON.stringify({module:m.name,id:m.id,category:m.category,exportedAt:new Date().toISOString(),data:get(m)},null,2);
 const blob=new Blob([payload],{type:"application/json;charset=utf-8"});
 const handle=URL.createObjectURL(blob),link=document.createElement("a");
 link.href=handle;link.download="caderno-to-"+m.id+".json";link.click();
 setTimeout(()=>URL.revokeObjectURL(handle),1000);
 }catch(e){if(A.toast)A.toast("Não foi possível exportar neste navegador.")}
});
document.addEventListener("input",e=>{
 if(e.target.id!=="new40Search")return;
 const q=String(e.target.value||"").trim().toLocaleLowerCase("pt-BR");
 document.querySelectorAll(".new40-collection [data-new40-card]").forEach(el=>{el.hidden=!el.textContent.toLocaleLowerCase("pt-BR").includes(q)});
 document.querySelectorAll(".new40-collection [data-new40-group]").forEach(el=>{
 el.hidden=[...el.querySelectorAll("[data-new40-card]")].every(x=>x.hidden);
 });
});
A.register("novos",catalogPage);
A.register("novo",modulePage);
window.TO_NEXT_MODULES={list,categories:cats,catalogSections,catalogPage,modulePage,get};
})();