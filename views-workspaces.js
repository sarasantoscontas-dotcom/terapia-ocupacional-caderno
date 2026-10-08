/* Workspaces editáveis: TCC, Pesquisa Acadêmica e Controle de Semestre. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape,$=A.$;
const link=(label,href)=>'<a class="to-btn" href="'+E(href)+'">'+E(label)+'</a>';
const editable=(label,path,value,rows=3,help="")=>A.editable(label,path,value,rows,help);
const options=(arr,value)=>arr.map(x=>'<option value="'+E(x)+'" '+(x===value?"selected":"")+'>'+E(x)+'</option>').join("");
const stages=["A fazer","Em andamento","Concluído"];
const stagesResearch=["Para ler","Em leitura","Fichado"];
const section=(title,desc,body)=>'<section class="to-section"><h2>'+E(title)+'</h2>'+(desc?'<p>'+E(desc)+'</p>':"")+body+'</section>';
const tccIdeaCard=(i,idx)=>'<article class="to-card"><small>'+E(i.area)+'</small><h3>'+E(i.title)+'</h3><p><strong>Pergunta:</strong> '+E(i.question)+'</p><details class="to-disclosure"><summary>Abordagem possível</summary><p>'+E(i.approach)+'</p><p>Descritores iniciais: '+E(i.keywords)+'</p></details><div class="to-actions">'+A.button("Usar como ponto de partida","useIdea",'data-index="'+idx+'"',"primary")+'</div></article>';
function tcc(){
A.crumb(["Caderno","Meu TCC"]);const x=S.tcc;
const tabs=A.views("tcc",[["painel","▦ Painel"],["temas","✧ Temas"],["capitulos","☷ Capítulos"],["kanban","▤ Kanban"],["cronograma","↗ Cronograma"]]);
let body="";
if(S.views.tcc==="temas"){
body=section("Temas investigáveis de Terapia Ocupacional","Ideias para adaptação e discussão com orientador. São propostas de pesquisa, não estudos realizados.",A.gallery(window.TO_TCC_IDEAS.map(tccIdeaCard)));
}else if(S.views.tcc==="capitulos"){
const blocks=window.TO_TCC_CHAPTERS.map((c,i)=>'<details class="to-disclosure" '+(i===0?"open":"")+'><summary>'+String(i+1).padStart(2,"0")+' · '+E(c.title)+'</summary><p>'+E(c.hint)+'</p>'+editable("Texto do capítulo · rascunho editável","tcc.chapters.c"+i,x.chapters["c"+i]||"",8,"Escreva seu texto com fontes verificadas, sem inventar referências")+'</details>').join("");
body=section("Meu projeto e capítulos","Cada página possui editor próprio. Conteúdo salvo localmente enquanto você escreve.",blocks);
}else if(S.views.tcc==="kanban"){
body=window.TO_TCC_KANBAN_PRO.render();
}else if(S.views.tcc==="cronograma"){
body=section("Cronograma de elaboração","Atribua prazos às etapas do projeto. Os prazos são definidos por você.",'<div class="to-timeline">'+x.tasks.map(t=>'<article><label class="to-field">'+E(t.name)+'<input type="date" data-tcc-date="'+E(t.id)+'" value="'+E(t.date||"")+'"></label><p class="to-compact">Situação: '+E(t.stage)+'</p></article>').join("")+'</div>');
}else{
body=A.stats([[x.tasks.length,"Etapas registradas"],[x.tasks.filter(t=>t.stage==="Concluído").length,"Concluídas"],[window.TO_TCC_CHAPTERS.filter((c,i)=>String(x.chapters["c"+i]||"").trim()).length,"Capítulos iniciados"],[window.TO_TCC_IDEAS.length,"Ideias de pesquisa"]])+
section("Identidade do meu TCC","Preencha seu projeto. Estes campos são editáveis, não existem temas ou resultados gerados automaticamente.",'<div class="to-grid2">'+editable("Título provisório","tcc.title",x.title,0,"Ex.: participação no brincar em parques públicos")+editable("Orientador(a)","tcc.supervisor",x.supervisor,0,"Nome do orientador")+
editable("Instituição / Curso","tcc.institution",x.institution,0,"Sua universidade")+
editable("Prazo de entrega","tcc.deadline",x.deadline,0,"Ex.: 2027-06-30")+'</div><div class="to-stack" style="margin-top:14px">'+editable("Pergunta de pesquisa","tcc.question",x.question,3,"Qual pergunta você deseja investigar?")+editable("Justificativa","tcc.justification",x.justification,4,"Por que é relevante para Terapia Ocupacional? Quais fontes sustentam?")+editable("Objetivos","tcc.goal",x.goal,4,"Objetivo geral e objetivos específicos")+editable("Metodologia prevista","tcc.method",x.method,4,"Desenho, amostra/fontes, coleta, análise, questões éticas")+editable("Descritores e palavras-chave","tcc.keywords",x.keywords,0,"Termos de busca e sinônimos")+'</div>')+
section("Próximos passos","Gerencie etapas para orientar a escrita e a comunicação com seu orientador.",'<div class="to-stack">'+x.tasks.slice(0,6).map(t=>'<div class="to-flex"><label class="to-check"><input type="checkbox" data-tcc-done="'+E(t.id)+'" '+(t.stage==="Concluído"?"checked":"")+'><span class="'+(t.stage==="Concluído"?"done":"")+'">'+E(t.name)+'</span></label><small class="to-muted">'+E(t.stage)+'</small></div>').join("")+'</div><div class="to-actions">'+A.button("Abrir quadro Kanban","tccBoard")+'</div>')+
section("Guia de integridade acadêmica","Recomendações importantes para o desenvolvimento do trabalho.",'<details class="to-disclosure"><summary>Cuidados metodológicos e éticos</summary><p>Verifique se seu desenho envolve seres humanos ou dados pessoais, consulte o CEP, normas CNS e o orientador antes de iniciar coleta. Não crie artigos, citações, transcrições, resultados ou DOIs fictícios.</p></details><details class="to-disclosure"><summary>Estrutura de revisão de literatura</summary><p>Defina descritores, bases, recorte, critérios e registros de seleção. Distinga convergências, divergências, limitações e lacunas observáveis.</p></details><details class="to-disclosure"><summary>Coerência do projeto</summary><p>Problema, objetivos, método, instrumentos, resultados e discussão devem responder uns aos outros. Descreva o que os dados permitem concluir e reconheça o que permanece incerto.</p></details>');
}
const addTask=section("Adicionar etapa personalizada","Uma etapa pode ser uma tarefa de leitura, reunião, redação ou entrega.",'<div class="to-grid2"><label class="to-field">Nome da etapa<input id="tccNewTask" placeholder="Ex.: revisar referências do capítulo 2"></label><label class="to-field">Prazo previsto<input type="date" id="tccNewDate"></label></div><div class="to-actions">'+A.button("+ Adicionar etapa","addTccTask",'',"primary")+'</div>');
A.main(A.shell("tcc","Meu TCC",A.hero("ESPAÇO DE ESCRITA","Meu Trabalho de Conclusão de Curso","Temas investigáveis, projeto, capítulos, tarefas e cronograma, com editor e salvamento local.","Antes de produzir pesquisa com pessoas ou dados identificáveis, consulte seu orientador e os requisitos éticos aplicáveis.")+tabs+body+(S.views.tcc==='painel'?window.TO_DEPTH.tccStudio():'')+addTask+window.TO_TOOLKIT.library('tcc')+window.TO_CORE_DEEP.render('tcc')+'<p class="to-footer-note">Esta ferramenta é um ambiente de organização e redação; não realiza submissão ao CEP nem valida automaticamente normas da ABNT.</p>',[{title:"Voltar ao TCC",href:"#tcc"}]));
// No TCC todas as categorias, subseções e editores aparecem expandidos na abertura.
document.querySelectorAll(".workspace-main details:not(.tccpro-details)").forEach(node=>{node.open=true});
}
A.onAction("tccBoard",()=>{S.views.tcc="kanban";A.save();A.render(true)});
A.onAction("useIdea",b=>{const item=window.TO_TCC_IDEAS[Number(b.dataset.index)];if(!item)return;S.tcc.title=item.title;S.tcc.question=item.question;S.tcc.method=item.approach;S.tcc.keywords=item.keywords;S.views.tcc="painel";A.save();A.render(true);A.toast("Ideia aplicada como rascunho editável.")});
A.onAction("addTccTask",()=>{const name=$("#tccNewTask")?.value.trim(),date=$("#tccNewDate")?.value;if(!name){A.toast("Escreva o nome da etapa.");return}S.tcc.tasks.push({id:"t"+Date.now(),name,stage:"A fazer",date:date||""});A.save();A.render(true);A.toast("Etapa adicionada.")});
A.onAction("deleteTccTask",b=>{S.tcc.tasks=S.tcc.tasks.filter(t=>t.id!==b.dataset.id);A.save();A.render(true)});
document.addEventListener("change",e=>{if(e.target.dataset.tccStage){const t=S.tcc.tasks.find(x=>x.id===e.target.dataset.tccStage);if(t){t.stage=e.target.value;A.save();A.render(true)}}if(e.target.dataset.tccDone){const t=S.tcc.tasks.find(x=>x.id===e.target.dataset.tccDone);if(t){t.stage=e.target.checked?"Concluído":"A fazer";A.save();A.render(true)}}if(e.target.dataset.tccDate){const t=S.tcc.tasks.find(x=>x.id===e.target.dataset.tccDate);if(t){t.date=e.target.value;A.save()}}});
function researchQuery(){
const x=S.research,terms=[x.population,x.concept,x.context].map(v=>String(v||"").split(",").map(w=>w.trim()).filter(Boolean).map(w=>w.includes(" ")?'"'+w.replace(/"/g,"")+'"':w).join(" OR ")).filter(Boolean);
return terms.map(t=>"("+t+")").join(" AND ");
}
function research(){
A.crumb(["Caderno","Pesquisa Acadêmica"]);const x=S.research;
const tabs=A.views("pesquisa",[["painel","▦ Planejamento"],["fichamentos","☷ Fichamentos"],["evidencias","▤ Matriz de evidências"],["kanban","▤ Quadro de leitura"],["cronograma","↗ Etapas"]]);
let body="";
if(S.views.pesquisa==="fichamentos"){
body=section("Fichamentos da literatura","Cadastre obras realmente consultadas, resuma método e achados e mantenha registro de limites.",articleForm()+A.gallery(x.articles.map((r,i)=>articleCard(r,i))));
}else if(S.views.pesquisa==="evidencias"){
body=section("Matriz de evidências","Sintetize somente informações verificadas nos textos completos.",A.table(["Fonte","Método/desenho","Achados anotados","Limitações","Status"],x.articles.map(r=>[E(r.title),E(r.method||"A preencher"),E(r.finding||"A preencher"),E(r.limit||"A preencher"),E(r.status||"Para ler")]))+articleForm());
}else if(S.views.pesquisa==="kanban"){
body=section("Leituras por andamento","Organização visual de artigos cadastrados.",'<div class="to-kanban">'+stagesResearch.map(st=>'<div class="to-column"><h3>'+E(st)+' · '+x.articles.filter(r=>r.status===st).length+'</h3>'+x.articles.filter(r=>r.status===st).map((r,i)=>'<div class="to-task"><h4>'+E(r.title)+'</h4><small>'+E(r.author||"")+'</small><select data-research-stage="'+E(r.id)+'">'+options(stagesResearch,r.status)+'</select></div>').join("")+'</div>').join("")+'</div>');
}else if(S.views.pesquisa==="cronograma"){
body=section("Etapas da pesquisa","Roteiro sugerido, adaptável às exigências e aos prazos reais da instituição.",'<div class="to-timeline">'+window.TO_RESEARCH_STAGES.map((r,i)=>'<article><strong>'+String(i+1).padStart(2,"0")+" · "+E(r.title)+'</strong><p>'+E(r.description)+'</p><label class="to-check"><input data-research-check="'+i+'" type="checkbox" '+(x.checklist.includes(i)?"checked":"")+'><span class="'+(x.checklist.includes(i)?"done":"")+'">Etapa concluída</span></label></article>').join("")+'</div>');
}else{
body=A.stats([[window.TO_RESEARCH_STAGES.length,"Etapas orientadoras"],[x.checklist.length,"Etapas concluídas"],[x.articles.length,"Fichamentos"],[x.articles.filter(r=>r.status==="Fichado").length,"Artigos fichados"]])+
section("Formulador de pergunta","Comece pelo modelo PCC (população, conceito, contexto), útil em perguntas exploratórias e revisões de escopo.",'<div class="to-grid3">'+editable("P · População","research.population",x.population,0,"Ex.: estudantes com deficiência")+editable("C · Conceito","research.concept",x.concept,0,"Ex.: participação acadêmica")+editable("C · Contexto","research.context",x.context,0,"Ex.: universidade pública")+'</div><div class="to-stack" style="margin-top:12px">'+editable("Pergunta estruturada","research.question",x.question,3,"Como esse fenômeno se manifesta nesse contexto?")+editable("Objetivo e desenho do estudo","research.design",x.design,3,"Descrever, explorar, comparar…")+'</div><div class="to-actions">'+A.button("Gerar expressão inicial de busca","makeSearch",'',"primary")+'</div><div class="to-note" style="margin-top:10px">Use vírgulas para separar sinônimos em cada campo. O construtor combina sinônimos com OR e componentes com AND. Revise a sintaxe conforme a base e valide descritores DeCS/MeSH.</div>')+
section("Estratégia de busca e protocolo","Documente bases, critérios e decisões para manter transparência metodológica.",'<div class="to-stack">'+editable("Expressão de busca editável","research.search",x.search,3,"(occupational therapy) AND (participation)…")+editable("Critérios de inclusão","research.inclusion",x.inclusion,3,"População, período, tipo de estudo, idiomas, contexto…")+editable("Critérios de exclusão","research.exclusion",x.exclusion,3,"Exclusões justificáveis relacionadas à pergunta")+editable("Ética e proteção de dados","research.ethical",x.ethical,3,"Bases legais, consentimento, CEP quando cabível")+editable("Plano de extração e análise","research.analysis",x.analysis,3,"Variáveis, categorias, método de síntese e limites")+'</div><div class="to-actions">'+A.button("Copiar expressão de busca","copySearch")+'</div>')+
section("Bases de dados para começar","Abrir os portais para consultar estudos reais.",'<div class="to-actions"><a class="to-btn" href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubMed ↗</a><a class="to-btn" href="https://www.scielo.br/j/cadbto/" target="_blank" rel="noopener noreferrer">Cadernos Brasileiros de TO ↗</a><a class="to-btn" href="https://bvsalud.org/" target="_blank" rel="noopener noreferrer">BVS ↗</a></div>')+
section("Notas e reflexões de pesquisa","Campo livre para decisões metodológicas, versões da pergunta e observações do orientador.",editable("Diário de pesquisa","research.notes",x.notes,7,"Registre data, alterações no protocolo e justificativas…"));
}
A.main(A.shell("pesquisa","Pesquisa Acadêmica",A.hero("LABORATÓRIO DE PESQUISA","Pesquisa Acadêmica","Da pergunta à síntese crítica: protocolo, fontes, fichamentos, quadro de leitura e matriz de evidências.","Os artigos não são pesquisados automaticamente. Cadastre apenas publicações que você localizou e conferiu.")+tabs+body+(S.views.pesquisa==='painel'?window.TO_DEPTH.researchStudio():'')+window.TO_TOOLKIT.library('pesquisa')+window.TO_CORE_DEEP.render('pesquisa')+'<p class="to-footer-note">Pesquisa envolvendo pessoas exige análise da aplicabilidade das regras éticas e eventual apreciação por CEP. O construtor de busca é um ponto de partida, não estratégia validada automaticamente.</p>'));
}
function articleForm(){
return '<details class="to-disclosure"><summary>+ Cadastrar artigo ou fonte consultada</summary><div class="to-grid2" style="margin-top:12px"><label class="to-field">Título<input id="articleTitle" placeholder="Título real da publicação"></label><label class="to-field">Autor(es) e ano<input id="articleAuthor" placeholder="Sobrenome, ano"></label><label class="to-field">URL original (https)<input id="articleUrl" placeholder="https://..."></label><label class="to-field">Método / desenho<input id="articleMethod" placeholder="Ex.: qualitativo, revisão, transversal"></label></div><div class="to-stack" style="margin-top:10px"><label class="to-field">Achados relevantes<textarea id="articleFinding" rows="3" placeholder="Escreva resultados efetivamente lidos"></textarea></label><label class="to-field">Limitações<textarea id="articleLimit" rows="2" placeholder="Limitações descritas ou identificadas"></textarea></label></div><div class="to-actions">'+A.button("Adicionar à biblioteca de pesquisa","addArticle",'',"primary")+'</div></details>';
}
function articleCard(r,i){
return '<article class="to-card"><small>'+E(r.status)+' · '+E(r.author||"")+'</small><h3>'+E(r.title)+'</h3><p><strong>Método:</strong> '+E(r.method||"Não informado")+'</p><details class="to-disclosure"><summary>Ver fichamento</summary><p><b>Resultados:</b> '+E(r.finding||"Não informado")+'</p><p><b>Limitações:</b> '+E(r.limit||"Não informado")+'</p></details><div class="to-actions"><a href="'+E(A.url(r.url))+'" class="to-btn" target="_blank" rel="noopener noreferrer">Fonte ↗</a>'+A.button("Excluir","removeArticle",'data-id="'+E(r.id)+'"',"danger")+'</div></article>';
}
A.onAction("makeSearch",()=>{S.research.search=researchQuery();A.save();A.render(true);A.toast("Expressão inicial criada. Revise descritores e sintaxe.")});
A.onAction("copySearch",()=>{const q=S.research.search||researchQuery();if(!q){A.toast("Primeiro preencha seus descritores.");return}(navigator.clipboard?.writeText?navigator.clipboard.writeText(q).then(()=>A.toast("Expressão copiada.")).catch(()=>A.toast("Selecione o texto manualmente para copiar.")):A.toast("Selecione o texto manualmente para copiar."))});
A.onAction("addArticle",()=>{const title=$("#articleTitle")?.value.trim(),author=$("#articleAuthor")?.value.trim(),raw=$("#articleUrl")?.value.trim();if(!title||!author||!/^https:\/\//i.test(raw||"")){A.toast("Título, autoria e URL https são obrigatórios.");return}S.research.articles.push({id:"a"+Date.now(),title,author,url:raw,method:$("#articleMethod")?.value.trim(),finding:$("#articleFinding")?.value.trim(),limit:$("#articleLimit")?.value.trim(),status:"Para ler"});A.save();A.render(true);A.toast("Fichamento incluído.")});
A.onAction("removeArticle",b=>{S.research.articles=S.research.articles.filter(x=>x.id!==b.dataset.id);A.save();A.render(true)});
document.addEventListener("change",e=>{if(e.target.dataset.researchStage){const r=S.research.articles.find(x=>x.id===e.target.dataset.researchStage);if(r){r.status=e.target.value;A.save();A.render(true)}}if(e.target.dataset.researchCheck!==undefined){const i=Number(e.target.dataset.researchCheck);S.research.checklist=e.target.checked?[...new Set([...S.research.checklist,i])]:S.research.checklist.filter(x=>x!==i);A.save();A.render(true)}});

const semNotice="Matriz ilustrativa de oito semestres, adaptável ao currículo da sua universidade. Notas e aprovação seguem o regulamento da sua instituição.";
function getSubject(s,d){const key=s.number+"/"+d.id;return S.subjectData[key]||(S.subjectData[key]={g1:"",g2:"",g3:"",g4:"",w1:"50",w2:"50",w3:"0",w4:"0",attendance:"",notes:""})}
function gradeAvg(v){
const items=[["g1","w1"],["g2","w2"],["g3","w3"],["g4","w4"]].filter(([g,w])=>v[g]!==""&&v[g]!=null&&v[w]!==""&&v[w]!=null&&Number.isFinite(Number(String(v[g]).replace(",",".")))&&Number.isFinite(Number(String(v[w]).replace(",","."))));
if(items.some(([g,w])=>{const grade=Number(String(v[g]).replace(",",".")),weight=Number(String(v[w]).replace(",","."));return grade<0||grade>10||weight<0}))return "Revisar notas";
if(!items.length)return "—";
const weight=items.reduce((n,[g,w])=>n+Number(String(v[w]).replace(",",".")),0);
if(weight<=0)return "—";
const score=items.reduce((n,[g,w])=>n+Number(String(v[g]).replace(",","."))*Number(String(v[w]).replace(",",".")),0);
return (score/weight).toLocaleString("pt-BR",{maximumFractionDigits:2});
}
const semTask=s=>S.tasks.filter(x=>Number(x.semester)===s.number);
S.customSubjects=S.customSubjects||{};
const semSubjects=s=>[...s.subjects,...(S.customSubjects[s.number]||[]).map(x=>({...x,topics:[],custom:true}))];
function initialTasks(){if(S.seededSemesterTasks)return;S.seededSemesterTasks=true;S.tasks=[...window.TO_DEFAULT_SEM_TASKS.map((t,i)=>({id:"ex"+i,semester:1,title:t[0],type:t[1],date:t[2],status:i===0?"Em andamento":"A fazer",sample:true})),...S.tasks];A.save()}
function semesterIndex(){
A.crumb(["Caderno","Controle de Semestre"]);initialTasks();
const ss=window.TO_SEMESTERS,v=A.views("semestres",[["galeria","▦ Galeria"],["tabela","☷ Tabela"],["trilha","→ Trilha"]]);
let content=S.views.semestres==="tabela"?A.table(["Semestre","Disciplinas","Assuntos lidos","Tarefas pendentes","Acessar"],ss.map(s=>['<a href="#semestre/'+s.number+'">'+E(s.title)+'</a>',String(semSubjects(s).length),A.countRead(s.number)+"/"+total(s),String(semTask(s).filter(x=>x.status!=="Concluído").length),'<a href="#semestre/'+s.number+'">Abrir →</a>'])):S.views.semestres==="trilha"?A.trail(ss.map(s=>({title:s.title,desc:s.focus,link:"#semestre/"+s.number}))):A.gallery(ss.map(s=>A.card(s.title,s.focus+" · "+semSubjects(s).length+" disciplinas.","#semestre/"+s.number,A.countRead(s.number)+"/"+total(s)+" ASSUNTOS LIDOS","Abrir planejamento")));
A.main(A.shell("semestres","Minha Graduação",A.hero("PLANEJAMENTO ACADÊMICO","Controle de Semestre","Organize todos os períodos, disciplinas, tarefas, avaliações, agenda semanal e progresso.",semNotice)+A.stats([[ss.length,"Semestres-modelo"],[ss.reduce((n,x)=>n+semSubjects(x).length,0),"Disciplinas"],[S.tasks.filter(x=>x.status!=="Concluído").length,"Tarefas abertas"],[A.countRead(),"Assuntos estudados"]])+v+content+window.TO_CORE_DEEP.render('semestres')+window.TO_SEMESTER_EXPANDED.overview()+'<p class="to-footer-note">Notas e dados salvos somente no navegador. Utilize o modelo como organização pessoal; ele não substitui sistemas oficiais da faculdade.</p>'));
}
function total(s){return s.subjects.reduce((n,d)=>n+d.topics.length,0)}
const viewSem=[["painel","▦ Painel"],["tabela","☷ Tabela de matérias"],["kanban","▤ Kanban"],["calendario","▦ Calendário"],["semana","☷ Agenda semanal"]];
function fieldSub(s,d,label,field,placeholder){const v=getSubject(s,d)[field];return '<label class="to-field">'+E(label)+'<input class="to-input" data-subject="'+s.number+'/'+d.id+'" data-field="'+E(field)+'" value="'+E(v)+'" placeholder="'+E(placeholder)+'" inputmode="'+(field.startsWith("g")||field.startsWith("w")||field==="attendance"?"decimal":"text")+'"></label>'}
function subjectCard(s,d){
const v=getSubject(s,d),n=d.topics.filter(t=>S.completed.includes(t.id)).length,total=d.topics.length;
const progress=total?n/total*100:0;
const tags=d.custom?"DISCIPLINA PESSOAL":"DISCIPLINA · "+s.title;
const control='<details class="to-disclosure"><summary>Notas e frequência · editar</summary><div class="to-grid2" style="margin-top:12px">'+fieldSub(s,d,"Avaliação 1 (0–10)","g1","Nota")+fieldSub(s,d,"Peso 1 (%)","w1","50")+fieldSub(s,d,"Avaliação 2 (0–10)","g2","Nota")+fieldSub(s,d,"Peso 2 (%)","w2","50")+fieldSub(s,d,"Avaliação 3 (0–10)","g3","Nota")+fieldSub(s,d,"Peso 3 (%)","w3","0")+fieldSub(s,d,"Avaliação 4 (0–10)","g4","Nota")+fieldSub(s,d,"Peso 4 (%)","w4","0")+fieldSub(s,d,"Frequência informada (%)","attendance","Ex.: 85")+'</div><p><strong>Média das avaliações preenchidas:</strong> '+gradeAvg(v)+'</p><p class="to-compact">Pesos ajustáveis; média ponderada das avaliações informadas. Consulte as regras de avaliação da sua universidade.</p></details>';
return '<article class="to-card"><small>'+E(tags)+'</small><h3>'+E(d.title)+'</h3><p>'+E(d.custom?"Matéria personalizada para o seu curso. Registre avaliações, frequências e observações.":d.topics.map(t=>t.title).join(" • "))+'</p><div class="to-progress"><span style="width:'+progress+'%"></span></div><p class="to-meter">'+(d.custom?"Matéria cadastrada por você":"Assuntos estudados: "+n+"/"+total)+'</p>'+control+'<details class="to-disclosure"><summary>Minhas observações da disciplina</summary><textarea class="to-input" data-subject="'+s.number+'/'+d.id+'" data-field="notes" rows="5" placeholder="Ementa, professor, horários, dúvidas…">'+E(v.notes)+'</textarea></details><div class="to-actions">'+(d.custom?A.button("Excluir matéria","deleteCustomSubject",'data-sem="'+s.number+'" data-id="'+E(d.id)+'"',"danger"):'<span class="to-pill">Disciplina organizada neste semestre</span>')+'</div></article>';
}
let calendarOffset=0;
function monthCalendar(tasks){
const now=new Date(),first=new Date(now.getFullYear(),now.getMonth()+calendarOffset,1),y=first.getFullYear(),m=first.getMonth(),max=new Date(y,m+1,0).getDate(),offset=(first.getDay()+6)%7;
const days=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];const head='<div class="to-flex"><h2>'+new Intl.DateTimeFormat("pt-BR",{month:"long",year:"numeric"}).format(first)+'</h2><div class="to-actions">'+A.button("← Anterior","calendarPrev")+A.button("Próximo →","calendarNext")+'</div></div>';
let cells=days.map(d=>'<div class="to-cal-day off"><b>'+d+'</b></div>').join("");
for(let i=0;i<offset;i++)cells+='<div class="to-cal-day off"></div>';
for(let i=1;i<=max;i++){const k=y+"-"+String(m+1).padStart(2,"0")+"-"+String(i).padStart(2,"0"),events=tasks.filter(t=>t.date===k);cells+='<div class="to-cal-day"><b>'+i+'</b>'+events.map(t=>'<span class="to-cal-event">'+E(t.title)+'</span>').join("")+'</div>'}
return section("Calendário de entregas","Prazos cadastrados nas suas tarefas; utilize os botões para alternar meses.",head+'<div class="to-cal-grid">'+cells+'</div>');
}
function semesterDetail(parts){
initialTasks();const s=A.sem(parts[1]);if(!s){location.hash="#semestres";return}
A.crumb(["Caderno","Controle de Semestre",s.title]);const tasks=semTask(s),v=A.views("periodsemester",viewSem);
const sel='<div class="to-toolbar"><select id="semesterSelect" class="to-filter">'+window.TO_SEMESTERS.map(x=>'<option value="'+x.number+'" '+(x.number===s.number?"selected":"")+'>'+E(x.title)+'</option>').join("")+'</select>'+link("← Todos os períodos","#semestres")+'</div>';
const taskEntry=section("Nova tarefa do semestre","Registre prazos reais; as tarefas iniciais são apenas exemplos editáveis.",'<div class="to-grid3"><label class="to-field">Atividade<input id="newSemTitle" placeholder="Ex.: entregar relatório de estágio"></label><label class="to-field">Prazo<input id="newSemDate" type="date"></label><label class="to-field">Tipo<select id="newSemType">'+options(["estudar","fazer","revisar","prova","trabalho","estágio"],"fazer")+'</select></label></div><div class="to-actions">'+A.button("+ Adicionar tarefa","addSemTask",'data-sem="'+s.number+'"',"primary")+'</div>');
let body="";
if(S.views.periodsemester==="tabela"){
body=section("Disciplinas · modo tabela","Comparativo de períodos, notas parciais e leitura acadêmica.",A.table(["Disciplina","Média parcial","Frequência informada","Resumos estudados","Conteúdo"],semSubjects(s).map(d=>{const v=getSubject(s,d);return[E(d.title),gradeAvg(v),v.attendance?E(v.attendance)+"%":"—",d.topics.filter(t=>S.completed.includes(t.id)).length+"/"+d.topics.length,'<a href="#disciplina/'+s.number+'/'+d.id+'">Abrir →</a>']}))+A.gallery(semSubjects(s).map(d=>subjectCard(s,d))));
}else if(S.views.periodsemester==="kanban"){
body=section("Quadro Kanban · atividades","Altere status para acompanhar trabalho, leituras e avaliações.",'<div class="to-kanban">'+stages.map(st=>'<div class="to-column"><h3>'+E(st)+' · '+tasks.filter(t=>t.status===st).length+'</h3>'+tasks.filter(t=>t.status===st).map(t=>'<div class="to-task"><h4>'+E(t.title)+'</h4><small>'+E(t.type)+' · '+E(t.date||"Sem prazo")+(t.sample?" · exemplo":"")+'</small><select data-sem-task-status="'+E(t.id)+'">'+options(stages,t.status)+'</select>'+A.button("Excluir","deleteSemTask",'data-id="'+E(t.id)+'"',"danger")+'</div>').join("")+'</div>').join("")+'</div>')+taskEntry;
}else if(S.views.periodsemester==="calendario"){
body=monthCalendar(tasks)+taskEntry+section("Próximos prazos","Lista ordenada das atividades que possuem data.",A.table(["Atividade","Data","Status"],tasks.filter(t=>t.date).slice().sort((a,b)=>a.date.localeCompare(b.date)).map(t=>[E(t.title),E(t.date),E(t.status)])));
}else if(S.views.periodsemester==="semana"){
const days=["Segunda","Terça","Quarta","Quinta","Sexta"];
body=section("Minha agenda de estudos","Distribua seus blocos de estudo ao longo da semana. Horários são personalizados, não correspondem à grade da universidade.",'<div class="to-week">'+days.map((day,i)=>'<div class="to-day"><b>'+day+'</b><div class="to-event">'+E(semSubjects(s)[i%semSubjects(s).length].title)+'</div><textarea rows="5" class="to-input" data-store="weekPlans.'+s.number+'.'+i+'" placeholder="Minha rotina, horário, objetivos…">'+E(S.weekPlans?.[s.number]?.[i]||"")+'</textarea></div>').join("")+'</div>')+taskEntry;
}else{
body=A.stats([[semSubjects(s).length,"Disciplinas"],[total(s),"Assuntos"],[A.countRead(s.number),"Resumos estudados"],[tasks.filter(t=>t.status!=="Concluído").length,"Pendências"]])+
section("Disciplinas do período","Abra cada cartão para editar notas, pesos, frequência e observações. Nenhuma nota é presumida.",A.gallery(semSubjects(s).map(d=>subjectCard(s,d))))+
section("Personalizar minhas disciplinas","Adicione matérias da grade real da sua universidade sem alterar a biblioteca-modelo.",'<div class="to-toolbar"><input class="to-filter to-search" id="newCustomSubject" placeholder="Nome da nova disciplina">'+A.button("+ Adicionar disciplina","addCustomSubject",'data-sem="'+s.number+'"',"primary")+'</div>')+section("Entregas e atividades","Acompanhe prazos do semestre em formato de lista; alterne para Kanban ou calendário para outras visualizações.",A.table(["Tarefa","Prazo","Status","Ação"],tasks.map(t=>[E(t.title)+(t.sample?' <small>Exemplo</small>':''),E(t.date||"A definir"),E(t.status),A.button("Excluir","deleteSemTask",'data-id="'+E(t.id)+'"',"danger")]))+taskEntry)+section("Diário do semestre","Faça seu planejamento de aula, anote dificuldades, feedback de professores e metas.",editable("Notas gerais","semesterNotes."+s.number,S.semesterNotes[s.number]||"",7,"Plano semanal, dúvidas, datas importantes…"));
}
A.main(A.shell("semestres",s.title,sel+A.hero("MEU PERCURSO ACADÊMICO",s.title,s.focus+". Visualize matérias, organize tarefas e acompanhe sua evolução.",semNotice)+v+body+window.TO_DEPTH.semesterStudio(s)+window.TO_SEMESTER_PLUS.render(s)+window.TO_SEMESTER_EXPANDED.render(s)));
}
A.onAction("addCustomSubject",b=>{const title=$("#newCustomSubject")?.value.trim(),n=Number(b.dataset.sem);if(!title){A.toast("Informe o nome da disciplina.");return}S.customSubjects[n]=S.customSubjects[n]||[];S.customSubjects[n].push({id:"p-"+Date.now(),title});A.save();A.render(true);A.toast("Disciplina adicionada ao semestre.")});
A.onAction("deleteCustomSubject",b=>{const n=Number(b.dataset.sem);S.customSubjects[n]=(S.customSubjects[n]||[]).filter(x=>x.id!==b.dataset.id);A.save();A.render(true)});
A.onAction("addSemTask",b=>{const title=$("#newSemTitle")?.value.trim(),date=$("#newSemDate")?.value||"",type=$("#newSemType")?.value||"fazer";if(!title){A.toast("Descreva a atividade.");return}S.tasks.push({id:"st"+Date.now(),semester:Number(b.dataset.sem),title,date,type,status:"A fazer"});A.save();A.render(true);A.toast("Atividade adicionada.")});
A.onAction("deleteSemTask",b=>{S.tasks=S.tasks.filter(x=>x.id!==b.dataset.id);A.save();A.render(true)});
A.onAction("calendarNext",()=>{calendarOffset++;A.render(true)});
A.onAction("calendarPrev",()=>{calendarOffset--;A.render(true)});
document.addEventListener("input",e=>{if(e.target.dataset.subject&&e.target.dataset.field){const [n,id]=e.target.dataset.subject.split("/"),d=A.discipline(n,id)||(S.customSubjects?.[n]||[]).find(x=>x.id===id);if(!d)return;getSubject(A.sem(n),d)[e.target.dataset.field]=e.target.value;A.save()}});
document.addEventListener("change",e=>{
if(e.target.id==="semesterSelect"){location.hash="#semestre/"+e.target.value;return}
if(e.target.dataset.semTaskStatus){const t=S.tasks.find(x=>x.id===e.target.dataset.semTaskStatus);if(t){t.status=e.target.value;A.save();A.render(true)}}
if(e.target.dataset.subject&&e.target.dataset.field&&e.target.dataset.field!=="notes"){A.render(true)}
});
A.register("tcc",tcc);
A.register("pesquisa",research);
A.register("semestres",semesterIndex);
A.register("semestre",semesterDetail);
})();