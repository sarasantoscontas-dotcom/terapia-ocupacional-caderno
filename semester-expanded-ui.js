/* Organização universitária complementar de TO: 96 opções e ateliês independentes por período. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
const catalog=window.TO_SEMESTER_EXPANDED_CATALOG||[];
S.semesterExpanded=S.semesterExpanded||{};
S.customSubjects=S.customSubjects||{};
const e=x=>E(String(x??""));
const modes=[["disciplinas","✿ Disciplinas complementares"],["agenda","▦ Grade semanal"],["avaliacoes","✎ Avaliações e entregas"],["revisoes","↗ Revisões e leituras"],["competencias","✦ Competências"],["estagio","☷ Estágio e horas"],["rotina","♡ Vida universitária"],["balanco","✧ Fechamento"]];
const lessonFields=[
 ["objetivo","Objetivo de aprendizagem","Identificar o conceito central e sua aplicação à participação ocupacional."],
 ["fontes","Fontes, ementa e orientação","Verificar o PPC da universidade, bibliografia indicada e orientações da disciplina."],
 ["produzido","Produto acadêmico","Criar uma síntese fundamentada, estudo de atividade ou portfólio autoral."],
 ["duvidas","Dúvidas e feedback","Perguntar ao docente ou monitor como relacionar pessoa, ocupação e contexto."]
];
const base=n=>({
 view:"disciplinas",
 overview:"Neste período, quero compreender as relações entre ocupação, participação, pessoa e ambiente, além de registrar evidências das disciplinas e manter uma rotina acadêmica sustentável.",
 week:Array.from({length:7},(_,i)=>Array.from({length:3},(_,j)=>({
  label:i<5&&j===0?"Aulas e atividades curriculares":j===1?"Leitura e aplicação":"Descanso, lazer e atividades pessoais",
  slot:i<5&&j===0?"08h–12h (apenas exemplo)":j===1?"Adaptar à disponibilidade":"Escolhas pessoais e recuperação"
 }))),
 subjects:{},
 evaluations:[
  {id:"av1",title:"Seminário sobre ocupação e participação",subject:"Disciplinas integradoras",date:"",weight:"",stage:"A fazer",next:"Delimitar pergunta, selecionar fontes e preparar slides acessíveis."},
  {id:"av2",title:"Fichamento crítico de artigo de TO",subject:"Pesquisa e metodologia",date:"",weight:"",stage:"Em andamento",next:"Conferir pergunta, método, achados e limitações na fonte original."},
  {id:"av3",title:"Produção reflexiva sobre prática simulada",subject:"Estágio / prática acadêmica",date:"",weight:"",stage:"A fazer",next:"Separar observações de interpretações e discutir com supervisor."}
 ],
 reviews:[
  {id:"rv1",topic:"Autonomia, independência e participação",method:"Recuperação ativa e exemplos",when:"Após a aula",state:"A fazer",note:"Diferenciar termos antes de aplicar em situação fictícia."},
  {id:"rv2",topic:"Análise de atividade e ambiente",method:"Mapa conceitual",when:"Fim da semana",state:"Em andamento",note:"Comparar demanda da tarefa e barreira ambiental."},
  {id:"rv3",topic:"Leitura crítica de artigo científico",method:"Fichamento",when:"Antes da discussão",state:"A fazer",note:"Descrever desenho, limitações e adequação à pergunta."}
 ],
 skills:[
  {name:"Raciocínio ocupacional contextualizado",evidence:"Explicar ocupação escolhida, ambiente, apoio e participação em caso fictício.",done:false},
  {name:"Comunicação acadêmica acessível",evidence:"Preparar apresentação com fontes verificadas e linguagem clara.",done:false},
  {name:"Integridade científica e bibliográfica",evidence:"Distinguir dados reais, hipóteses e exemplos, conferindo as referências.",done:false},
  {name:"Organização e planejamento sustentável",evidence:"Rever cronograma e preservar descanso e ocupações significativas.",done:false}
 ],
 practice:[
  {activity:"Observação de atividade acadêmica simulada",hours:"",approved:false,evidence:"Identificar objetivo pedagógico e fonte do registro."},
  {activity:"Seminário de análise de atividade",hours:"",approved:false,evidence:"Registrar critérios de participação e feedback docente."},
  {activity:"Preparação de relatório e portfólio",hours:"",approved:false,evidence:"Documentar produto didático sem identificação de pacientes."}
 ],
 wellbeing:[
  ["Deslocamento e intervalos","Reservar tempo realista para transporte, alimentação e pausas."],
  ["Horários de estudo","Organizar blocos curtos para leitura, revisão e aplicação."],
  ["Sono e recuperação","Planejar espaço de descanso sem impor metas padronizadas."],
  ["Ocupações significativas fora da faculdade","Preservar participação social, lazer, convivência e autocuidado."],
  ["Apoio acadêmico","Procurar monitoria, biblioteca, grupos e orientação quando necessário."],
  ["Custos e materiais","Estimar despesas de deslocamento, materiais e impressão."]
 ].map(([name,text])=>({name,text})),
 closure:[
  ["Aprendizagem mais consistente","Descrever conceitos sustentados por fontes verificadas e exemplos próprios."],
  ["Competência que merece continuidade","Raciocínio ocupacional e clareza na documentação."],
  ["Pendências e próximos passos","Conferir entregas, horas oficiais e pré-requisitos no sistema da universidade."],
  ["Transição ao período seguinte","Relacionar temas e preparar referências para disciplinas futuras."]
 ].map(([label,value])=>({label,value})),
 reflection:"Fechamento ilustrativo: evidências de aprendizagem em análise de atividades, participação e acessibilidade; metas do próximo período definidas após revisão do PPC."
});
const state=n=>S.semesterExpanded[n]||(S.semesterExpanded[n]=base(n));
const currentSubject=(n,id)=>{
 const subject=catalog.find(x=>x.id===id&&x.semester===Number(n));
 if(!subject)return null;
 const v=state(n);
 return v.subjects[id]||(v.subjects[id]={objetivo:subject.scope,fontes:"Verificar a ementa e bibliografia previstas no PPC da instituição; não pressupor que esta matéria integra a grade oficial.",produzido:subject.deliverable,duvidas:subject.questions.join("\n"),done:false});
};
const inp=(n,type,i,field,val,rows=0)=>'<label class="semx-field"><span>'+e(field==="value"?"Minha anotação":field==="text"?"Meu registro":field)+"</span>"+
 (rows?'<textarea class="to-input" rows="'+rows+'" data-semx-n="'+n+'" data-semx-type="'+type+'" data-semx-i="'+i+'" data-semx-field="'+field+'">'+e(val)+'</textarea>':
 '<input class="to-input" data-semx-n="'+n+'" data-semx-type="'+type+'" data-semx-i="'+i+'" data-semx-field="'+field+'" value="'+e(val)+'">')+'</label>';
const editor=(n,kind,i,key,label,value,rows=0)=>'<label class="semx-field"><span>'+e(label)+'</span>'+
 (rows?'<textarea class="to-input" rows="'+rows+'" data-semx-n="'+n+'" data-semx-type="'+kind+'" data-semx-i="'+i+'" data-semx-field="'+key+'">'+e(value)+'</textarea>':
 '<input class="to-input" data-semx-n="'+n+'" data-semx-type="'+kind+'" data-semx-i="'+i+'" data-semx-field="'+key+'" value="'+e(value)+'">')+'</label>';
const button=(label,action,n,extra="")=>'<button type="button" class="to-btn" data-action="'+action+'" data-semx-n="'+n+'" '+extra+'>'+e(label)+'</button>';
const select=(n,kind,i,key,selected,opts)=>'<select class="to-filter" data-semx-n="'+n+'" data-semx-type="'+kind+'" data-semx-i="'+i+'" data-semx-field="'+key+'">'+opts.map(v=>'<option '+(selected===v?"selected":"")+' value="'+e(v)+'">'+e(v)+'</option>').join("")+'</select>';
function subjects(n){
 const entries=catalog.filter(x=>x.semester===n);
 const attached=new Set((S.customSubjects[n]||[]).map(x=>x.title.trim().toLocaleLowerCase("pt-BR")));
 const cards=entries.map(item=>{
  const v=currentSubject(n,item.id),added=attached.has(item.title.toLocaleLowerCase("pt-BR"));
  return '<article class="semx-course" data-semx-search="'+e((item.title+" "+item.scope+" "+item.focus).toLowerCase())+'">'+
  '<div class="semx-course-heading"><span class="semx-course-seal">✿</span><span class="to-pill">'+(added?"No meu semestre":"Sugestão complementar")+'</span></div>'+
  '<h3>'+e(item.title)+'</h3><p>'+e(item.scope)+'</p>'+
  '<details class="to-disclosure"><summary>Meu plano desta disciplina · editar</summary>'+
  '<p class="semx-deliverable"><b>Atividade inicial:</b> '+e(item.deliverable)+'</p>'+
  lessonFields.map(([key,label],i)=>editor(n,"subject:"+item.id,0,key,label,v[key],3)).join("")+
  '<label class="to-check"><input type="checkbox" data-semx-done="'+n+'" data-semx-id="'+item.id+'" '+(v.done?"checked":"")+'><span>Revi o plano acadêmico desta matéria</span></label>'+
  '<p class="to-compact">Disciplina optativa para organizar: confirme oferta, nomenclatura e requisitos na sua universidade.</p></details>'+
  (added?'<span class="semx-added">✓ Adicionada à organização do período</span>':button("+ Incluir no meu semestre","semxInclude",n,'data-semx-id="'+item.id+'"'))+
  '</article>';
 }).join("");
 return '<div class="semx-courses-tools"><input class="to-filter" type="search" data-semx-query="'+n+'" placeholder="Buscar entre disciplinas complementares..." aria-label="Buscar disciplinas adicionais"><span class="to-pill">Materiais opcionais</span></div>'+
 '<div class="semx-course-grid">'+cards+'</div>';
}
const days=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"],periods=["Manhã","Tarde","Noite"];
function agenda(n,v){
 return '<p class="semx-hint">Grade semanal editável, distinta dos horários oficiais e do plano semanal anterior. Ajuste turnos e deslocamentos à sua realidade.</p><div class="semx-week">'+
 days.map((day,i)=>'<div class="semx-day"><h3>'+day+'</h3>'+periods.map((period,j)=>'<div class="semx-week-slot"><b>'+period+'</b>'+
 editor(n,"week:"+i,j,"label","Atividade",v.week[i][j].label)+editor(n,"week:"+i,j,"slot","Horário / ajustes",v.week[i][j].slot)+'</div>').join("")+'</div>').join("")+'</div>';
}
function evaluations(n,v){
 return '<div class="semx-table-wrap"><table class="to-table"><thead><tr><th>Avaliação ou entrega</th><th>Disciplina</th><th>Prazo</th><th>Peso, se houver</th><th>Andamento</th><th>Próxima ação</th><th></th></tr></thead><tbody>'+
 v.evaluations.map((r,i)=>'<tr><td>'+editor(n,"evaluations",i,"title","Nome",r.title,2)+'</td><td>'+editor(n,"evaluations",i,"subject","Disciplina",r.subject)+'</td><td><input aria-label="Prazo" type="date" class="to-input" data-semx-n="'+n+'" data-semx-type="evaluations" data-semx-i="'+i+'" data-semx-field="date" value="'+e(r.date)+'"></td>'+
 '<td>'+editor(n,"evaluations",i,"weight","Critério",r.weight)+'</td><td>'+select(n,"evaluations",i,"stage",r.stage,["A fazer","Em andamento","Em revisão","Concluído"])+'</td>'+
 '<td>'+editor(n,"evaluations",i,"next","Próximo passo",r.next,3)+'</td><td>'+button("×","semxDelete",n,'data-semx-type="evaluations" data-semx-i="'+i+'"')+'</td></tr>').join("")+'</tbody></table></div>'+
 button("+ Nova avaliação","semxAdd",n,'data-semx-type="evaluations"');
}
function reviews(n,v){
 return '<div class="semx-review-grid">'+v.reviews.map((r,i)=>'<article class="semx-review-card"><strong>✎ Cartão de revisão '+String(i+1).padStart(2,"0")+'</strong>'+
 editor(n,"reviews",i,"topic","Assunto",r.topic)+
 editor(n,"reviews",i,"method","Estratégia",r.method)+
 editor(n,"reviews",i,"when","Quando revisar",r.when)+
 editor(n,"reviews",i,"note","Conteúdo / dificuldade",r.note,3)+
 select(n,"reviews",i,"state",r.state,["A fazer","Em andamento","Concluído"])+
 button("Excluir","semxDelete",n,'data-semx-type="reviews" data-semx-i="'+i+'"')+'</article>').join("")+'</div>'+
 button("+ Nova revisão","semxAdd",n,'data-semx-type="reviews"');
}
function skills(n,v){
 return '<div class="semx-competence-grid">'+v.skills.map((r,i)=>'<article class="semx-competence"><label class="semx-check"><input type="checkbox" data-semx-skill="'+n+'" data-semx-i="'+i+'" '+(r.done?"checked":"")+'><b>'+e(r.name)+'</b></label>'+
 editor(n,"skills",i,"evidence","Evidência de aprendizagem",r.evidence,4)+'</article>').join("")+'</div>'+
 '<p class="semx-hint">Marcação pessoal de aprendizagem; não corresponde a certificado ou competência profissional legalmente atestada.</p>';
}
function practice(n,v){
 return '<p class="semx-hint">Registros ilustrativos de atividades práticas. As horas informadas aqui não são validadas e não substituem documentos assinados ou sistemas oficiais de estágio.</p>'+
 '<div class="semx-table-wrap"><table class="to-table"><thead><tr><th>Atividade acadêmica</th><th>Horas anotadas</th><th>Comprovante ou reflexão</th><th>Conferido</th><th></th></tr></thead><tbody>'+
 v.practice.map((r,i)=>'<tr><td>'+editor(n,"practice",i,"activity","Atividade",r.activity,2)+'</td><td>'+editor(n,"practice",i,"hours","Duração",r.hours)+'</td><td>'+editor(n,"practice",i,"evidence","Evidência",r.evidence,3)+'</td><td><label class="semx-check"><input type="checkbox" data-semx-practice="'+n+'" data-semx-i="'+i+'" '+(r.approved?"checked":"")+'><span>Revisado</span></label></td><td>'+
 button("×","semxDelete",n,'data-semx-type="practice" data-semx-i="'+i+'"')+'</td></tr>').join("")+'</tbody></table></div>'+
 button("+ Nova atividade","semxAdd",n,'data-semx-type="practice"');
}
function wellbeing(n,v){
 return '<div class="semx-wellbeing-grid">'+v.wellbeing.map((r,i)=>
 '<article class="semx-personal"><span aria-hidden="true">♡</span><h3>'+e(r.name)+'</h3>'+editor(n,"wellbeing",i,"text","Meu planejamento",r.text,5)+'</article>').join("")+'</div>';
}
function closure(n,v){
 return '<div class="semx-closure-grid">'+v.closure.map((r,i)=>'<article class="semx-finish"><h3>'+e(r.label)+'</h3>'+editor(n,"closure",i,"value","Minha reflexão",r.value,4)+'</article>').join("")+'</div>'+
 editor(n,"top",0,"reflection","Diário final do semestre",v.reflection,5);
}
const modesTitle={disciplinas:"Biblioteca complementar de disciplinas",agenda:"Grade semanal do meu período",avaliacoes:"Avaliações, provas e trabalhos",revisoes:"Plano de revisões e leituras",competencias:"Competências do período",estagio:"Prática, estágio e horas",rotina:"Rotinas e bem-estar",balanco:"Balanço e transição de semestre"};
function render(s){
 const n=s.number,v=state(n);
 const labels=modes.map(([key,name])=>button(name,"semxMode",n,'data-semx-mode="'+key+'" class="semx-tab" '+(v.view===key?'aria-current="true"':""))).join("");
 let body=v.view==="agenda"?agenda(n,v):v.view==="avaliacoes"?evaluations(n,v):v.view==="revisoes"?reviews(n,v):v.view==="competencias"?skills(n,v):v.view==="estagio"?practice(n,v):v.view==="rotina"?wellbeing(n,v):v.view==="balanco"?closure(n,v):subjects(n);
 const done=v.skills.filter(x=>x.done).length;
 return '<section class="to-section semx-section" id="semestre-academia-extra"><div class="semx-heading"><div><span class="semx-overline">MEU CADERNO DO SEMESTRE · TERAPIA OCUPACIONAL</span>'+
 '<h2>Ateliê ampliado do '+e(s.title)+'</h2><p>Mais possibilidades de organizar disciplinas, avaliações, revisões, estágios, competências e rotina pessoal. Conteúdos exemplificativos específicos para esta etapa.</p></div>'+
 '<div class="semx-badge">✿</div></div>'+
 '<div class="semx-stats"><span><b>'+catalog.filter(c=>c.semester===n).length+'</b> disciplinas complementares disponíveis</span><span><b>'+v.evaluations.length+'</b> avaliações no meu painel</span><span><b>'+done+'/'+v.skills.length+'</b> competências acompanhadas</span></div>'+
 '<div class="semx-tabs">'+labels+'</div>'+
 '<div class="semx-pane"><h3>'+e(modesTitle[v.view])+'</h3>'+body+'</div>'+
 '<p class="semx-disclaimer">Grade adicional para planejamento pessoal: confirme a oferta, as cargas horárias, os estágios e os critérios reais no PPC e na secretaria do curso. Não insira informações identificáveis de pacientes.</p></section>';
}
function overview(){
 const done=window.TO_SEMESTERS||[];
 return '<section class="to-section semx-overview"><div class="semx-heading"><div><span class="semx-overline">DISCIPLINAS E ORGANIZAÇÃO AVANÇADA</span>'+
 '<h2>Minha graduação mais organizada</h2><p>Explore disciplinas acadêmicas complementares por período, grade semanal, avaliações, revisões, competências, prática supervisionada e equilíbrio da rotina.</p></div><div class="semx-badge">✿</div></div>'+
 '<div class="semx-overview-grid">'+done.map(s=>'<a href="#semestre/'+s.number+'"><b>'+e(s.number)+'º período</b><span>'+catalog.filter(x=>x.semester===s.number).length+' disciplinas complementares para avaliar</span><small>Explorar organização →</small></a>').join("")+'</div></section>';
}
const find=n=>window.TO_SEMESTERS?.find(s=>s.number===Number(n));
A.onAction("semxMode",button=>{
 const n=Number(button.dataset.semxN),v=state(n);if(!modes.some(([k])=>k===button.dataset.semxMode))return;
 v.view=button.dataset.semxMode;A.save();A.render(true);
});
A.onAction("semxInclude",button=>{
 const n=Number(button.dataset.semxN),row=catalog.find(x=>x.semester===n&&x.id===button.dataset.semxId);if(!row)return;
 S.customSubjects[n]=S.customSubjects[n]||[];
 if(S.customSubjects[n].some(x=>x.title.trim().toLowerCase()===row.title.toLowerCase())||find(n)?.subjects.some(x=>x.title.toLowerCase()===row.title.toLowerCase())){
 A.toast("Esta disciplina já está no seu período.");return;
 }
 const id="p-extra-"+row.id;
 S.customSubjects[n].push({id,title:row.title});
 S.subjectData=S.subjectData||{};
 S.subjectData[n+"/"+id]={g1:"",g2:"",g3:"",g4:"",w1:"50",w2:"50",w3:"0",w4:"0",attendance:"",notes:row.scope+"\n\nAtividade inicial: "+row.deliverable+"\n\nVerificar a oferta no PPC da instituição."};
 A.save();A.render(true);A.toast("Disciplina incluída no controle semestral.");
});
const add={evaluations:()=>({id:"avaliacao-"+Date.now(),title:"Nova avaliação",subject:"Disciplina a definir",date:"",weight:"",stage:"A fazer",next:"Registrar critérios e preparar a entrega."}),reviews:()=>({id:"rev-"+Date.now(),topic:"Novo assunto de TO",method:"Recuperação ativa",when:"Escolher prazo",state:"A fazer",note:"Buscar fonte primária e registrar dúvidas."}),practice:()=>({activity:"Nova atividade prática",hours:"",approved:false,evidence:"Indicar comprovante e orientação institucional."})};
A.onAction("semxAdd",button=>{
 const n=Number(button.dataset.semxN),kind=button.dataset.semxType;if(!add[kind])return;
 state(n)[kind].push(add[kind]());A.save();A.render(true);
});
A.onAction("semxDelete",button=>{
 const n=Number(button.dataset.semxN),kind=button.dataset.semxType,index=Number(button.dataset.semxI);
 if(!add[kind]||!Number.isInteger(index)||index<0)return;state(n)[kind].splice(index,1);A.save();A.render(true);
});
document.addEventListener("input",event=>{
 const d=event.target.dataset,n=Number(d.semxN);if(!d.semxN)return;
 const v=state(n),kind=d.semxType,i=Number(d.semxI),key=d.semxField;
 if(kind==="top"){if(key==="reflection")v.reflection=event.target.value}
 else if(kind==="subject:"+d.semxId){} // ids in kind below
 else if(kind?.startsWith("subject:")){
  const sub=currentSubject(n,kind.split(":")[1]);if(sub&&Object.prototype.hasOwnProperty.call(sub,key))sub[key]=event.target.value;
 }else if(kind?.startsWith("week:")){
  const row=v.week[Number(kind.split(":")[1])]?.[i];if(row&&key in row)row[key]=event.target.value;
 }else if(v[kind]?.[i]&&Object.prototype.hasOwnProperty.call(v[kind][i],key))v[kind][i][key]=event.target.value;
 A.save();
});
document.addEventListener("change",event=>{
 const d=event.target.dataset;
 if(d.semxDone){currentSubject(Number(d.semxDone),d.semxId).done=event.target.checked;A.save();return}
 if(d.semxSkill){const row=state(Number(d.semxSkill)).skills[Number(d.semxI)];if(row){row.done=event.target.checked;A.save()}return}
 if(d.semxPractice){const row=state(Number(d.semxPractice)).practice[Number(d.semxI)];if(row){row.approved=event.target.checked;A.save()}return}
 if(d.semxN&&d.semxField){const n=Number(d.semxN),kind=d.semxType,row=state(n)[kind]?.[Number(d.semxI)];
 if(row&&d.semxField in row){row[d.semxField]=event.target.value;A.save()}
 }
});
document.addEventListener("input",event=>{
 if(!event.target.dataset.semxQuery)return;
 const text=event.target.value.trim().toLocaleLowerCase("pt-BR");
 document.querySelectorAll(".semx-course").forEach(node=>{node.hidden=!!text&&!node.dataset.semxSearch.includes(text)});
});
window.TO_SEMESTER_EXPANDED={render,overview,subjects:catalog,state};
})();