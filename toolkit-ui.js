/* Ferramentas editáveis e independentes para elaboração de TCC e pesquisa, sem dados clínicos reais. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
const all=(area)=>area==="tcc"?window.TO_TCC_TOOLS:window.TO_RESEARCH_TOOLS;
const route=(area,id)=>"#ferramenta-"+area+"/"+id;
const ids={tcc:"Meu TCC",pesquisa:"Pesquisa Acadêmica"};
S.academicTools=S.academicTools||{};
const defaultItem=tool=>({
 title:tool.title,objective:"",context:"",evidence:"",reflection:"",next:"",owner:"",deadline:"",
 checked:tool.checks.map(text=>({text,done:false})),
 rows:[{a:"",b:"",c:"",status:"A fazer"}],
 timeline:[{date:"",title:"",status:"A fazer"}],
 notes:"",status:"A fazer"
});
const item=tool=>{S.academicTools[tool.id]=S.academicTools[tool.id]||defaultItem(tool);return S.academicTools[tool.id]};
const eattr=s=>E(s);
const field=(id,key,label,placeholder,rows=0,value="")=>'<label class="to-field">'+E(label)+(rows?'<textarea rows="'+rows+'" data-tool-field="'+E(id)+'" data-key="'+E(key)+'" placeholder="'+E(placeholder)+'">'+E(value)+'</textarea>':'<input type="text" data-tool-field="'+E(id)+'" data-key="'+E(key)+'" placeholder="'+E(placeholder)+'" value="'+eattr(value)+'">')+'</label>';
const columns={matrix:["Aspecto ou critério","Evidência / registro","Interpretação e decisão"],timeline:["Etapa","Data prevista","Acompanhamento"],checklist:["Ação","Critério de conclusão","Observações"],kanban:["Atividade","Responsável ou prazo","Encaminhamento"],planner:["Compromisso","Quando","Preparação"],editor:["Seção","Texto ou argumento","Fonte / verificação"]};
const button=(text,action,id)=>'<button type="button" class="to-btn" data-tool-action="'+action+'" data-tool-id="'+E(id)+'">'+E(text)+'</button>';
const statusSelect=(value,id,i,context="row")=>'<select class="to-filter" data-tool-status="'+E(id)+'" data-index="'+i+'" data-context="'+context+'">'+["A fazer","Em andamento","Concluído"].map(s=>'<option value="'+s+'" '+(value===s?"selected":"")+'>'+s+'</option>').join("")+'</select>';
const library=area=>{
const list=all(area);let groups=[...new Set(list.map(x=>x.category))];
return '<section class="to-section to-toolkit"><div class="to-flex"><div><span class="handwritten">ambientes de trabalho</span><h2>Ferramentas de '+E(ids[area])+'</h2><p>Abra o recurso de que precisa. Cada ferramenta tem orientação própria, campos, organização e histórico de edição local.</p></div><span class="to-pill">Ferramentas independentes</span></div><div class="to-toolbar"><input class="to-filter to-search" data-tool-filter="'+area+'" placeholder="Buscar ferramenta pelo nome, área ou finalidade..."></div><div class="to-tool-groups">'+groups.map((category,i)=>'<details class="to-disclosure" '+(i===0?"open":"")+' data-tool-group="'+area+'"><summary>'+E(category)+'</summary><div class="to-gallery" style="margin-top:14px">'+list.filter(t=>t.category===category).map(t=>'<a class="to-card to-tool-item" data-tool-index="'+E((t.title+" "+t.desc+" "+t.category).toLowerCase())+'" href="'+route(area,t.id)+'"><small>'+E(t.kind.toUpperCase())+' · '+E(t.category)+'</small><h3>'+E(t.title)+'</h3><p>'+E(t.desc)+'</p><footer><span>Abrir minha ferramenta</span><b>→</b></footer></a>').join("")+'</div></details>').join("")+'</div></section>';
};
function toolPage(area,id){
const t=all(area).find(x=>x.id===id);if(!t){location.hash="#"+area;return}
const x=item(t),base=area;
A.crumb(["Caderno",ids[area],"Ferramentas",t.title]);
const title=A.hero(E(t.category).toUpperCase(),t.title,t.desc,"Use dados acadêmicos ou situações inteiramente fictícias. Documentos e evidências exigem fontes reais, verificação e regras éticas da instituição.");
const saveInfo='<div class="to-meta"><span class="to-pill">Salvo neste navegador</span><span class="to-pill">'+E(t.kind.toUpperCase())+'</span></div>';
const fields='<div class="to-grid2">'+field(t.id,"objective","Objetivo desta ferramenta","Qual decisão, produto ou pergunta será trabalhada?",3,x.objective)+field(t.id,"context","Contexto acadêmico / recorte","Curso, disciplina, pesquisa, população ou cenário fictício.",3,x.context)+'</div><div class="to-grid2" style="margin-top:12px">'+field(t.id,"evidence","Base teórica e registros verificáveis","Autores, normas, conceitos ou dados agregados conferidos.",5,x.evidence)+field(t.id,"reflection","Análise crítica e aplicação em Terapia Ocupacional","Interprete critérios, barreiras e alternativas com justificativa.",5,x.reflection)+'</div><div class="to-grid2" style="margin-top:12px">'+field(t.id,"next","Próximas decisões / encaminhamentos","O que necessita de revisão, fonte ou consulta?",3,x.next)+field(t.id,"notes","Anotações livres de estudo","Dúvidas de sala, feedback, observações e revisão.",3,x.notes)+'</div>';
const labels=columns[t.kind]||columns.editor;
const table='<div class="to-table-wrap"><table class="to-table"><thead><tr>'+labels.map(s=>'<th>'+E(s)+'</th>').join("")+'<th>Status</th><th></th></tr></thead><tbody>'+x.rows.map((r,i)=>'<tr>'+["a","b","c"].map(k=>'<td><textarea class="to-input" rows="3" data-tool-row="'+E(t.id)+'" data-index="'+i+'" data-col="'+k+'">'+E(r[k]||"")+'</textarea></td>').join("")+'<td>'+statusSelect(r.status,t.id,i)+'</td><td>'+button("×","removeRow",t.id).replace('data-tool-id="'+E(t.id)+'"','data-tool-id="'+E(t.id)+'" data-index="'+i+'"')+'</td></tr>').join("")+'</tbody></table></div>';
const checklist='<div class="to-stack">'+x.checked.map((q,i)=>'<div class="to-flex" style="gap:8px"><label class="to-check" style="flex:1"><input type="checkbox" data-tool-check="'+E(t.id)+'" data-index="'+i+'" '+(q.done?"checked":"")+'><input class="to-input" data-tool-checktext="'+E(t.id)+'" data-index="'+i+'" value="'+eattr(q.text)+'" aria-label="Atividade verificável"></label>'+button("×","removeCheck",t.id).replace('data-tool-id="'+E(t.id)+'"','data-tool-id="'+E(t.id)+'" data-index="'+i+'"')+'</div>').join("")+'</div><div class="to-actions">'+button("+ Nova ação","addCheck",t.id)+'</div>';
const timeline='<div class="to-timeline">'+x.timeline.map((r,i)=>'<article><div class="to-grid2"><label class="to-field">Etapa<input data-tool-time-title="'+E(t.id)+'" data-index="'+i+'" value="'+eattr(r.title)+'"></label><label class="to-field">Data planejada<input type="date" data-tool-time-date="'+E(t.id)+'" data-index="'+i+'" value="'+eattr(r.date)+'"></label></div><div class="to-actions">'+statusSelect(r.status,t.id,i,"time")+button("Excluir etapa","removeTime",t.id).replace('data-tool-id="'+E(t.id)+'"','data-tool-id="'+E(t.id)+'" data-index="'+i+'"')+'</div></article>').join("")+'</div><div class="to-actions">'+button("+ Adicionar prazo","addTime",t.id)+'</div>';
let variant="";
if(t.kind==="kanban"){
 variant='<div class="to-kanban">'+["A fazer","Em andamento","Concluído"].map(status=>'<div class="to-column"><h3>'+status+'</h3>'+x.rows.filter(r=>(r.status||"A fazer")===status).map(r=>{const i=x.rows.indexOf(r);return '<article class="to-task"><h4>'+E(r.a||"Atividade a definir")+'</h4><small>'+E(r.b||"")+'</small>'+statusSelect(r.status,t.id,i)+'</article>'}).join("")+'</div>').join("")+'</div>';
}
if(t.kind==="checklist"){variant='<p>Use o checklist para conferir critérios específicos desta ferramenta, além do quadro de registros.</p>'}
if(t.kind==="planner"||t.kind==="timeline"){variant='<p>Inclua datas reais do seu planejamento e acompanhe a situação de cada etapa. Nenhum prazo é presumido.</p>'}
const guide='<div class="to-grid3">'+t.questions.map((q,i)=>'<div class="to-card"><small>PONTO DE ATENÇÃO</small><h3>'+E(["Finalidade","Registros","Encaminhamento"][i])+'</h3><p>'+E(q)+'</p></div>').join("")+'</div>';
const content='<div class="to-actions"><a class="to-btn" href="#'+area+'">← Voltar para '+E(ids[area])+'</a>'+button("Copiar meu registro","copy",t.id)+button("Imprimir esta ferramenta","print",t.id)+button("Exportar dados (.json)","export",t.id)+'</div>'+title+saveInfo+'<section class="to-section"><h2>Guia de utilização</h2>'+guide+'</section><section class="to-section"><h2>Meu espaço de trabalho</h2><p>Edite e registre decisões com base em informações verificadas. As alterações são salvas automaticamente neste navegador.</p>'+fields+'</section><section class="to-section"><h2>'+E(t.kind==="matrix"?"Matriz de análise":t.kind==="kanban"?"Quadro de andamento":t.kind==="timeline"?"Registro de etapas":t.kind==="planner"?"Planejamento":t.kind==="checklist"?"Critérios registrados":"Estrutura de conteúdo")+'</h2>'+variant+table+'<div class="to-actions">'+button("+ Nova linha","addRow",t.id)+'</div></section><section class="to-section"><h2>Checklist de acompanhamento</h2>'+checklist+'</section><section class="to-section"><h2>Agenda e marcos</h2>'+timeline+'</section><p class="to-footer-note">O registro é armazenado localmente no seu dispositivo. Não inserir dados identificáveis de pacientes, participantes ou prontuários.</p>';
A.main(A.shell(area,t.title,content,[{title:"← Biblioteca de "+ids[area],href:"#"+area}]));
}
function getTool(id){const t=[...window.TO_TCC_TOOLS,...window.TO_RESEARCH_TOOLS].find(x=>x.id===id);return t?item(t):null}
document.addEventListener("input",e=>{
const id=e.target.dataset.toolField;if(id){const o=getTool(id);if(o){o[e.target.dataset.key]=e.target.value;A.save()}}
const rowId=e.target.dataset.toolRow;if(rowId){const o=getTool(rowId),r=o?.rows[Number(e.target.dataset.index)];if(r){r[e.target.dataset.col]=e.target.value;A.save()}}
const note=e.target.dataset.toolChecktext;if(note){const o=getTool(note),q=o?.checked[Number(e.target.dataset.index)];if(q){q.text=e.target.value;A.save()}}
const time=e.target.dataset.toolTimeTitle;if(time){const o=getTool(time),r=o?.timeline[Number(e.target.dataset.index)];if(r){r.title=e.target.value;A.save()}}
const filter=e.target.dataset.toolFilter;if(filter){const q=e.target.value.toLocaleLowerCase("pt-BR").trim();document.querySelectorAll(".to-tool-item").forEach(el=>{el.hidden=q&&!el.dataset.toolIndex.includes(q)});document.querySelectorAll(".to-tool-groups>details").forEach(el=>{const items=[...el.querySelectorAll(".to-tool-item")];el.hidden=items.every(c=>c.hidden);if(q&&!el.hidden)el.open=true})}
});
document.addEventListener("change",e=>{
const ck=e.target.dataset.toolCheck;if(ck){const o=getTool(ck),q=o?.checked[Number(e.target.dataset.index)];if(q){q.done=e.target.checked;A.save()}}
const status=e.target.dataset.toolStatus;if(status){const o=getTool(status),r=e.target.dataset.context==="time"?o?.timeline[Number(e.target.dataset.index)]:o?.rows[Number(e.target.dataset.index)];if(r){r.status=e.target.value;A.save();A.render(true)}}
const due=e.target.dataset.toolTimeDate;if(due){const o=getTool(due),r=o?.timeline[Number(e.target.dataset.index)];if(r){r.date=e.target.value;A.save()}}
});
document.addEventListener("click",e=>{
const btn=e.target.closest("[data-tool-action]");if(!btn)return;
const id=btn.dataset.toolId,x=getTool(id);if(!x)return;const action=btn.dataset.toolAction,i=Number(btn.dataset.index);
if(action==="addRow"){x.rows.push({a:"",b:"",c:"",status:"A fazer"})}
else if(action==="removeRow"){x.rows.splice(i,1)}
else if(action==="addCheck"){x.checked.push({text:"Nova ação de revisão",done:false})}
else if(action==="removeCheck"){x.checked.splice(i,1)}
else if(action==="addTime"){x.timeline.push({date:"",title:"",status:"A fazer"})}
else if(action==="removeTime"){x.timeline.splice(i,1)}
else if(action==="print"){window.print();return}
else if(action==="copy"){
 const data=[x.title,"Objetivo: "+x.objective,"Contexto: "+x.context,"Base: "+x.evidence,"Análise: "+x.reflection,"Decisões: "+x.next,x.notes].join("\n\n");
 if(navigator.clipboard?.writeText){navigator.clipboard.writeText(data).then(()=>A.toast("Registro copiado.")).catch(()=>A.toast("Copie o registro manualmente."))}else{A.toast("A cópia automática não está disponível. Selecione o texto para copiar.")}return
}
else if(action==="export"){
 const blob=new Blob([JSON.stringify({toolId:id,exportedAt:new Date().toISOString(),content:x},null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="caderno-to-"+id+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);return;
}
else{return}
A.save();A.render(true);
});
A.register("ferramenta-tcc",p=>toolPage("tcc",p[1]));
A.register("ferramenta-pesquisa",p=>toolPage("pesquisa",p[1]));
window.TO_TOOLKIT={library,toolPage};
})();