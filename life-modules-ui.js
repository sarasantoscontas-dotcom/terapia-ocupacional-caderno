/* 54 workspaces independentes: editor, quadros, matriz, leitura, etapas e planejamento. */
(()=>{"use strict";
const A=window.TO_APP,S=A.state,E=A.escape,$=A.$;
const list=window.TO_LIFE_MODULES,groups=window.TO_LIFE_CATEGORIES;
S.lifeModules=S.lifeModules||{};
const statuses=["A fazer","Em andamento","Revisão","Concluído"];
const modes=[["galeria","▦ Galeria"],["kanban","▤ Kanban"],["matriz","▦ Matriz"],["etapas","→ Etapas"],["leitura","☷ Quadro de leitura"],["planejamento","▦ Planejamento"],["tabela","☷ Tabela"],["checklist","✓ Checklist"]];
const url=id=>"#modulo/"+id;
const journeyTheme=category=>"theme-journey-"+(Math.max(0,groups.findIndex(g=>g.name===category))+1);
const journeySticker=category=>["✿","✳","✎","❋","✶","✺","✧","✦","❀"][Math.max(0,groups.findIndex(g=>g.name===category))];
const attr=x=>E(x??"");
const stamp=()=>Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,5);
function seed(m){
const tasks=[
...m.steps.map((name,i)=>({id:"task-"+i,title:name,status:i===0?"Em andamento":"A fazer",owner:"Estudante",due:"",note:"EXEMPLO DIDÁTICO — "+m.sample})),
{id:"task-final",title:"Revisar conteúdo, fontes e resultado deste módulo",status:"A fazer",owner:"Estudante",due:"",note:"Conferir a pertinência para Terapia Ocupacional e os documentos realmente consultados."}
];
const records=[
{id:"row-1",a:"Pergunta de trabalho",b:m.sample,c:"Relação com a finalidade: "+m.description,status:"Em andamento"},
{id:"row-2",a:"Referenciais relevantes",b:m.reference,c:"Confirmar publicações, versões e normas antes de citar ou aplicar.",status:"A fazer"},
{id:"row-3",a:"Critérios de acompanhamento",b:"Participação, escolha e barreiras contextuais, segundo a proposta específica.",c:"Analisar decisões com base em evidências e no contexto do projeto.",status:"A fazer"}
];
const readings=[
{id:"read-1",title:"Situação didática orientadora",detail:m.sample,reflection:"Descrever ocupação, contexto e objetivo da análise.",done:false},
{id:"read-2",title:"Referencial de aprofundamento",detail:m.reference,reflection:"Conferir edição, autoria, pertinência e limites do documento primário.",done:false},
{id:"read-3",title:"Discussão crítica para a aula",detail:"Como a questão se relaciona com participação ocupacional, autonomia, acessibilidade e direitos?",reflection:"Evitar extrapolar conclusões a partir de situações ou fontes não verificadas.",done:false}
];
return {
view:m.view,objective:m.description,context:"EXEMPLO ACADÊMICO — "+m.sample,
reference:m.reference,critical:"O que ainda precisa ser investigado? Distinguir fatos, hipóteses e decisões. Evitar informações pessoais identificáveis.",
actions:"Etapas sugeridas: "+m.steps.join("; ")+".",feedback:"Exemplo: discutir com professor ou supervisor e atualizar depois da devolutiva.",
tasks,records,readings,checks:m.steps.concat("Conferir fonte primária e integridade acadêmica","Registrar reflexão e próximo passo").map((title,i)=>({id:"ck-"+i,title,done:false})),
milestones:[
{id:"milestone-1",title:m.steps[0],date:"",status:"Em andamento",note:"Preparação e levantamento inicial."},
{id:"milestone-2",title:m.steps[1],date:"",status:"A fazer",note:"Registros e análise da atividade."},
{id:"milestone-3",title:m.steps[2],date:"",status:"A fazer",note:"Revisar evidências, critérios e entrega."}
],
days:["Segunda","Terça","Quarta","Quinta","Sexta","Sábado"].map((day,i)=>({day,task:i===0?m.steps[0]:i===2?m.steps[1]:i===4?m.steps[2]:"Definir estudo e revisão conforme a rotina",time:"",note:"Ajustar à carga horária real da instituição."}))
};
}
const data=m=>S.lifeModules[m.id]||(S.lifeModules[m.id]=seed(m));
const e=(label,value,path,rows=3)=>'<label class="to-field">'+E(label)+'<textarea class="to-input" rows="'+rows+'" data-life-field="'+E(path)+'">'+attr(value)+'</textarea></label>';
const input=(label,val,action,id,index,key,type="text")=>'<label class="to-field">'+E(label)+'<input type="'+type+'" class="to-input" value="'+attr(val)+'" data-life-'+action+'="'+E(id)+'" data-index="'+index+'" data-key="'+E(key)+'"></label>';
const btn=(label,action,id,idx=null,variant="")=>A.button(label,action,'data-mid="'+E(id)+'"'+(idx!==null?' data-index="'+idx+'"':""),variant);
const select=(options,value,field,id,index)=>'<select class="to-filter" data-life-'+field+'="'+E(id)+'" data-index="'+index+'">'+options.map(x=>'<option value="'+E(x)+'" '+(value===x?"selected":"")+'>'+E(x)+'</option>').join("")+'</select>';
const nav=(m)=>'<aside class="sidebar life-sidebar"><div class="sidebar-kicker">TERAPIA OCUPACIONAL · CADERNO INDIVIDUAL</div><div class="sidebar-title">'+E(m.name)+'</div><nav class="ws-nav isolated"><span class="to-nav-label">ESTE MÓDULO</span><a class="active" href="'+url(m.id)+'">✦ '+E(m.name)+'</a><span class="to-nav-label">MEU ESPAÇO DE TRABALHO</span><button type="button" data-action="lifeJump" data-target="life-plan">✎ Plano e fundamentos</button><button type="button" data-action="lifeJump" data-target="life-deep">✦ Ateliê de aprofundamento</button><button type="button" data-action="lifeJump" data-target="life-views">▦ Quadros de organização</button><span class="to-nav-label">NAVEGAÇÃO EXTERNA</span><a href="#explorar">← Biblioteca completa</a><a href="#home">⌂ Página inicial</a></nav></aside>';
const shell=(m,content)=>'<div class="page workspace '+journeyTheme(m.category)+'">'+nav(m)+'<div class="workspace-main">'+content+'</div></div>';
const block=(title,caption,content)=>'<section class="to-section"><h2>'+E(title)+'</h2>'+(caption?'<p>'+E(caption)+'</p>':"")+content+'</section>';
const grid=(items)=>'<div class="to-gallery life-gallery">'+items.join("")+'</div>';
const card=(m)=>'<a class="to-card life-card '+journeyTheme(m.category)+'" href="'+url(m.id)+'"><span class="texture-sticker" aria-hidden="true">'+journeySticker(m.category)+'</span><small>'+E(m.category)+' · '+m.view.toUpperCase()+'</small><h3>'+E(m.name)+'</h3><p>'+E(m.description)+'</p><footer><span>Abrir ambiente</span><b>↗</b></footer></a>';
function catalog(embedded=false){
const blocks=groups.map(g=>{const members=list.filter(m=>m.category===g.name);return '<section class="life-category '+journeyTheme(g.name)+'" data-life-category="'+E(g.name.toLocaleLowerCase("pt-BR"))+'"><header class="section-head"><div><span>CADERNO DE TERAPIA OCUPACIONAL</span><h2>'+E(g.name)+'</h2></div><p>Ferramentas específicas desta área</p></header>'+grid(members.map(card))+'</section>'}).join("");
return (embedded?'<section class="life-catalog-embed">':'<section class="page life-catalog">')+'<div class="to-flex" style="margin-bottom:18px"><div><span class="handwritten">minha jornada acadêmica e profissional</span><h2>Outros ambientes do Caderno</h2><p>Espaços de estudo, estágio, pesquisa, pós-graduação, carreira e projetos sociais organizados por área. Cada ambiente possui registros e visualizações próprias.</p></div>'+(embedded?'<a class="to-btn primary" href="#explorar">Ver biblioteca completa →</a>':'<a class="to-btn" href="#home">← Início</a>')+'</div>'+
'<div class="to-toolbar"><input id="lifeSearch" class="to-filter to-search" placeholder="Buscar estágio, pesquisa, profissão, trabalho, TCC ou carreira..." aria-label="Buscar ambientes"></div><div class="life-category-list">'+blocks+'</div>'+(window.TO_NEXT_MODULES?window.TO_NEXT_MODULES.catalogSections():"")+'</section>';
}
function homeCatalog(){return catalog(true)}
function listPage(){A.crumb(["Caderno","Outros Ambientes"]);A.main(catalog(false))}
function overview(m,v){
return block("Meu plano e fundamentação","Exemplo de Terapia Ocupacional já preenchido e editável. Registre suas próprias informações, sem prontuários ou dados identificáveis.",
'<div class="to-grid2">'+
e("Objetivo do ambiente",v.objective,"lifeModules."+m.id+".objective",3)+
e("Contexto e situação de estudo",v.context,"lifeModules."+m.id+".context",5)+
e("Referenciais e literatura a conferir",v.reference,"lifeModules."+m.id+".reference",3)+
e("Critérios, limites e raciocínio crítico",v.critical,"lifeModules."+m.id+".critical",4)+
e("Planejamento da aplicação",v.actions,"lifeModules."+m.id+".actions",3)+
e("Feedback de docente ou supervisor",v.feedback,"lifeModules."+m.id+".feedback",3)+
'</div>');
}
function kanban(m,v){
return block("Quadro de andamento","Altere as etapas e acompanhe atividades em movimento. Registros de exemplo podem ser modificados.",
'<div class="to-kanban life-kanban">'+statuses.map(status=>'<div class="to-column"><h3>'+E(status)+'</h3>'+v.tasks.map((t,i)=>t.status===status?'<article class="to-task"><textarea rows="2" class="to-input" data-life-task="name" data-mid="'+m.id+'" data-index="'+i+'">'+E(t.title)+'</textarea><p class="to-muted">'+E(t.note)+'</p>'+select(statuses,t.status,"taskstatus",m.id,i)+'<label class="to-field">Responsável<input class="to-input" value="'+E(t.owner)+'" data-life-task="owner" data-mid="'+m.id+'" data-index="'+i+'"></label><label class="to-field">Prazo<input type="date" class="to-input" value="'+E(t.due)+'" data-life-task="due" data-mid="'+m.id+'" data-index="'+i+'"></label>'+btn("Excluir","lifeRemoveTask",m.id,i)+'</article>':"").join("")+'</div>').join("")+'</div>'+
'<div class="to-actions">'+btn("+ Nova tarefa","lifeAddTask",m.id,null,"primary")+'</div>');
}
function matrix(m,v){
return block("Matriz de análise e evidências","Compare questões, dados realmente consultados, conceitos e limitações. Exemplos não são resultados de pesquisa.",
'<div class="to-table-wrap"><table class="to-table life-table"><thead><tr>'+m.labels.map(x=>'<th>'+E(x)+'</th>').join("")+'<th>Andamento</th><th></th></tr></thead><tbody>'+v.records.map((r,i)=>'<tr>'+["a","b","c"].map((key,j)=>'<td><textarea class="to-input" rows="4" data-life-record="'+m.id+'" data-index="'+i+'" data-key="'+key+'">'+E(r[key])+'</textarea></td>').join("")+'<td>'+select(statuses,r.status,"recordstatus",m.id,i)+'</td><td>'+btn("×","lifeRemoveRow",m.id,i)+'</td></tr>').join("")+'</tbody></table></div><div class="to-actions">'+btn("+ Linha da matriz","lifeAddRow",m.id,null,"primary")+'</div>');
}
function steps(m,v){
return block("Etapas e linha do tempo","Organize marcos, prazos, responsáveis e decisões do seu projeto.",
'<div class="to-timeline life-timeline">'+v.milestones.map((r,i)=>'<article><div class="to-grid2">'+input("Etapa",r.title,"stage",m.id,i,"title")+input("Prazo",r.date,"stage",m.id,i,"date","date")+'</div><div class="to-flex">'+select(statuses,r.status,"stagestatus",m.id,i)+btn("Excluir","lifeRemoveStage",m.id,i)+'</div>'+e("Registro de decisão",r.note,"lifeModules."+m.id+".milestones."+i+".note",2)+'</article>').join("")+'</div><div class="to-actions">'+btn("+ Nova etapa","lifeAddStage",m.id,null,"primary")+'</div>');
}
function reader(m,v){
return block("Quadro de leituras e fichamentos","Registre perguntas, fontes, conceitos e suas interpretações. Confira os textos originais antes de citá-los.",
grid(v.readings.map((r,i)=>'<article class="to-card life-reader-card"><small>FICHA DE ESTUDO</small>'+input("Nome da ficha",r.title,"reading",m.id,i,"title")+e("Conteúdo de leitura",r.detail,"lifeModules."+m.id+".readings."+i+".detail",5)+e("Interpretação e questões",r.reflection,"lifeModules."+m.id+".readings."+i+".reflection",4)+'<div class="to-flex"><label class="to-check"><input type="checkbox" data-life-readdone="'+m.id+'" data-index="'+i+'" '+(r.done?"checked":"")+'>Ficha estudada</label>'+btn("Excluir ficha","lifeRemoveReading",m.id,i)+'</div></article>'))+
'<div class="to-actions">'+btn("+ Criar fichamento","lifeAddReading",m.id,null,"primary")+'</div>');
}
function schedule(m,v){
return block("Agenda e rotina de estudo","Personalize dias, temas, horários e anotações. Os valores iniciais são sugestões, não eventos reais.",
'<div class="life-week">'+v.days.map((day,i)=>'<div class="life-week-cell"><strong>'+day.day+'</strong>'+e("Minha atividade",day.task,"lifeModules."+m.id+".days."+i+".task",3)+
input("Horário ou prazo",day.time,"daytime",m.id,i,"time")+e("Recursos e observações",day.note,"lifeModules."+m.id+".days."+i+".note",3)+'</div>').join("")+'</div>');
}
function check(m,v){
return block("Checklist de acompanhamento","Marque apenas etapas realmente concluídas; é possível adicionar ações específicas.",
'<div class="to-stack">'+v.checks.map((x,i)=>'<div class="to-flex life-check-row"><label class="to-check" style="flex:1"><input type="checkbox" data-life-ck="'+m.id+'" data-index="'+i+'" '+(x.done?"checked":"")+'><input class="to-input" data-life-checkname="'+m.id+'" data-index="'+i+'" value="'+E(x.title)+'"></label>'+btn("×","lifeRemoveCheck",m.id,i)+'</div>').join("")+'</div><div class="to-actions">'+btn("+ Nova verificação","lifeAddCheck",m.id,null,"primary")+'</div>');
}
function visual(m,v){
return block("Galeria de registros e produtos","Abra cada ficha para visualizar e editar aspectos do trabalho acadêmico.",
grid(v.records.map((r,i)=>'<article class="to-card life-display-card"><small>PRODUTO DE ESTUDO</small><h3>'+E(r.a||"Nova ficha")+'</h3><p>'+E(r.b)+'</p><details class="to-disclosure" open><summary>Conteúdo e critérios</summary>'+e("Título da ficha",r.a,"lifeModules."+m.id+".records."+i+".a",2)+e("Descrição e evidências",r.b,"lifeModules."+m.id+".records."+i+".b",4)+e("Análise e aplicação",r.c,"lifeModules."+m.id+".records."+i+".c",4)+'</details>'+select(statuses,r.status,"recordstatus",m.id,i)+'</article>'))+'<div class="to-actions">'+btn("+ Nova ficha","lifeAddRow",m.id,null,"primary")+'</div>');
}
function tabular(m,v){
return block("Banco de informações e decisões","Alterne esta base com matriz ou quadro para acompanhar a mesma informação em diferentes formatos.",'<div class="to-table-wrap"><table class="to-table"><thead><tr><th>Documento ou ação</th><th>Contexto</th><th>Decisão</th><th>Situação</th></tr></thead><tbody>'+v.records.map((r,i)=>'<tr>'+["a","b","c"].map(key=>'<td><textarea class="to-input" rows="4" data-life-record="'+m.id+'" data-index="'+i+'" data-key="'+key+'">'+E(r[key])+'</textarea></td>').join("")+'<td>'+select(statuses,r.status,"recordstatus",m.id,i)+'</td></tr>').join("")+'</tbody></table></div><div class="to-actions">'+btn("+ Registro","lifeAddRow",m.id)+'</div>');
}
function view(m,v){
return {galeria:visual,kanban,matriz:matrix,etapas:steps,leitura:reader,planejamento:schedule,tabela:tabular,checklist:check}[v.view]?.(m,v)||matrix(m,v);
}
function exportModule(id){
 const m=list.find(x=>x.id===id);if(!m)return;
 const content=JSON.stringify({module:m.name,category:m.category,exported_at:new Date().toISOString(),study_data:data(m)},null,2);
 try{const blob=new Blob([content],{type:"application/json"}),src=URL.createObjectURL(blob),a=document.createElement("a");a.href=src;a.download="terapia-ocupacional-"+id+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(src),1500)}
 catch(err){A.toast("A exportação não está disponível neste navegador.")}
}
function page(parts){
const m=list.find(x=>x.id===parts[1]);if(!m){location.hash="#explorar";return}
const v=data(m);
A.crumb(["Caderno",m.category,m.name]);
const tabs='<div class="to-tabs life-tabs" aria-label="Formas de organizar este ambiente">'+modes.map(([key,label])=>'<button class="'+(v.view===key?"active":"")+'" data-action="lifeView" data-mid="'+m.id+'" data-mode="'+key+'">'+label+'</button>').join("")+'</div>';
const content='<div class="to-actions"><a class="to-btn" href="#explorar">← Biblioteca de ambientes</a>'+btn("Exportar meus dados","lifeExport",m.id)+btn("Imprimir","lifePrint",m.id)+'</div>'+
A.hero(m.category.toUpperCase(),m.name,m.description,"Situação inicial exclusivamente didática. Os registros pessoais são salvos neste navegador; não insira dados de pacientes e não trate exemplos como fatos pesquisados.")+
'<div class="to-meta"><span class="to-pill">Ambiente de Terapia Ocupacional</span><span class="to-pill">Visualizações editáveis</span><span class="to-pill">Conteúdo específico</span></div>'+
'<div id="life-plan" class="life-anchor">'+overview(m,v)+'</div>'+
'<div id="life-deep" class="life-anchor">'+(window.TO_LIFE_DEEP?window.TO_LIFE_DEEP.render(m):"")+'</div>'+
'<div id="life-views" class="life-anchor">'+
block("Meu modo de organização","Escolha galeria, Kanban, matriz, etapas, leitura, agenda, tabela ou checklist. Todas as visualizações editam os mesmos registros deste módulo.",tabs+view(m,v))+'</div>'+
'<details class="to-disclosure life-references" open><summary>Referenciais a verificar e integridade dos registros</summary><p>'+E(m.reference)+'</p><p>Consulte edições vigentes e os documentos originais antes de fazer citações. Os exemplos são cenários de estudo e não resultados empíricos, condutas para pacientes ou exigências oficiais do curso.</p></details>';
A.main(shell(m,content));
}
function go(action,fn){A.onAction(action,b=>{const m=list.find(x=>x.id===b.dataset.mid);if(m){const v=data(m);fn(v,b,m);A.save();A.render(true)}})}
A.onAction("lifeJump",b=>{const target=document.getElementById(b.dataset.target);if(target&&typeof target.scrollIntoView==="function")target.scrollIntoView({behavior:"smooth",block:"start"});});
go("lifeView",(v,b)=>{if(modes.some(x=>x[0]===b.dataset.mode))v.view=b.dataset.mode});
go("lifeAddTask",(v)=>v.tasks.push({id:stamp(),title:"Nova atividade de "+v.view,status:"A fazer",owner:"Estudante",due:"",note:"Descreva o objetivo, responsabilidades e materiais."}));
go("lifeRemoveTask",(v,b)=>v.tasks.splice(Number(b.dataset.index),1));
go("lifeAddRow",(v)=>v.records.push({id:stamp(),a:"Nova informação",b:"Descrição ou fonte a conferir",c:"Critério, decisão ou análise",status:"A fazer"}));
go("lifeRemoveRow",(v,b)=>v.records.splice(Number(b.dataset.index),1));
go("lifeAddStage",(v)=>v.milestones.push({id:stamp(),title:"Nova etapa",date:"",status:"A fazer",note:"Descrever ação, prazo e resultado esperado."}));
go("lifeRemoveStage",(v,b)=>v.milestones.splice(Number(b.dataset.index),1));
go("lifeAddReading",(v)=>v.readings.push({id:stamp(),title:"Novo fichamento",detail:"Fonte ou situação a ser verificada",reflection:"Minha interpretação e limitações",done:false}));
go("lifeRemoveReading",(v,b)=>v.readings.splice(Number(b.dataset.index),1));
go("lifeAddCheck",(v)=>v.checks.push({id:stamp(),title:"Nova ação a conferir",done:false}));
go("lifeRemoveCheck",(v,b)=>v.checks.splice(Number(b.dataset.index),1));
go("lifeExport",(v,b)=>exportModule(b.dataset.mid));
go("lifePrint",()=>window.print());
document.addEventListener("input",e=>{
const dataset=e.target.dataset;
if(dataset.lifeField){A.setPath(dataset.lifeField,e.target.value);return}
if(dataset.lifeTask){const v=S.lifeModules[dataset.mid],row=v?.tasks[Number(dataset.index)];if(row){row[dataset.lifeTask==="name"?"title":dataset.lifeTask]=e.target.value;A.save()}return}
if(dataset.lifeRecord){const row=S.lifeModules[dataset.lifeRecord]?.records[Number(dataset.index)];if(row){row[dataset.key]=e.target.value;A.save()}return}
if(dataset.lifeStage){const row=S.lifeModules[dataset.lifeStage]?.milestones[Number(dataset.index)];if(row){row[dataset.key]=e.target.value;A.save()}return}
if(dataset.lifeReading){const row=S.lifeModules[dataset.lifeReading]?.readings[Number(dataset.index)];if(row){row[dataset.key]=e.target.value;A.save()}return}
if(dataset.lifeDaytime){const row=S.lifeModules[dataset.lifeDaytime]?.days[Number(dataset.index)];if(row){row.time=e.target.value;A.save()}return}
if(dataset.lifeCheckname){const row=S.lifeModules[dataset.lifeCheckname]?.checks[Number(dataset.index)];if(row){row.title=e.target.value;A.save()}return}
if(e.target.id==="lifeSearch"){const q=e.target.value.trim().toLocaleLowerCase("pt-BR");document.querySelectorAll(".life-card").forEach(card=>{const match=card.textContent.toLocaleLowerCase("pt-BR").includes(q);card.hidden=!match});document.querySelectorAll(".life-category").forEach(c=>{c.hidden=[...c.querySelectorAll(".life-card")].every(x=>x.hidden)});document.querySelectorAll(".new40-card").forEach(card=>{card.hidden=!card.textContent.toLocaleLowerCase("pt-BR").includes(q)});document.querySelectorAll(".new40-category").forEach(c=>{c.hidden=[...c.querySelectorAll(".new40-card")].every(x=>x.hidden)});}
});
document.addEventListener("change",e=>{
const d=e.target.dataset;
const mutation=[["lifeTaskstatus","tasks","status"],["lifeRecordstatus","records","status"],["lifeStagestatus","milestones","status"],["lifeReaddone","readings","done"],["lifeCk","checks","done"]];
for(const [key,collection,field] of mutation){if(d[key]){const row=S.lifeModules[d[key]]?.[collection]?.[Number(d.index)];if(row){row[field]=field==="done"?e.target.checked:e.target.value;A.save();if(field==="status")A.render(true)}return}}
});
A.register("explorar",listPage);
A.register("modulo",page);
window.TO_NEW_MODULES={homeCatalog,catalog,page,modules:list,categories:groups};
})();