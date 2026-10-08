/* Meu TCC: Kanban profissional com passos pré-preenchidos e packs específicos de Terapia Ocupacional. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
const data=window.TO_TCC_KANBAN_DATA;
if(!data||!Array.isArray(data.base))return;
const stages=["A fazer","Em andamento","Em revisão","Concluído","Pausado"];
const priorities=["Alta","Média","Baixa"];
S.tccKanbanPlus=S.tccKanbanPlus||{mode:"kanban",track:"Todos os assuntos",priority:"Todas",query:"",collapse:false};
const prefs=()=>S.tccKanbanPlus;
const esc=x=>E(String(x??""));
const groupFor=t=>t.category||"Etapas personalizadas";
const clean=t=>{if(!stages.includes(t.stage))t.stage="A fazer";if(!priorities.includes(t.priority))t.priority="Média";};
function fromTemplate(row){
 return {id:row.id,name:row.title,stage:"A fazer",date:"",category:row.category,description:row.description,deliverable:row.deliverable,
 caution:row.caution,priority:row.priority||"Média",owner:"Estudante de Terapia Ocupacional",reference:"Conferir com orientador e bibliografia realmente consultada.",
 notes:"Ajustar à pergunta de pesquisa, ao método adotado e ao cronograma real do curso.",
 checks:(row.checklist||[]).map(label=>({label,done:false})),createdFrom:"TCC de Terapia Ocupacional — modelo editável",estimated:"A definir"};
}
function ensure(){
 if(!S.tcc||!Array.isArray(S.tcc.tasks))return [];
 if(!S.tccKanbanPlusSeeded){
  const ids=new Set(S.tcc.tasks.map(t=>t.id));
  data.base.forEach(t=>{if(!ids.has(t.id))S.tcc.tasks.push(fromTemplate(t))});
  S.tccKanbanPlusSeeded=true;A.save();
 }
 return S.tcc.tasks;
}
const button=(label,action,attrs="")=>'<button type="button" class="to-btn" data-action="'+action+'" '+attrs+'>'+esc(label)+'</button>';
const select=(t,field,values)=>'<select class="to-filter" data-tcc-pro-id="'+esc(t.id)+'" data-tcc-pro-field="'+field+'" aria-label="'+(field==="stage"?"Andamento":field==="priority"?"Prioridade":"Escolha")+'">'+values.map(s=>'<option value="'+esc(s)+'" '+(t[field]===s?"selected":"")+'>'+esc(s)+'</option>').join("")+'</select>';
const field=(t,label,prop,rows=0)=>{
 const d=' data-tcc-pro-id="'+esc(t.id)+'" data-tcc-pro-field="'+prop+'"';
 return '<label class="tccpro-field"><span>'+esc(label)+'</span>'+(rows?
  '<textarea class="to-input" rows="'+rows+'"'+d+'>'+esc(t[prop]||"")+'</textarea>':
  '<input class="to-input"'+d+' value="'+esc(t[prop]||"")+'">')+'</label>';
};
const tags=t=>'<span class="tccpro-priority tccpro-priority-'+esc((t.priority||"Média").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""))+'">'+esc(t.priority||"Média")+'</span>';
const card=t=>{
 clean(t);
 const index=S.tcc.tasks.findIndex(x=>x.id===t.id);
 return '<article class="tccpro-card" data-tcc-pro-item="'+esc(t.id)+'" data-tcc-pro-search="'+esc((t.name+" "+(t.category||"")+" "+(t.description||"")).toLowerCase())+'">'+
 '<div class="tccpro-card-head"><span class="tccpro-no">✧ '+String(index+1).padStart(2,"0")+'</span>'+tags(t)+'</div>'+
 '<h4>'+esc(t.name)+'</h4><span class="tccpro-category">'+esc(groupFor(t))+'</span>'+
 (t.description?'<p>'+esc(t.description)+'</p>':"")+
 '<div class="tccpro-card-row">'+
 '<label><small>Situação</small>'+select(t,"stage",stages)+'</label>'+
 '<label><small>Prioridade</small>'+select(t,"priority",priorities)+'</label></div>'+
 '<details class="tccpro-details"><summary>✎ Abrir ficha completa deste cartão</summary>'+
 '<div class="tccpro-details-body">'+
 field(t,"Nome da etapa","name",2)+
 field(t,"Objetivo e finalidade","description",3)+
 field(t,"Entrega esperada e critério","deliverable",4)+
 field(t,"Responsável","owner")+
 field(t,"Referências a consultar","reference",3)+
 field(t,"Riscos e limites","caution",3)+
 field(t,"Anotações e feedback do orientador","notes",4)+
 '<label class="tccpro-field"><span>Prazo definido pelo estudante</span><input class="to-input" type="date" data-tcc-pro-id="'+esc(t.id)+'" data-tcc-pro-field="date" value="'+esc(t.date||"")+'"></label>'+
 '<label class="tccpro-field"><span>Estimativa de dedicação</span><input class="to-input" data-tcc-pro-id="'+esc(t.id)+'" data-tcc-pro-field="estimated" value="'+esc(t.estimated||"")+'"></label>'+
 '<div class="tccpro-checklist">'+(t.checks||[]).map((check,i)=>'<label class="tccpro-check"><input type="checkbox" data-tcc-pro-check="'+esc(t.id)+'" data-tcc-pro-check-index="'+i+'" '+(check.done?"checked":"")+'><span>'+esc(check.label)+'</span></label>').join("")+'</div>'+
 '<div class="tccpro-actions">'+button("Duplicar cartão","tccProDuplicate",'data-tcc-pro-id="'+esc(t.id)+'"')+
 button("Excluir cartão","deleteTccTask",'data-id="'+esc(t.id)+'"')+'</div>'+
 '</div></details>'+
 '</article>';
};
function toolbar(tasks){
 const pref=prefs(),categories=["Todos os assuntos",...new Set(tasks.map(groupFor))];
 return '<div class="tccpro-toolbar"><div class="tccpro-toolbar-top">'+
 '<div class="tccpro-stats"><span><b>'+tasks.length+'</b> etapas prontas e pessoais</span>'+
 '<span><b>'+tasks.filter(x=>x.stage==="Concluído").length+'</b> concluídas</span>'+
 '<span><b>'+tasks.filter(x=>x.stage==="Em revisão").length+'</b> em revisão</span></div>'+
 '<div class="tccpro-actions">'+button("Adicionar cartão autoral","tccProAdd")+
 button("Exportar plano","tccProExport")+'</div></div>'+
 '<div class="tccpro-mode-tabs">'+[["kanban","▤ Kanban completo"],["lista","☷ Lista detalhada"],["linha","↗ Cronograma"],["biblioteca","✿ Tarefas temáticas"]].map(([key,label])=>
 button(label,"tccProMode",'data-tcc-pro-mode="'+key+'" '+(pref.mode===key?'aria-current="true"':""))).join("")+'</div>'+
 '<div class="tccpro-filter-bar"><label>Assunto<select id="tccProTrack" class="to-filter" data-tcc-pro-filter="track">'+categories.map(x=>'<option value="'+esc(x)+'" '+(pref.track===x?"selected":"")+'>'+esc(x)+'</option>').join("")+'</select></label>'+
 '<label>Prioridade<select class="to-filter" data-tcc-pro-filter="priority">'+["Todas",...priorities].map(x=>'<option '+(pref.priority===x?"selected":"")+'>'+esc(x)+'</option>').join("")+'</select></label>'+
 '<label>Buscar<input type="search" class="to-filter" data-tcc-pro-query="1" placeholder="Pesquisar etapa, tema ou entrega" value="'+esc(pref.query)+'"></label>'+
 '</div></div>';
}
function filtered(tasks){
 const p=prefs(),q=(p.query||"").trim().toLocaleLowerCase("pt-BR");
 return tasks.filter(t=>(p.track==="Todos os assuntos"||groupFor(t)===p.track)&&
 (p.priority==="Todas"||t.priority===p.priority)&&
 (!q||(t.name+" "+groupFor(t)+" "+(t.description||"")+" "+(t.deliverable||"")).toLocaleLowerCase("pt-BR").includes(q)));
}
function kanban(tasks){
 const subset=filtered(tasks);
 return '<div class="tccpro-board">'+stages.map((stage,i)=>'<section class="tccpro-col tccpro-col-'+i+'"><h3>'+esc(stage)+' <span>'+subset.filter(x=>x.stage===stage).length+'</span></h3>'+
 '<div class="tccpro-cards">'+subset.filter(x=>x.stage===stage).map(card).join("")+
 (!subset.some(x=>x.stage===stage)?'<p class="tccpro-empty">Nenhuma etapa neste filtro.</p>':"")+'</div></section>').join("")+'</div>';
}
function list(tasks){
 const subset=filtered(tasks);
 return '<div class="tccpro-list">'+subset.map(t=>'<article class="tccpro-listitem">'+card(t)+'</article>').join("")+'</div>';
}
function timeline(tasks){
 const subset=filtered(tasks),withDate=subset.filter(x=>x.date),noDate=subset.filter(x=>!x.date);
 return '<div class="tccpro-timeline">'+(withDate.length?
 withDate.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(t=>'<article><strong>'+esc(t.date)+'</strong>'+card(t)+'</article>').join(""):"")+
 (noDate.length?'<h3>Sem prazo definido</h3>'+noDate.map(t=>'<article><strong>A definir</strong>'+card(t)+'</article>').join(""):"")+'</div>';
}
function templates(tasks){
 const grouped=data.packs.map(name=>{
 const matches=data.templates.filter(x=>x.category===name);
 const active=matches.filter(x=>tasks.some(t=>t.id===x.id)).length;
 return '<article class="tccpro-pack"><div class="tccpro-pack-head"><span>✿ TEMA DE TERAPIA OCUPACIONAL</span><h3>'+esc(name)+'</h3>'+
 '<p>'+matches.length+' tarefas acadêmicas sugeridas · '+active+' incluídas</p></div>'+
 '<div class="tccpro-pack-actions">'+button("Adicionar pacote completo","tccProPack",'data-tcc-pro-pack="'+esc(name)+'"')+'</div>'+
 matches.map(row=>'<div class="tccpro-pack-task"><div><b>'+esc(row.title)+'</b><p>'+esc(row.deliverable)+'</p></div>'+
 (tasks.some(t=>t.id===row.id)?'<span class="to-pill">Já incluída</span>':button("+ Adicionar","tccProTemplate",'data-tcc-pro-template="'+row.id+'"'))+'</div>').join("")+'</article>';
 }).join("");
 return '<p class="tccpro-info">Modelos opcionais para linhas de investigação em Terapia Ocupacional. Não são projetos reais ou resultados concluídos.</p>'+
 '<div class="tccpro-pack-grid">'+grouped+'</div>';
}
function render(){
 const tasks=ensure();
 tasks.forEach(clean);
 const p=prefs();
 if(!["kanban","lista","linha","biblioteca"].includes(p.mode))p.mode="kanban";
 return '<section class="to-section tccpro-section" id="tcc-pro-kanban">'+
 '<div class="tccpro-heading"><div><span class="tccpro-overline">MEU TCC · TERAPIA OCUPACIONAL</span>'+
 '<h2>Kanban de pesquisa e escrita</h2><p>Etapas específicas e já preparadas para organizar seu TCC do tema à defesa. Edite cartões, prioridades, critérios, objetivos, fontes e prazos sem perder suas tarefas anteriores.</p></div>'+
 '<span class="tccpro-spark" aria-hidden="true">✿</span></div>'+
 '<div class="tccpro-progress"><span style="width:'+Math.round(100*tasks.filter(t=>t.stage==="Concluído").length/Math.max(1,tasks.length))+'%"></span></div>'+
 toolbar(tasks)+
 (p.mode==="lista"?list(tasks):p.mode==="linha"?timeline(tasks):p.mode==="biblioteca"?templates(tasks):kanban(tasks))+
 '<p class="to-footer-note">Etapas são modelos de planejamento, não demonstram coleta ou achados reais. Verifique requisitos de pesquisa, ética, normas do curso e orientações do orientador. Não cadastre dados identificáveis de pessoas.</p></section>';
}
A.onAction("tccProMode",button=>{prefs().mode=button.dataset.tccProMode||"kanban";A.save();A.render(true)});
A.onAction("tccProAdd",()=>{
 const t={id:"tcc-personal-"+Date.now(),name:"Nova etapa autoral de Terapia Ocupacional",stage:"A fazer",category:"Etapas personalizadas",priority:"Média",date:"",owner:"Estudante",description:"Descrever a pergunta ou decisão específica do TCC.",deliverable:"Entregável a definir com orientação.",caution:"Conferir bibliografia, autorização e limites.",reference:"Fonte a verificar",notes:"Minha próxima ação",estimated:"A definir",checks:[{label:"Definir tarefa",done:false},{label:"Conferir fonte",done:false},{label:"Revisar com orientação",done:false}]};
 ensure().push(t);A.save();A.render(true);
});
A.onAction("tccProDuplicate",button=>{
 const old=ensure().find(t=>t.id===button.dataset.tccProId);if(!old)return;
 const copy=JSON.parse(JSON.stringify(old));copy.id="tcc-dup-"+Date.now();copy.name=old.name+" · cópia";copy.stage="A fazer";
 copy.checks=(copy.checks||[]).map(c=>({...c,done:false}));ensure().push(copy);A.save();A.render(true);
});
A.onAction("tccProTemplate",button=>{
 const row=data.templates.find(x=>x.id===button.dataset.tccProTemplate);if(!row)return;
 if(ensure().some(t=>t.id===row.id)){A.toast("Esta tarefa já foi incluída.");return}
 S.tcc.tasks.push(fromTemplate(row));A.save();A.render(true);
});
A.onAction("tccProPack",button=>{
 const list=data.templates.filter(x=>x.category===button.dataset.tccProPack),existing=new Set(ensure().map(x=>x.id));
 const fresh=list.filter(x=>!existing.has(x.id)).map(fromTemplate);
 if(!fresh.length){A.toast("Todas as tarefas deste pacote já estão no seu quadro.");return}
 S.tcc.tasks.push(...fresh);A.save();A.render(true);A.toast("Pacote temático adicionado ao TCC.");
});
A.onAction("tccProExport",()=>{
 try{
 const dataOut=JSON.stringify({type:"Meu TCC",data:S.tcc,exportedAt:new Date().toISOString()},null,2);
 const file=new Blob([dataOut],{type:"application/json;charset=utf-8"}),url=URL.createObjectURL(file),a=document.createElement("a");
 a.href=url;a.download="caderno-to-meu-tcc-kanban.json";a.click();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
 }catch(_){A.toast("Exportação indisponível neste navegador.")}
});
document.addEventListener("input",event=>{
 const d=event.target.dataset;
 if(d.tccProQuery){prefs().query=event.target.value;
  const val=prefs().query.trim().toLocaleLowerCase("pt-BR");document.querySelectorAll(".tccpro-card").forEach(el=>{el.hidden=!!val&&!el.dataset.tccProSearch.toLocaleLowerCase("pt-BR").includes(val)});
  return;
 }
 const row=ensure().find(x=>x.id===d.tccProId);
 if(row&&d.tccProField&&["name","description","deliverable","owner","reference","caution","notes","date","estimated"].includes(d.tccProField)){
  row[d.tccProField]=event.target.value;A.save();
 }
});
document.addEventListener("change",event=>{
 const d=event.target.dataset;
 if(d.tccProFilter){const key=d.tccProFilter;if(["track","priority"].includes(key)){prefs()[key]=event.target.value;A.save();A.render(true)}return}
 if(d.tccProCheck){
  const row=ensure().find(x=>x.id===d.tccProCheck),check=row?.checks?.[Number(d.tccProCheckIndex)];
  if(check){check.done=event.target.checked;A.save()}return;
 }
 if(d.tccProId&&["stage","priority","date"].includes(d.tccProField)){
  const row=ensure().find(x=>x.id===d.tccProId);
  if(!row)return;
  row[d.tccProField]=event.target.value;A.save();if(d.tccProField!=="date")A.render(true);
 }
});
window.TO_TCC_KANBAN_PRO={render,ensure,fromTemplate,stages,tracks:data.tracks,templateCount:data.templates.length};
})();