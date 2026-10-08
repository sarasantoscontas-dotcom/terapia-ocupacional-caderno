/* Estúdios adicionais integrados exclusivamente aos seis módulos. Os exemplos são fictícios. */
(()=>{
"use strict";
const A=window.TO_APP,S=A.state,E=A.escape;
S.depth=S.depth||{};
const D=S.depth;
D.reading=D.reading||{};D.bibliography=D.bibliography||{};D.customCards=D.customCards||[];
D.tcc=D.tcc||{};D.research=D.research||{};D.semesters=D.semesters||{};
D.flashMode=D.flashMode||"todos";D.flashShuffle=!!D.flashShuffle;
const ensure=(obj,key,make)=>obj[key]||(obj[key]=make());
const save=()=>A.save();
const input=(label,key,value="",rows=3,hint="")=>'<label class="to-field">'+E(label)+'<textarea rows="'+rows+'" class="to-input" data-depth-field="'+E(key)+'" placeholder="'+E(hint)+'">'+E(value)+'</textarea></label>';
const box=(title,desc,body)=>'<section class="to-section depth-panel"><div class="to-flex"><h2>'+E(title)+'</h2><span class="to-pill">Editável</span></div>'+(desc?'<p>'+E(desc)+'</p>':"")+body+'</section>';
const checklist=(key,items)=>'<div class="to-depth-checks">'+items.map((text,i)=>'<label class="to-check"><input type="checkbox" data-depth-check="'+E(key)+'" data-index="'+i+'" '+(D.checks?.[key]?.includes(i)?"checked":"")+'><span>'+E(text)+'</span></label>').join("")+'</div>';
const editor=(key,label,value="",rows=3)=>input(label,key,value,rows,"Escreva seu registro pessoal; não utilize dados identificáveis de pacientes.");
function summaryLibrary(){
const s=ensure(D,"summaryPlanner",()=>({
focus:"Exemplo de planejamento: fundamentos da ocupação, avaliação e direitos",
weekly:"Segunda: leitura fundamentada. Quarta: registrar aplicações ocupacionais. Sexta: responder questões sem consultar o resumo.",
sources:"Começar pelo OTPF-4 (AOTA) para categorias ocupacionais e pela CIF (OMS) para funcionalidade e barreiras ambientais.",
question:"Como uma barreira contextual altera o desempenho de uma ocupação valorizada?"
}));
return '<details class="to-disclosure depth-entry"><summary>Meu plano de leitura e aprofundamento dos resumos</summary><p>Exemplo preenchido para adaptação pessoal, separado da biblioteca de conteúdos.</p><div class="to-grid2">'+editor("summaryPlanner.focus","Foco da semana",s.focus)+editor("summaryPlanner.weekly","Rotina de revisão",s.weekly)+editor("summaryPlanner.sources","Referenciais a verificar",s.sources)+editor("summaryPlanner.question","Pergunta norteadora",s.question)+'</div>'+checklist("summary-study",["Ler o conceito e localizar ideias centrais","Identificar barreiras e facilitadores da situação didática","Registrar relação com disciplina correlata","Responder a pergunta sem consultar o texto","Conferir limites e fonte primária antes de citar"])+'</details>';
}
function summaryDetail(t,s,d){
const k=t.id,r=ensure(D.reading,k,()=>({
application:"Exemplo fictício de aplicação: "+t.application,
analysis:"Raciocínio inicial: "+t.reasoning,
evidence:"Referência de aprofundamento a conferir: "+(window.TO_SOURCES.find(x=>x.id===d.ref)?.title||"Referenciais da Terapia Ocupacional")+". Registrar páginas da edição realmente consultada.",
plan:"Objetivo ocupacional: identificar uma atividade significativa, barreiras, facilitadores e um critério de participação acompanhado.",
reflection:"Questão crítica: "+(t.pitfall||"Quais explicações alternativas podem justificar a dificuldade?"),
revision:"Resposta para conferir após tentativa pessoal: "+t.a
}));
return '<div class="depth-reading">'+box("Caderno aplicado ao assunto","Os exemplos estão preenchidos e identificados como didáticos. Você pode editar cada campo para construir seu próprio fichamento.",'<div class="to-grid2">'+editor("reading."+k+".application","Situação de aprendizagem",r.application,5)+editor("reading."+k+".analysis","Interpretação e hipóteses",r.analysis,5)+editor("reading."+k+".evidence","Fonte e conceitos a conferir",r.evidence,5)+editor("reading."+k+".plan","Objetivo e estratégia de acompanhamento",r.plan,5)+editor("reading."+k+".reflection","Raciocínio crítico e cuidados",r.reflection,4)+editor("reading."+k+".revision","Minha resposta de revisão",r.revision,4)+'</div>')+
box("Análise de evidências e limites","Um estudo, diretriz ou manual deve ser lido e conferido antes de justificar escolhas reais.",'<details class="to-disclosure"><summary>Quais dados merecem atenção?</summary><p>'+(t.criterion?E(t.criterion):E("Registrar contexto, ocupação escolhida, demandas e desfechos pertinentes."))+'</p></details><details class="to-disclosure"><summary>Que interpretação deve ser evitada?</summary><p>'+E(t.pitfall||"Não concluir a partir de diagnóstico, escala ou situação isolada sem dados e contexto suficientes.")+'</p></details>'+checklist("summary-"+k,["Identifiquei os conceitos centrais deste assunto","Diferenciei fatos observados e hipóteses","Interpretei a situação ocupacional fictícia","Relacionei os possíveis facilitadores e barreiras","Consultei ou registrei uma fonte para aprofundar","Respondi a questão e registrei minhas dúvidas"]));
}
const categories=["Não iniciado","Para consultar","Em leitura","Fichado","Usado no meu trabalho"];
function bibliographyHeader(){
return '<details class="to-disclosure depth-entry"><summary>Organização pessoal do meu fichário bibliográfico</summary><p>Acompanhe o uso das obras e registre sua finalidade. Não há links externos nem referências acadêmicas criadas automaticamente.</p>'+
'<div class="to-grid2">'+editor("bibGlobal.plan","Plano de consulta","Exemplo: consultar OTPF-4 para domínio, CIF para barreiras ambientais e artigos originais para resultados de intervenções.")+editor("bibGlobal.method","Critérios de leitura","Exemplo: conferir título, autoria, edição, método, população e limites da publicação.")+'</div>'+
checklist("bibliography-global",["Conferi o título e a autoria da fonte","Registrei edição e dados necessários à referência","Distingui conceito teórico de resultado empírico","Registrei limites e pertinência para a disciplina","Não inseri páginas, citações ou DOI não conferidos"])+'</details>';
}
function bibliographyCard(s){
const b=ensure(D.bibliography,s.id,()=>({status:"Não iniciado",context:"Exemplo de uso em estudo: "+s.note,source:"Conferir autoria, edição, capítulo e paginação da obra original.",critical:"Leitura crítica a produzir após consultar o documento."}));
return '<details class="to-disclosure depth-bib"><summary>Meu fichamento detalhado e andamento</summary><label class="to-field">Andamento<select class="to-filter" data-depth-bib-status="'+E(s.id)+'">'+categories.map(x=>'<option value="'+E(x)+'" '+(x===b.status?"selected":"")+'>'+E(x)+'</option>').join("")+'</select></label>'+editor("bibliography."+s.id+".context","Para que serve no meu caderno",b.context)+editor("bibliography."+s.id+".source","Identificação bibliográfica a verificar",b.source)+editor("bibliography."+s.id+".critical","Limites, ideias e questões críticas",b.critical)+'</details>';
}
function flashRoot(){
return '<details class="to-disclosure depth-entry" open><summary>Revisão personalizada e criação de flashcards próprios</summary><p>Use filtros de revisão e crie perguntas originais para estudar disciplinas específicas. A interface mantém os cartões sem contadores fixos.</p>'+
'<div class="to-grid2"><label class="to-field">Estratégia de revisão<select id="depthFlashMode" class="to-filter">'+[["todos","Todas as questões"],["pendentes","Priorizar cartões não dominados"],["dificeis","Revisar difíceis e erros"]].map(([key,label])=>'<option value="'+key+'" '+(D.flashMode===key?"selected":"")+'>'+label+'</option>').join("")+'</select></label><label class="to-check"><input type="checkbox" id="depthFlashShuffle" '+(D.flashShuffle?"checked":"")+'> Alternar a ordem de apresentação</label></div>'+
'<div class="to-grid2"><label class="to-field">Disciplina para meu cartão<select id="depthCardDiscipline" class="to-filter">'+window.TO_SEMESTERS.flatMap(s=>s.subjects.map(d=>'<option value="'+s.number+'|'+E(d.id)+'">'+E(s.title+" · "+d.title)+'</option>')).join("")+'</select></label><label class="to-field">Categoria / assunto<input id="depthCardTitle" class="to-input" placeholder="Ex.: participação e contexto"></label></div>'+
'<div class="to-grid2"><label class="to-field">Pergunta<input id="depthCardQuestion" class="to-input" placeholder="Pergunta que exige recordar e explicar o conceito"></label><label class="to-field">Resposta explicativa<textarea id="depthCardAnswer" class="to-input" rows="3" placeholder="Resposta fundamentada, sem dados de pacientes"></textarea></label></div>'+
'<div class="to-actions">'+A.button("+ Salvar meu flashcard","depthAddFlash",'',"primary")+A.button("Gerenciar meus cartões","depthMyFlash")+'</div></details>';
}
const sampleTcc={
problem:"Exemplo didático: quais barreiras ambientais interferem na participação no brincar de crianças com deficiência em praças públicas de um município?",
theory:"Conceitos a contextualizar: ocupação e brincar no OTPF-4, atividade/participação e fatores ambientais na CIF, inclusão e direito ao brincar.",
design:"Possível estudo qualitativo exploratório: observação dos ambientes e entrevistas, apenas após avaliação de requisitos éticos e autorizações pertinentes.",
sources:"Registre publicações que você encontrou e leu, com título, ano, seção e crítica; não fabrique referências.",
limits:"Amostra localizada não descreve necessariamente todos os parques, crianças ou cidades; reconhecer vieses e experiências não representadas.",
defense:"Justificar por que a pergunta investiga participação e quais procedimentos realmente permitem responder à questão.",
feedback:"Exemplo de apontamento do orientador (fictício): delimitar faixa etária e selecionar critérios de acessibilidade observáveis.",
abstract:"Rascunho orientador: contextualização do problema, objetivo investigável, método compatível, achados somente após realização e conclusão limitada pelos dados."
};
function tccStudio(){
const v=ensure(D,"tccStudio",()=>({...sampleTcc}));
return '<details class="to-disclosure depth-entry" open><summary>Meu estúdio de elaboração e defesa do TCC — projeto preenchido como exemplo</summary><p>Os textos iniciais abaixo ilustram um projeto possível em Terapia Ocupacional. Não são um TCC produzido, estudo realizado ou resultados coletados.</p><div class="to-grid2">'+[
["problem","Delimitação e problema"],["theory","Referencial teórico e modelos de TO"],["design","Desenho e procedimento metodológico"],["sources","Rastreabilidade das fontes"],["limits","Vieses e limitações antecipadas"],["defense","Argumentação para a banca"],["feedback","Reuniões e feedback de orientação"],["abstract","Estrutura de resumo científico"]
].map(([k,label])=>editor("tccStudio."+k,label,v[k],4)).join("")+'</div>'+
checklist("tcc-studio",["Problema, objetivos e método têm coerência explícita","Fontes que sustentam a justificativa foram consultadas","Aspectos éticos foram discutidos com a orientação","A redação distingue hipóteses de resultados reais","Cronograma e responsáveis refletem os prazos institucionais","Capítulos foram revisados e referências conferidas","Slides acessíveis e respostas da banca foram ensaiados"])+'</details>';
}
const sampleResearch={
question:"Exemplo didático: como estudantes de Terapia Ocupacional descrevem barreiras de acessibilidade em ambientes de aprendizagem?",
search:"Estratégia inicial a validar na base: (occupational therapy students) AND (accessibility OR participation) AND (university). Adaptar descritores e sinônimos à pergunta.",
selection:"Exemplo de critério: estudos sobre acessibilidade e participação no ensino superior com método e contexto identificados. Refinar população e escopo.",
appraisal:"Registrar desenho, amostra, instrumentos, limites e pertinência dos resultados; não confundir correlação com causalidade.",
discussion:"Questão para debate em aula: dificuldade de acesso pode decorrer de ambiente e práticas institucionais, e não exclusivamente de fatores individuais.",
methods:"Comparar entrevista qualitativa sobre experiências, auditoria ambiental e levantamento quantitativo: cada desenho responde perguntas diferentes.",
report:"Organizar slides com pergunta, contexto, abordagem proposta, fontes reais e limites; resultados só após coleta autorizada.",
ethics:"Nenhum dado pessoal de colegas ou pacientes é necessário para atividades demonstrativas; em pesquisa real, cumprir as exigências éticas aplicáveis."
};
function researchStudio(){
const v=ensure(D,"researchStudio",()=>({...sampleResearch}));
return '<details class="to-disclosure depth-entry" open><summary>Laboratório de pesquisa em sala: métodos, fontes e atividades</summary><p>Roteiro acadêmico preenchido com uma situação simulada. Os campos podem ser editados para trabalhos reais com orientação e pesquisa ética.</p><div class="to-grid2">'+[
["question","Pergunta investigável e contexto"],["search","Estratégia piloto de busca"],["selection","Critérios de seleção e elegibilidade"],["appraisal","Leitura e avaliação crítica"],["methods","Comparação de desenhos metodológicos"],["discussion","Questões para debate e seminário"],["report","Roteiro de comunicação dos achados"],["ethics","Cuidados éticos e integridade"]
].map(([k,label])=>editor("researchStudio."+k,label,v[k],4)).join("")+'</div>'+
checklist("research-studio",["Transformei um tema amplo em pergunta delimitada","Identifiquei termos e critérios da busca nas bases pertinentes","Conferi desenho e limitações das fontes lidas","Distingui achados reais de exemplos didáticos","Documentei mudanças do protocolo ou roteiro","Preparei questões e argumentos para discussão em aula","Registrei recomendações compatíveis com a evidência"])+'</details>';
}
const weekdays=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
function semesterStudio(s){
const v=ensure(D.semesters,s.number,()=>({
goal:"Exemplo ilustrativo: manter leituras semanais, registrar dúvidas e concluir entregas sem deixar revisões para o fim do período.",
support:"Exemplo: monitoria, calendário da universidade, PPC, biblioteca e discussões com docentes.",
risk:"Exemplo: acúmulo de provas ou deslocamento demorado; reorganizar tarefas e buscar apoio institucional quando necessário.",
slots:{},attendance:[],memo:""
}));
const subjects=s.subjects;
const schedule='<div class="depth-week-grid">'+weekdays.map((day,i)=>'<div class="depth-week-day"><strong>'+day+'</strong><label class="to-field">Bloco A<input class="to-input" data-depth-schedule="'+s.number+'" data-day="'+i+'" data-slot="a" value="'+E(v.slots[i+"a"]||"")+'" placeholder="'+E(subjects[i%subjects.length].title)+'"></label><label class="to-field">Bloco B<input class="to-input" data-depth-schedule="'+s.number+'" data-day="'+i+'" data-slot="b" value="'+E(v.slots[i+"b"]||"")+'" placeholder="Horário / disciplina"></label></div>').join("")+'</div>';
const attendance=v.attendance.map((row,i)=>'<tr><td>'+E(row.date)+'</td><td>'+E(row.subject)+'</td><td>'+E(row.presence)+'</td><td>'+A.button("Excluir","depthRemoveAttendance",'data-sem="'+s.number+'" data-index="'+i+'"')+'</td></tr>').join("");
const total=v.attendance.length,present=v.attendance.filter(r=>r.presence==="Presença").length;
return '<details class="to-disclosure depth-entry"><summary>Meu centro de organização: horários, aulas, metas e frequência</summary><p>Plano do período, agenda editável e registro pessoal de presença. Os valores de exemplo são ilustrativos e não representam o histórico oficial da faculdade.</p><div class="to-grid2">'+editor("semesters."+s.number+".goal","Objetivo de aprendizagem do período",v.goal)+editor("semesters."+s.number+".support","Fontes de apoio e recursos",v.support)+editor("semesters."+s.number+".risk","Barreiras previsíveis e plano de ação",v.risk)+editor("semesters."+s.number+".memo","Diário do semestre",v.memo)+'</div><h3>Quadro semanal de aulas e estudos</h3>'+schedule+
'<h3 style="margin-top:19px">Meu registro de presença em aulas</h3><p class="to-muted">Registros manuais: '+present+' presença(s) em '+total+' aula(s) informada(s). Frequência oficial deve ser conferida no sistema acadêmico.</p><div class="to-grid3"><label class="to-field">Dia<input id="depthAttendanceDate" type="date" class="to-input"></label><label class="to-field">Disciplina<select class="to-filter" id="depthAttendanceSubject">'+subjects.map(d=>'<option value="'+E(d.title)+'">'+E(d.title)+'</option>').join("")+'</select></label><label class="to-field">Registro<select class="to-filter" id="depthAttendanceValue"><option>Presença</option><option>Falta</option><option>Justificada</option></select></label></div><div class="to-actions">'+A.button("Registrar aula","depthAddAttendance",'data-sem="'+s.number+'"',"primary")+'</div>'+
'<div class="to-table-wrap"><table class="to-table"><thead><tr><th>Data</th><th>Disciplina</th><th>Situação</th><th></th></tr></thead><tbody>'+attendance+'</tbody></table></div>'+
checklist("sem-"+s.number,["Conferi ementas e plano de ensino da faculdade","Registrei provas, leituras e entregas principais","Revisei pré-requisitos e horários reais","Organizei metas por disciplina e necessidades de apoio","Verifiquei feedback do professor e progresso dos estudos"])+'</details>';
}
A.onAction("depthAddFlash",()=>{
const val=A.$("#depthCardDiscipline")?.value||"",title=A.$("#depthCardTitle")?.value.trim(),q=A.$("#depthCardQuestion")?.value.trim(),answer=A.$("#depthCardAnswer")?.value.trim();
const parts=val.split("|");if(!parts[1]||!q||!answer){A.toast("Escolha a disciplina e preencha pergunta e resposta.");return}
D.customCards.push({id:"own-"+Date.now()+"-"+Math.floor(Math.random()*1000),semester:Number(parts[0]),disciplineId:parts[1],title:title||"Meu cartão de estudo",q,a:answer,concept:answer,extra:true,personal:true});
save();A.render(true);A.toast("Seu cartão foi salvo no baralho da disciplina.");
});
A.onAction("depthMyFlash",()=>{location.hash="#flashcards-meus"});
A.onAction("depthDeleteCard",b=>{D.customCards=D.customCards.filter(c=>c.id!==b.dataset.id);save();A.render(true)});
A.onAction("depthRemoveAttendance",b=>{const records=D.semesters[b.dataset.sem]?.attendance;if(records){records.splice(Number(b.dataset.index),1);save();A.render(true)}});
A.onAction("depthAddAttendance",b=>{
 const date=A.$("#depthAttendanceDate")?.value,subject=A.$("#depthAttendanceSubject")?.value,presence=A.$("#depthAttendanceValue")?.value;
 if(!date||!subject){A.toast("Informe a data e a disciplina.");return}
 const rec=ensure(D.semesters,Number(b.dataset.sem),()=>({goal:"",support:"",risk:"",slots:{},attendance:[],memo:""}));
 rec.attendance=rec.attendance||[];rec.attendance.push({date,subject,presence});rec.attendance.sort((a,b)=>b.date.localeCompare(a.date));save();A.render(true);
});
A.register("flashcards-meus",()=>{
 A.crumb(["Caderno","Flashcards","Cartões próprios"]);
 const cards=D.customCards.map(c=>'<article class="to-card"><small>MEU CARTÃO · '+E(c.title)+'</small><h3>'+E(c.q)+'</h3><details class="to-disclosure"><summary>Ver resposta</summary><p>'+E(c.a)+'</p></details>'+A.button("Excluir cartão","depthDeleteCard",'data-id="'+E(c.id)+'"')+'</article>');
 A.main(A.shell("flashcards","Meus Cartões",'<div class="to-actions"><a class="to-btn" href="#flashcards">← Voltar aos Flashcards</a></div>'+A.hero("MEUS FLASHCARDS","Cartões que eu criei","Perguntas pessoais vinculadas aos baralhos das respectivas disciplinas.")+(cards.length?A.gallery(cards):'<div class="to-empty">Você ainda não cadastrou cartões próprios. Volte à página de Flashcards para criar.</div>')));
});
document.addEventListener("input",e=>{
const path=e.target.dataset.depthField;if(path){A.setPath("depth."+path,e.target.value)}
const sem=e.target.dataset.depthSchedule;if(sem){const rec=ensure(D.semesters,Number(sem),()=>({slots:{},attendance:[]}));rec.slots=rec.slots||{};rec.slots[e.target.dataset.day+e.target.dataset.slot]=e.target.value;save()}
});
document.addEventListener("change",e=>{
const ch=e.target.dataset.depthCheck;if(ch){D.checks=D.checks||{};const array=D.checks[ch]||[];const i=Number(e.target.dataset.index);D.checks[ch]=e.target.checked?[...new Set([...array,i])]:array.filter(n=>n!==i);save()}
const bib=e.target.dataset.depthBibStatus;if(bib){const record=D.bibliography[bib];if(record){record.status=e.target.value;save()}}
if(e.target.id==="depthFlashMode"){D.flashMode=e.target.value;save()}
if(e.target.id==="depthFlashShuffle"){D.flashShuffle=e.target.checked;save()}
});
const previous=window.TO_GET_DECK;
window.TO_GET_DECK=(n,d)=>{
 const original=[...previous(n,d),...D.customCards.filter(c=>c.semester===Number(n)&&c.disciplineId===d.id)];
 let selected=D.flashMode==="dificeis"?original.filter(c=>["rever","dificil"].includes(S.flashLevels[c.id])):D.flashMode==="pendentes"?original.filter(c=>S.flashLevels[c.id]!=="dominei"):original;
 if(!selected.length)selected=original;
 if(D.flashShuffle)selected=selected.slice().sort((a,b)=>(a.id.charCodeAt(a.id.length-1)%17)-(b.id.charCodeAt(b.id.length-1)%17)||a.id.localeCompare(b.id));
 return selected;
};
window.TO_DEPTH={summaryLibrary,summaryDetail,bibliographyHeader,bibliographyCard,flashRoot,tccStudio,researchStudio,semesterStudio};
})();