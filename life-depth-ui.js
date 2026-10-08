/* ATELIÊ INTERATIVO — expansão preservando os módulos originais e isolando estado por ID. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
const profiles=window.TO_LIFE_DEPTH_DATA||{};
S.lifeDeep=S.lifeDeep||{};
const statuses=["Ideia","Pesquisar","Desenvolver","Revisar","Concluído"];
const priority=["Prioridade alta","Prioridade média","Para aprofundar"];
const esc=(x)=>E(x??"");
const defaults=(m,p)=>({
 insight:p.insight,
 scenario:p.exercise,
 artifact:p.deliverable,
 analysis:"Distinguir observação, hipótese e interpretação: "+p.insight+" Registre contextos e participação de maneira ética.",
 literature:"Referenciais a conferir antes de citar: "+m.reference,
 feedback:"Discussão a fazer com docente, supervisor ou grupo: quais limites e escolhas mudam a decisão neste cenário?",
 question:"Minha pergunta investigável: "+p.checkpoint[0],
 quality:"Critério de qualidade: critérios observáveis, fontes efetivamente conferidas e objetivos coerentes com Terapia Ocupacional.",
 notes:[
  {id:"n1",title:"Ideia para investigar",body:p.exercise,kind:"Pesquisar",priority:"Prioridade alta"},
  {id:"n2",title:"Conexão teórica",body:p.insight,kind:"Ideia",priority:"Prioridade média"},
  {id:"n3",title:"Produto possível",body:p.deliverable,kind:"Desenvolver",priority:"Para aprofundar"}
 ],
 evidence:[
  {id:"ev1",question:m.steps[0],source:m.reference,interpretation:p.insight,confidence:"Fonte a verificar"},
  {id:"ev2",question:m.steps[1],source:"Exercício fictício — não é evidência empírica",interpretation:p.exercise,confidence:"Hipótese didática"}
 ],
 checks:[...m.steps,...p.checkpoint,"Conferir contexto, privacidade e possíveis impactos na participação"].map((title,i)=>({id:"ck"+i,title,checked:false})),
 planner:[
  {id:"p1",title:m.steps[0],time:"",owner:"Estudante",status:"Em andamento"},
  {id:"p2",title:m.steps[1],time:"",owner:"Estudante",status:"A fazer"},
  {id:"p3",title:m.steps[2],time:"",owner:"Estudante",status:"A fazer"}
 ],
 diary:"Aprendizado inicial — "+p.insight+" Esta anotação é apenas um exemplo, não um relato de prática realizada."
});
const ensure=m=>S.lifeDeep[m.id]||(S.lifeDeep[m.id]=defaults(m,profiles[m.id]));
const textfield=(m,key,label,value,rows=4)=>'<label class="to-field"><span>'+E(label)+'</span><textarea class="to-input" rows="'+rows+'" data-deep-path="lifeDeep.'+m.id+'.'+key+'">'+esc(value)+'</textarea></label>';
const tag=(label)=>'<span class="deep-sticker">'+E(label)+'</span>';
const divider=(title,hint,body,cls="")=>'<section class="to-section deep-chapter '+cls+'"><div class="deep-heading"><div><span class="deep-handwritten">meu ateliê acadêmico</span><h2>'+E(title)+'</h2><p>'+E(hint)+'</p></div><span class="deep-spark" aria-hidden="true">✳</span></div>'+body+'</section>';
const button=(label,action,id,index)=>A.button(label,action,'data-deep-mid="'+E(id)+'"'+(index===undefined?'':' data-deep-index="'+index+'"'));
const dropdown=(values,val,mid,index,key)=>'<select class="to-filter" data-deep-select="'+E(mid)+'" data-index="'+index+'" data-key="'+key+'">'+values.map(v=>'<option value="'+E(v)+'" '+(v===val?"selected":"")+'>'+E(v)+'</option>').join("")+'</select>';
const rowInput=(mid,index,key,value,coll,rows=0)=>rows?
 '<textarea class="to-input" rows="'+rows+'" data-deep-list="'+E(mid)+'" data-list="'+coll+'" data-index="'+index+'" data-key="'+E(key)+'">'+E(value||"")+'</textarea>':
 '<input class="to-input" value="'+E(value||"")+'" data-deep-list="'+E(mid)+'" data-list="'+coll+'" data-index="'+index+'" data-key="'+E(key)+'">';
function render(m){
 const p=profiles[m.id];if(!p)return '';
 const d=ensure(m);
 const intro=divider("Conteúdo aprofundado de "+m.name,
  "Roteiro autoral específico deste ambiente: exemplos prontos, campos para editar e decisões contextualizadas.",
  '<div class="deep-feature"><div class="deep-feature-badge">SITUAÇÃO DIDÁTICA</div><p>'+E(p.exercise)+'</p><small>Exemplo acadêmico fictício. Adapte à sua formação e nunca insira dados identificáveis.</small></div>'+
  '<div class="deep-edit-grid">'+
  textfield(m,"insight","Fundamentação e critérios",d.insight,4)+
  textfield(m,"scenario","Análise da situação prática",d.scenario,5)+
  textfield(m,"artifact","Produto acadêmico / entrega esperada",d.artifact,4)+
  textfield(m,"analysis","Hipóteses e raciocínio ocupacional",d.analysis,4)+
  textfield(m,"literature","Fontes, normas e referenciais a verificar",d.literature,4)+
  textfield(m,"feedback","Dúvidas e retorno de orientação",d.feedback,4)+
  textfield(m,"question","Pergunta investigável",d.question,3)+
  textfield(m,"quality","Critérios de qualidade e impacto",d.quality,3)+
  '</div>',"deep-intro");
 const notes=divider("Mural criativo de ideias",
  "Post-its coloridos e editáveis, com status e prioridade. Cada anotação fica apenas neste módulo.",
  '<div class="deep-postits">'+d.notes.map((n,i)=>
   '<article class="deep-postit deep-postit-'+(i%6)+'"><div class="deep-tape" aria-hidden="true"></div>'+
   '<label class="to-field">Título'+rowInput(m.id,i,"title",n.title,"notes")+'</label>'+
   '<label class="to-field">Minha ideia'+rowInput(m.id,i,"body",n.body,"notes",5)+'</label>'+
   '<div class="deep-select-row">'+dropdown(statuses,n.kind,m.id,i,"notes.kind")+dropdown(priority,n.priority,m.id,i,"notes.priority")+'</div>'+
   button("Excluir anotação","deepRemoveNote",m.id,i)+'</article>').join("")+'</div>'+
  '<div class="to-actions">'+button("+ Novo post-it","deepAddNote",m.id)+'</div>',"deep-notes");
 const ev=divider("Matriz de evidências e decisões",
  "Separe o que é informação conferida, hipótese ou exemplo. A matriz cresce conforme seu estudo.",
  '<div class="to-table-wrap"><table class="to-table deep-evidence-table"><thead><tr><th>Aspecto ou pergunta</th><th>Fonte / observação</th><th>Interpretação para TO</th><th>Natureza</th><th></th></tr></thead><tbody>'+
  d.evidence.map((v,i)=>'<tr><td>'+rowInput(m.id,i,"question",v.question,"evidence",4)+'</td><td>'+rowInput(m.id,i,"source",v.source,"evidence",4)+'</td><td>'+rowInput(m.id,i,"interpretation",v.interpretation,"evidence",4)+'</td><td>'+dropdown(["Fonte a verificar","Fonte consultada","Hipótese didática","Análise em elaboração"],v.confidence,m.id,i,"evidence.confidence")+'</td><td>'+button("×","deepRemoveEvidence",m.id,i)+'</td></tr>').join("")+'</tbody></table></div>'+
  '<div class="to-actions">'+button("+ Nova evidência / hipótese","deepAddEvidence",m.id)+'</div>',"deep-evidence");
 const plan=divider("Mapa de execução e autonomia",
  "Planeje o que produzir, quando revisar e qual apoio será necessário. Os prazos iniciais são livres.",
  '<div class="deep-plan-grid">'+d.planner.map((r,i)=>'<article class="deep-plan-card"><div class="deep-plan-index">'+["IDEIA","AÇÃO","REVISÃO"][i%3]+'</div>'+
  '<label class="to-field">Etapa'+rowInput(m.id,i,"title",r.title,"planner",3)+'</label>'+
  '<div class="to-grid2"><label class="to-field">Data<input type="date" class="to-input" data-deep-list="'+m.id+'" data-list="planner" data-index="'+i+'" data-key="time" value="'+E(r.time)+'"></label><label class="to-field">Responsável'+rowInput(m.id,i,"owner",r.owner,"planner")+'</label></div>'+
  dropdown(["A fazer","Em andamento","Revisão","Concluído"],r.status,m.id,i,"planner.status")+
  button("Excluir etapa","deepRemovePlan",m.id,i)+'</article>').join("")+'</div>'+
  '<div class="to-actions">'+button("+ Planejar etapa","deepAddPlan",m.id)+'</div>',"deep-plan");
 const review=divider("Oficina de revisão crítica",
  "Checklist personalizado deste assunto, acompanhado de diário reflexivo e espaço para registrar a aprendizagem.",
  '<div class="deep-check-grid">'+d.checks.map((v,i)=>'<label class="deep-check-item"><input type="checkbox" data-deep-check="'+m.id+'" data-index="'+i+'" '+(v.checked?"checked":"")+'><span>'+E(v.title)+'</span></label>').join("")+'</div>'+
  '<div class="deep-reflection">'+textfield(m,"diary","Meu diário de aprendizagem, limitações e próximos passos",d.diary,6)+'</div>',"deep-review");
 return '<div class="life-deep-enhanced" data-deep-owner="'+E(m.id)+'">'+intro+notes+ev+plan+review+'</div>';
}
const onAction=(name,field,newRow)=>{
 A.onAction(name,b=>{const m=window.TO_LIFE_MODULES.find(x=>x.id===b.dataset.deepMid);if(!m)return;ensure(m)[field].push(newRow(m));A.save();A.render(true)})
};
const onDelete=(name,field)=>{
 A.onAction(name,b=>{const m=window.TO_LIFE_MODULES.find(x=>x.id===b.dataset.deepMid);if(!m)return;const idx=Number(b.dataset.deepIndex);if(!Number.isInteger(idx)||idx<0)return;ensure(m)[field].splice(idx,1);A.save();A.render(true)})
};
onAction("deepAddNote","notes",m=>({id:"new-"+Date.now(),title:"Ideia de "+m.name,body:"Descreva uma questão relevante para a atividade e sua relação com a participação ocupacional.",kind:"Ideia",priority:"Para aprofundar"}));
onDelete("deepRemoveNote","notes");
onAction("deepAddEvidence","evidence",m=>({id:"new-"+Date.now(),question:"Questão sobre "+m.name,source:"Informar fonte e edição realmente consultadas",interpretation:"Desenvolver análise compatível com os dados",confidence:"Fonte a verificar"}));
onDelete("deepRemoveEvidence","evidence");
onAction("deepAddPlan","planner",m=>({id:"new-"+Date.now(),title:"Nova ação de "+m.name,time:"",owner:"Estudante",status:"A fazer"}));
onDelete("deepRemovePlan","planner");
document.addEventListener("input",e=>{
const d=e.target.dataset;
if(d.deepPath){A.setPath(d.deepPath,e.target.value);return}
if(d.deepList){const row=S.lifeDeep?.[d.deepList]?.[d.list]?.[Number(d.index)];if(row&&Object.prototype.hasOwnProperty.call(row,d.key)){row[d.key]=e.target.value;A.save()}return}
});
document.addEventListener("change",e=>{
const d=e.target.dataset;
if(d.deepSelect){
 const [list,key]=d.key.split(".");
 const row=S.lifeDeep?.[d.deepSelect]?.[list]?.[Number(d.index)];
 if(row&&Object.prototype.hasOwnProperty.call(row,key)){row[key]=e.target.value;A.save()}
}
if(d.deepCheck){const v=S.lifeDeep?.[d.deepCheck]?.checks?.[Number(d.index)];if(v){v.checked=e.target.checked;A.save()}}
});
window.TO_LIFE_DEEP={render,profiles,ensure};
})();