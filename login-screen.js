/* Acesso local simplificado: guarda o primeiro e-mail informado neste navegador.
   Não consulta vendas, provedores de e-mail ou serviços de autenticação. */
(()=>{
"use strict";
const KEY="to-caderno-compra-email-v1";
const ACTIVE="to-caderno-compra-active-v1";
const $=selector=>document.querySelector(selector);
const canonical=value=>String(value??"").trim().toLocaleLowerCase("pt-BR");
const read=key=>{try{return localStorage.getItem(key)}catch(_){return null}};
const write=(key,value)=>{try{localStorage.setItem(key,value);return localStorage.getItem(key)===value}catch(_){return false}};
const escape=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const registered=()=>read(KEY)||"";
const isAllowed=()=>Boolean(registered()&&read(ACTIVE)==="1");
const initialTitle=document.title;
const loginScreen=already=>{
 const message=already?
 "Que bom ter você de volta! Entre com o mesmo e-mail do seu primeiro acesso neste navegador.":
 "Seu espaço de aprendizagem está prontinho para começar. Use o e-mail que você informou na compra.";
 return '<section class="auth-page" aria-labelledby="auth-title"><div class="auth-canvas" aria-hidden="true">'+
 '<span class="auth-scribble auth-scribble-a">✦</span><span class="auth-scribble auth-scribble-b">✳</span>'+
 '<span class="auth-scribble auth-scribble-c">✿</span><span class="auth-scribble auth-scribble-d">✧</span></div>'+
 '<div class="auth-layout"><div class="auth-inspiration">'+
 '<div class="auth-brand"><span class="auth-brand-mark">TO</span><span>CADERNO DO ESTUDANTE<br>TERAPIA OCUPACIONAL</span></div>'+
 '<span class="auth-kicker">SEU ESPAÇO ACADÊMICO</span>'+
 '<h1>Seu próximo passo <em>começa aqui.</em></h1>'+
 '<p>Um caderno cheio de possibilidades para estudar, organizar suas ideias e construir sua trajetória com confiança.</p>'+
 '<div class="auth-notes" aria-hidden="true"><div class="auth-paper auth-paper-lav"><b>✿ Meu cantinho de estudos</b><span>Aprender no meu ritmo</span></div>'+
 '<div class="auth-paper auth-paper-mint"><b>✦ Organizar e conquistar</b><span>Uma etapa de cada vez</span></div>'+
 '<div class="auth-paper auth-paper-peach"><b>♡ Tudo em um só lugar</b><span>Do primeiro semestre à profissão</span></div></div></div>'+
 '<div class="auth-form-wrap"><div class="auth-form-card"><div class="auth-card-sticker" aria-hidden="true">✳</div>'+
 '<span class="auth-welcome">'+(already?"BOM TER VOCÊ DE VOLTA":"SEJA MUITO BEM-VINDO(A)")+'</span>'+
 '<h2 id="auth-title">'+(already?"Seu caderno espera por você!":"Que alegria ter você aqui!")+'</h2>'+
 '<p class="auth-intro">'+escape(message)+'</p>'+
 '<form id="to-login-form" novalidate><label for="auth-email">E-mail utilizado na compra</label>'+
 '<div class="auth-input-wrap"><span aria-hidden="true">✉</span><input id="auth-email" name="email" type="text" inputmode="email" autocomplete="email" maxlength="254" spellcheck="false" autocapitalize="none" placeholder="Digite seu e-mail de compra" required aria-describedby="auth-email-hint auth-error"></div>'+
 '<p id="auth-email-hint" class="auth-help">'+(already?
 "Use o e-mail cadastrado no seu primeiro acesso neste navegador.":
 "No primeiro acesso, o e-mail digitado ficará associado a este navegador, mesmo se houver alguma letra diferente.")+'</p>'+
 '<p id="auth-error" class="auth-error" role="alert" aria-live="polite" hidden></p>'+
 '<button type="submit" class="auth-submit">Entrar no meu caderno <span aria-hidden="true">→</span></button>'+
 '</form><p class="auth-reassurance"><span aria-hidden="true">✦</span> Simples, acolhedor e feito para acompanhar sua jornada.</p>'+
 '<p class="auth-footnote">Este acesso é lembrado somente neste navegador. Não há verificação automática da compra.</p>'+
 '</div><div class="auth-after"><span aria-hidden="true">♡</span> A sua jornada merece um lugar especial.</div></div></div></section>';
};
function show(){
 document.body.classList.add("login-locked");
 document.title="Seu acesso | Caderno de Terapia Ocupacional";
 const app=$("#app");if(app)app.innerHTML=loginScreen(Boolean(registered()));
 const signout=$("#to-signout");if(signout)signout.hidden=true;
}
function decorate(){
 document.body.classList.remove("login-locked");
 document.title=initialTitle;
 const signout=$("#to-signout");if(signout)signout.hidden=false;
}
function error(msg){
 const feedback=$("#auth-error");
 if(feedback){feedback.textContent=msg;feedback.hidden=false}
 const input=$("#auth-email");
 if(input){input.setAttribute("aria-invalid","true");input.focus()}
}
function enter(value){
 const typed=canonical(value);
 if(!typed){error("Digite seu e-mail para abrir o seu caderno.");return false}
 const previous=registered();
 if(previous&&canonical(previous)!==typed){
 error("Este navegador já tem um e-mail de primeiro acesso. Digite o mesmo que você usou antes para continuar.");
 return false;
 }
 if(!previous&&!write(KEY,typed)){
 error("Não conseguimos guardar seu acesso neste navegador. Verifique se o armazenamento está permitido.");
 return false;
 }
 if(!write(ACTIVE,"1")){
 error("Não foi possível salvar sua entrada. Verifique as permissões do navegador e tente novamente.");
 return false;
 }
 decorate();
 window.TO_APP.render();
 return true;
}
function signOut(){
 if(!registered())return;
 if(!write(ACTIVE,"0"))return;
 show();
 const field=$("#auth-email");if(field)field.focus();
}
document.addEventListener("submit",event=>{
 if(!event.target||event.target.id!=="to-login-form")return;
 event.preventDefault();
 const input=$("#auth-email");enter(input?input.value:"");
});
document.addEventListener("input",event=>{
 if(event.target?.id!=="auth-email")return;
 event.target.removeAttribute("aria-invalid");
 const feedback=$("#auth-error");if(feedback){feedback.hidden=true;feedback.textContent=""}
});
document.addEventListener("click",event=>{
 const button=event.target?.closest?.("#to-signout");
 if(button){event.preventDefault();signOut()}
});
window.TO_LOGIN={isAllowed,show,decorate,enter,signOut,registered};
})();