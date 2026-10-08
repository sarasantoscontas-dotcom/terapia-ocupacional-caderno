/* Perguntas específicas baseadas nos textos originais adicionais — revisão contextual. */
(()=>{const slug=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const deeper=window.TO_SEMESTERS.flatMap(s=>s.subjects.filter(d=>d.expanded&&d.topics.some(t=>t.criterion)).flatMap(d=>d.topics.filter(t=>t.criterion).map((t,i)=>({s,d,t,i}))));
const result=[];
for(const {s,d,t,i} of deeper){
 result.push({id:"dp-a-"+s.number+"-"+d.id+"-"+t.id,semester:s.number,disciplineId:d.id,title:"Análise ocupacional · "+t.title,q:"Que informações observáveis devem ser documentadas ao estudar "+t.title.toLowerCase()+"?",a:t.criterion,concept:t.reasoning,extra:true});
 result.push({id:"dp-b-"+s.number+"-"+d.id+"-"+t.id,semester:s.number,disciplineId:d.id,title:"Julgamento crítico · "+t.title,q:"Qual erro de raciocínio deve ser evitado na análise de "+t.title.toLowerCase()+"?",a:t.pitfall,concept:t.concept,extra:true});
 if(i%2===0)result.push({id:"dp-c-"+s.number+"-"+d.id+"-"+t.id,semester:s.number,disciplineId:d.id,title:"Situação prática · "+t.title,q:"Considere esta situação: "+t.application+" Que raciocínio deve orientar a decisão?",a:t.reasoning+" Critérios de observação: "+t.criterion,concept:t.application,extra:true});
}
window.TO_FLASH_DEPTH=result;
const previous=window.TO_GET_DECK;
window.TO_GET_DECK=(n,d)=>[...previous(n,d),...result.filter(t=>t.semester===Number(n)&&t.disciplineId===d.id)];
})();