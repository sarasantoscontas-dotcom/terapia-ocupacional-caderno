# Caderno do Estudante de Terapia Ocupacional

Aplicação web responsiva e modular, com visual claro inspirado na organização do Caderno de Administração e nas visualizações de páginas e bancos de dados do Notion. Todo o conteúdo foi adaptado para **Terapia Ocupacional**; não se trata de versão renomeada de Administração.

## Estado do projeto — 8 de outubro de 2026

- **6 ambientes independentes**: Resumos, Flashcards, Bibliografia, TCC, Pesquisa Acadêmica e Controle de Semestre.
- **8 semestres-modelo**, **64 disciplinas** e **128 assuntos com resumos**, organizados pela rota período → disciplina → assunto → texto.
- **80 novos flashcards originais** além daqueles derivados da biblioteca de assuntos. As telas de Flashcards não mostram totalizadores de matérias, decks ou cartões; os números mudam conforme a expansão.
- **122 fichas de bibliografia**, incluindo **110 novos cartões** com título, autoria/instituição quando aplicável, finalidade e organização temática. **Não há links externos na interface de Bibliografia.**
- **49 ferramentas editáveis de TCC**, com catálogos por categoria, registros de evidência, checklists, cronogramas, matrizes, Kanban e impressão/exportação individual.
- **54 ferramentas editáveis de Pesquisa Acadêmica**, com coleta de notas, revisão, planejamento, métodos, ética, análise, textos e histórico local.
- **21 ambientes adicionais de Controle de Semestre** para horários, presença autodeclarada, provas, trabalhos, leituras, projetos, estágio, autoavaliação, custos, fichamentos, portfólio e organização da vida acadêmica, além das ferramentas já existentes de notas ponderadas, tarefas, quadros, calendário e agenda semanal.

### Navegação isolada

No interior de cada módulo, a barra lateral mostra **somente aquele módulo** e seus links internos, com opção de voltar à página inicial. Evitar listagens de outros módulos em páginas internas, especialmente Resumos e Flashcards.

### Visualizações e recursos

- **Bibliotecas:** galeria, tabela, trilha, páginas aninhadas por semestre/disciplinas e tópicos expandíveis.
- **Estudo:** leitura marcada, favoritos, notas, impressão de resumos, revisão de perguntas com resposta oculta e classificação de domínio.
- **Bibliografia:** fichas de consulta com notas pessoais, pesquisa por termos, filtro por área e semestre, inclusão de novas fichas sem obrigatoriedade de URL.
- **Produção acadêmica:** editor próprio, registros de etapas, quadros Kanban, acompanhamento, checklists, bibliotecas de ferramentas e exportação JSON individual.
- **Semestres:** quatro avaliações por disciplina com pesos ajustáveis, frequências informadas pelo aluno, disciplinas pessoais, agenda, lista de entregas, calendário, quadros e área ampliada de organização.

## Arquitetura e scripts

Aplicação de arquivos estáticos (HTML, CSS, JavaScript). Abrir `index.html` em navegador moderno ou disponibilizar em hospedagem estática HTTPS, sem etapa de build.

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Carregamento ordenado dos módulos |
| `styles.css` | Identidade clara, responsividade e estilos dos workspaces |
| `curriculum.js` | Matriz inicial e fundamentos acadêmicos |
| `curriculum-extra-a.js`, `curriculum-extra-b.js` | Disciplinas e resumos adicionais |
| `library.js` | Bases bibliográficas e conteúdo inicial de TCC e pesquisa |
| `bibliography-expansion.js` | Biblioteca temática estendida |
| `flashcards-expansion.js` | Novos cartões específicos de revisão |
| `toolkit-data.js` | Catálogos de funcionalidades de TCC e Pesquisa |
| `app.js` | Dashboard, rotas, busca, componentes e estado local |
| `toolkit-ui.js` | Editores, matrizes, checklists, prazos e exportação por ferramenta |
| `semester-plus.js` | Organização ampliada de cada semestre |
| `views-study.js` | Interface de Resumos, Flashcards e Bibliografia |
| `views-workspaces.js` | Interface de TCC, Pesquisa e Controle de Semestre |

## Orientações de conteúdo e evidências

A matriz de oito semestres é **ilustrativa** e não corresponde automaticamente ao PPC de universidade específica. A duração do curso, disciplinas, estágios, critérios de aprovação e exigências de TCC variam entre instituições.

Fontes de referência que inspiram a organização incluem **AOTA Occupational Therapy Practice Framework — 4th edition (2020)**, **WFOT Minimum Standards e Minimum Competencies (2026)**, **Classificação Internacional de Funcionalidade (CIF/OMS)**, **resoluções e documentos do COFFITO**, legislação brasileira de saúde e inclusão e guias acadêmicos para pesquisa científica. A biblioteca apresenta nomes e propósitos, mas não links externos.

**Atenção:** as fichas bibliográficas são um roteiro temático de estudo e **não equivalem a referências ABNT prontas**. Conferir título, edição, autoria, edição vigente, paginação e requisitos institucionais antes de citar. Algumas entradas são títulos de periódicos, instrumentos, políticas e guias, não livros individualizados. Não inventar artigos, autores, DOI, resultados, páginas ou dados empíricos.

Os resumos são textos de apoio originais e contextualizados. Não constituem recomendações clínicas individuais nem substituem avaliação, supervisão profissional, protocolos ou leitura das obras originais. Para comercialização em escala, recomenda-se **revisão técnica por terapeuta ocupacional e conferência editorial das referências**.

## Armazenamento e privacidade

Anotações, progresso, notas, tarefas e ferramentas são persistidos em **localStorage no navegador**. Não existe autenticação real, sincronização entre dispositivos, banco de dados remoto ou backup centralizado. Apagar dados do navegador pode eliminar registros. Algumas ferramentas permitem exportar individualmente em JSON. **Não registrar prontuários, dados identificáveis ou informações sensíveis de pacientes no caderno.**

## Verificação feita

Em 8 de outubro de 2026 foram executadas validações de sintaxe e **390 testes simulados de renderização de rotas**, incluindo as bibliotecas e ferramentas, todos sem erros nesses testes. Foram verificadas ausência de identificadores duplicados dos assuntos e dos flashcards adicionais, presença dos campos principais dos resumos, exclusividade de navegação e inexistência de hyperlinks externos na página de Bibliografia.

**Limitação dos testes:** renderização simulada e inspeção do código não substituem testes reais de desktop e celular, interações de navegador, acessibilidade, proteção de dados e revisão de conteúdo por especialistas.

## Publicação

Os arquivos do projeto são mantidos no repositório GitHub, branch `main`. A **URL oficial escolhida para a hospedagem é https://terapia-ocupacional-caderno-si41.vercel.app/**; o domínio antigo foi descartado pelo proprietário e não deve mais ser divulgado. O projeto tem uma tela de entrada local por e-mail; ela não valida pagamentos e não é autenticação remota. A publicação efetiva depende da integração e dos limites de builds da Vercel.


## Ampliação de ambientes independentes — Outubro de 2026

A biblioteca de trabalho foi ampliada com **54 ambientes adicionais**, acessíveis em `#explorar`, além dos seis módulos-base. As páginas estão agrupadas por trajetória acadêmica e profissional; **cada módulo tem rota própria `#modulo/trajeto-N-N`, dados e tarefas independentes**, com estado persistente no navegador.

Em cada ambiente, há exemplos didáticos específicos de Terapia Ocupacional, objetivo, contexto, referenciais para verificar, análise crítica, planejamento, tarefas com responsável e data, registros de matriz, leituras, etapas, checklist, agenda semanal e opção de exportação individual de dados em JSON.

Os oito modos de visualização disponíveis são **galeria, Kanban, matriz, etapas, quadro de leitura, planejamento, tabela e checklist**. Os modos reutilizam componentes acessíveis da aplicação, mas mantêm dados e exemplos específicos para cada finalidade.

### Vida acadêmica e graduação

- Mapa da Graduação
- Projetos e Seminários
- Notas, Avaliações e Feedback
- Biblioteca de Aula
- Plano de Estudos por Ocupações
- Mapas Conceituais da Terapia Ocupacional

### Avaliação e prática ocupacional

- Perfil Ocupacional
- Laboratório de Análise de Atividades
- CIF e Participação
- Rotinas de AVD e AIVD
- Tecnologia Assistiva Aplicada
- Auditoria de Acessibilidade

### Estágio e supervisão

- Diário de Campo de Estágio
- Plano de Estágio Supervisionado
- Matriz de Competências Clínicas
- Reuniões de Supervisão
- Observações de Ocupações
- Relatório e Portfólio de Estágio

### Pesquisa, revisão e divulgação

- Banco de Questões Científicas
- Protocolo de Revisão Científica
- Fichamentos Avançados
- Matriz de Evidências
- Fluxo de Seleção da Literatura
- Comunicação Científica Acessível

### Pós-graduação e especialização

- Seleção de Especialização
- Plano da Especialização
- Portfólio da Especialização
- Prática Baseada em Evidências
- Projeto de Melhoria de Serviço
- Trilha de Educação Permanente

### Mestrado, doutorado e docência

- Pré-projeto de Mestrado
- Revisão Teórica de Pós-graduação
- Desenhos de Métodos Mistos
- Estudo Piloto e Viabilidade
- Preparação para Qualificação
- Artigos, Publicações e Pesquisa Doutoral

### Concursos, residências e provas

- Painel de Editais e Inscrições
- Cronograma de Preparação
- Banco de Questões Autorais
- Legislação de Saúde e TO
- Simulados de Raciocínio Ocupacional
- Entrevista e Prova de Títulos

### Carreira e vida profissional

- Mapa de Áreas de Atuação
- Plano de Carreira em TO
- Currículo Lattes e Portfólio
- Processos Seletivos Profissionais
- Rede de Contatos Profissionais
- Ética, Gestão e Consultoria

### Projetos, comunidade e direitos

- Projeto de Inclusão Escolar
- Saúde Mental Comunitária
- Envelhecimento e Comunidade
- Ergonomia e Trabalho Real
- Reabilitação Neurológica Ocupacional
- Políticas Públicas e Defesa de Direitos

### Ajustes solicitados na experiência

- **Resumos:** remover números totais e painéis quantitativos de períodos, disciplinas, resumos, temas ou estudados da biblioteca e das páginas de período. Os períodos continuam identificados ordinalmente porque isso faz parte da organização curricular.
- **TCC:** deixar abertos por padrão todos os grupos do catálogo de ferramentas (orientação, literatura, métodos, escrita, defesa etc.) e todos os detalhes expansíveis quando a página do TCC é exibida.
- **Página inicial:** manter os seis ambientes principais e exibir a nova biblioteca agrupada por categoria, com busca por texto e navegação direta.
- **54 novos ambientes:** seções, passos, matriz e registros preenchidos com exemplos explicitamente fictícios, podendo ser editados, reorganizados e salvos por usuário no armazenamento local.

### Qualidade acadêmica e limites

A organização curricular é **modelo ilustrativo**, não representa o PPC de uma universidade determinada. O caderno não valida automaticamente referências, exigências legais, editais, cronogramas, protocolos ou habilitações clínicas. As descrições e orientações de TO são material didático; antes de comercializar, revisar os conteúdos e títulos bibliográficos por especialista e verificar edições e atualizações. Nenhum exemplo acadêmico equivale a caso clínico real nem substitui supervisão.

Os registros são guardados em **localStorage**, sem contas, sincronização remota ou cópia de segurança automática. Não inserir dados pessoais de usuários de serviços de saúde, participantes de pesquisas ou pacientes.

### Validação da ampliação

Teste de sintaxe e renderização simulada em todos os módulos com seus oito modos de visualização, mais as páginas principais: **504 casos executados sem falhas**, incluindo a ausência de totalizadores na biblioteca inicial de Resumos e a abertura de todas as categorias TCC (7 grupos verificados na interface). Os testes simulados não substituem testes completos em navegadores reais, dispositivos móveis, acessibilidade e uso prolongado.


## Nova identidade visual — cores vibrantes (08/10/2026)

A camada de personalização `theme-vibrant.css` é carregada **depois** de `styles.css` para manter a arquitetura anterior e concentrar as mudanças de design num único arquivo de fácil manutenção.

### Temas por módulo principal

- **Resumos:** índigo e azul luminoso.
- **Flashcards:** violeta e magenta.
- **Bibliografia:** azul-petróleo e turquesa.
- **TCC:** rosa vibrante e coral.
- **Pesquisa Acadêmica:** azul-cobalto e ciano.
- **Controle de Semestre:** verde-esmeralda e verde fresco.

### Temas dos ambientes adicionais

A categoria de cada ambiente determina a cor por meio de `theme-journey-1` até `theme-journey-9`. A paleta abrange graduação (índigo), prática ocupacional (coral), estágio (azul), pesquisa (roxo), especialização (turquesa), mestrado/doutorado (magenta), concursos (laranja), carreira (azul intenso) e projetos comunitários (verde).

Cores e gradientes agora aparecem em **capas, cartões, cabeçalhos, páginas internas, links de navegação ativos, botões de ação, etiquetas, barras de progresso, quadros Kanban e linhas do tempo**, preservando fundo claro e texto escuro nos formulários e na leitura extensiva.

A associação de temas é feita em `app.js` para os módulos-base e em `life-modules-ui.js` para os ambientes por categoria. A atualização **não altera dados locais, conteúdo acadêmico, funcionalidades ou estrutura de rotas**.

**Verificação estrutural da personalização:** renderização simulada sem erros nas seis páginas-base e nos 54 ambientes adicionais, conferência de todas as classes cromáticas e importação correta da nova folha de estilos. Ainda é recomendada a inspeção visual em desktop/celular e em navegador real após a publicação.

## Ateliês isolados, aprofundamento específico e design lúdico — 08/10/2026

### Isolamento real de navegação e dados

Cada um dos 54 ambientes `#modulo/trajeto-G-N` agora mostra na barra lateral **apenas o módulo aberto**, atalhos internos para seu plano, ateliê e quadros e links para retornar à biblioteca/início. Antes, a barra lateral listava os módulos irmãos da mesma categoria; essa listagem foi eliminada. O conteúdo existente e os links da biblioteca principal permanecem intactos.

Os espaços originais mantêm seus dados em `state.lifeModules[module.id]`. Os novos ateliês são guardados separadamente em `state.lifeDeep[module.id]`, de forma que um registro do módulo "Políticas Públicas e Defesa de Direitos" não aparece em "Reabilitação Neurológica Ocupacional" ou em outros ambientes. Os seis módulos-base recebem apenas complementos próprios em `state.coreDepth[module]`. Tudo continua salvo somente no navegador, sem nuvem nem compartilhamento entre dispositivos.

### Ampliação de conteúdo e interatividade

Novos arquivos:

- `life-depth-data.js`: 54 perfis originais, um para cada módulo, com fundamento específico, situação fictícia e proposta de entrega, além de perguntas críticas.
- `life-depth-ui.js`: 54 ateliês complementares independentes, cada um com **fundamentação, situação, produto, interpretação, bibliografia para verificar, feedback, pergunta, critérios de qualidade, mural de post-its coloridos, matriz de evidências, plano de execução, checklist e diário reflexivo**. Post-its, linhas de matriz e etapas de plano podem ser criados/excluídos; todo texto é editável.
- `core-depth-ui.js`: ateliês de aprofundamento específicos para **Resumos, Flashcards, Bibliografia, Meu TCC, Pesquisa Acadêmica e Controle de Semestre**, cada um com campos exemplificados, cartões de notas editáveis, checklist e diário próprio.
- `theme-playful.css`: nova camada visual sobre a paleta vibrante existente, com **textura de pontinhos e papel pautado**, cartões com leve inclinação e sombra flutuante, gradientes por área, adesivos e efeitos de interação. Respeita telas pequenas e preferência por redução de movimento.

Os conteúdos prévios, resumos, flashcards, referências, ferramentas, rotas e dados já criados não foram excluídos. O material novo não representa evidência empírica nem documentos normativos verificados; cenários são explicitamente fictícios. A conferência acadêmica por profissional especializado continua necessária.

### Verificação

- Rotas de **54/54 ambientes** renderizadas no ambiente de teste simulado, com ausência de links para módulos irmãos na barra lateral.
- Verificado o isolamento do módulo "Políticas Públicas e Defesa de Direitos" e a persistência independente de edição e inclusão de notas.
- Os **seis ateliês-base** renderizam conteúdo próprio e isolado.
- Páginas de Resumos, Flashcards, Bibliografia, Meu TCC, Pesquisa, Semestres, além de páginas internas e ferramentas, renderizadas com os novos complementos, sem erros nas simulações.
- A inspeção visual e testes E2E completos em desktop e celular reais continuam pendentes; também não foi verificada a publicação no serviço externo de hospedagem.



## Camada scrapbook de texturas — V2 (08/10/2026)

O arquivo **\`theme-textures-v2.css\`** é carregado ao final do \`index.html\`, depois de \`styles.css\`, \`theme-vibrant.css\` e \`theme-playful.css\`. É uma camada visual aditiva: não substitui dados, textos, telas de estudo, modelos de pesquisa, resumos, flashcards ou as funções dos seis módulos principais e 54 ambientes adicionais.

### Elementos adicionados

- Fundo global com textura de papel pontilhado, manchas cromáticas translúcidas e aparência editorial.
- Cartões principais com textura de papel, bordas levemente irregulares, sombra elevada, fitas tipo washi e adesivos decorativos.
- Nove texturas próprias das nove categorias: papel quadriculado, pontilhado, pautado, linhas diagonais, pontos espaçados, grade pautada, diagonais largas, confete pontilhado e anéis geométricos.
- Selos visuais específicos por categoria (\`texture-sticker\`, \`aria-hidden="true"\`) no catálogo: apenas decoração, sem ação ou impacto de acessibilidade.
- Páginas internas com texturas, cabeçalhos decorados, realces tipo marca-texto, botões com brilho no hover, molduras, marcadores de índice, papel pautado e tabelas coloridas.
- Ateliês anteriores com post-its, fitas, matriz de evidências e checklists mantidos; recebem papel artesanal, carimbos e variação cromática adicional.
- Responsividade, impressão sem sombras pesadas e respeito a \`prefers-reduced-motion\`.

### Regras de preservação

A navegação lateral de cada ambiente continua isolada e não lista outros módulos da mesma categoria. Apenas a marcação visual do catálogo foi complementada por um selo decorativo, sem mudar a identificação do módulo. Dados pessoais dos estudantes permanecem em armazenamento local do navegador.

### Validação estrutural da V2

Conferidos **54 ambientes**, individualmente, com renderização bem-sucedida, conteúdo específico e sem links para módulos irmãos dentro da sua página. O catálogo emite selos decorativos nos 54 cartões; as nove texturas estão presentes; regras CSS estão equilibradas sintaticamente. Inspeção real em diferentes navegadores/dispositivos e sincronização com hospedagem externa não foram verificadas.

## Expansão de 40 laboratórios acadêmicos e profissionais — 08/10/2026

Esta etapa **não remove ou reescreve os resumos, flashcards, seis módulos principais nem os 54 ambientes anteriores**. Acrescenta arquivos novos:
- `next40-data.js` — 40 roteiros únicos, específicos de Terapia Ocupacional, com situações acadêmicas fictícias, objetivos, cuidados, referências a verificar, quatro campos autorais preenchidos, cinco etapas individuais e quatro dimensões próprias de análise por módulo.
- `next40-ui.js` — rotas `#novo/<ID>`, páginas e estado isolados `state.next40[ID]`, editores, painel, Kanban, matriz, cronograma, cartões de anotação, checklists, acompanhamento de progresso, exportação JSON individual, impressão, busca e catálogo.
- `theme-next40.css` — oito novos sistemas cromáticos e texturizados, com cartões diferentes, adesivos, bordas editoriais, sombras, papeis, padrões, modos móveis, impressão e preferência por movimento reduzido.

### As 8 áreas adicionadas

**1. Vida universitária, autonomia e bem-estar**: Orçamento da Vida Universitária; Mapa de Rotinas e Energia; Gestão de Bolsas e Auxílios; Laboratório de Competências Digitais; Transição entre Ciclos Acadêmicos.

**2. Pesquisa aplicada, TCC e produção científica**: Histórico de Orientações e Versões do TCC; Dicionário de Variáveis da Pesquisa; Roteiros de Entrevistas e Grupos Focais; Oficina de Qualidade do Manuscrito; Inventário de Instrumentos de Pesquisa.

**3. Início da atuação profissional**: Registro e Documentação Profissional; Plano dos Primeiros 90 Dias; Comparador de Vínculos de Trabalho; Integração à Equipe Multiprofissional; Portfólio de Competências Profissionais.

**4. Rotinas de trabalho e intervenção**: Agenda Profissional sem Dados Sensíveis; Planejador de Encontros Ocupacionais; Banco de Graduação de Atividades; Estúdio de Registros Profissionais; Acompanhamento de Continuidade do Cuidado.

**5. Gestão e sustentabilidade de serviços**: Laboratório de Implantação de Serviço; Simulador de Custos e Precificação; Inventário de Materiais e Estoque; Mapa de Segurança e Contingências; Facilitador de Reuniões do Serviço.

**6. Contextos e programas de intervenção**: Projeto de Grupos Ocupacionais; Preparação de Transição Hospital–Domicílio; Oficina de Orientação a Redes de Apoio; Planejamento de Retorno à Educação e Trabalho; Curadoria de Cultura, Lazer e Território.

**7. Tecnologia, sigilo e qualidade**: Painel de Resultados Ocupacionais; Oficina de Acessibilidade Digital Profissional; Proteção de Dados e Sigilo Profissional; Cartografia de Encaminhamentos e Rede; Pesquisa de Experiência do Serviço.

**8. Desenvolvimento e sustentabilidade da carreira**: Supervisão de Profissionais Iniciantes; Agenda de Desenvolvimento Profissional; Estúdio de Educação em Saúde Acessível; Projetos Profissionais e Captação de Recursos; Gestão de Carga, Limites e Bem-Estar no Trabalho.

**Ferramentas específicas adicionais:** Orçamento da Vida Universitária tem simulador de entradas/despesas e saldo hipotético; Simulador de Custos e Precificação tem custos fixos, indiretos, variáveis e custo unitário (não recomenda preço); Inventário de Materiais e Estoque calcula alertas de reposição com quantidades e limites editáveis. Cada ferramenta persiste exclusivamente no respectivo módulo.

A navegação dos novos módulos mostra apenas o módulo em uso, três atalhos internos e retorno à biblioteca. Os dados dos demais módulos não aparecem nem são compartilhados, inclusive entre módulos da mesma categoria. As categorias entram nas bibliotecas `#home` e `#explorar` e também podem ser abertas na rota `#novos`.

A infraestrutura é `HTML/CSS/JavaScript` puro e salva no navegador via o mecanismo de `localStorage` já existente. **Não há conta, sincronização ou backup automático remoto**. Em ambientes profissionais, não devem ser registrados prontuários nem dados pessoais identificáveis de usuários/pacientes. Os exemplos são fictícios; não substituem procedimentos institucionais, critérios éticos, registro profissional ou assessoria jurídica/contábil.

**Fontes orientadoras a conferir conforme atividade e atualização:** COFFITO, Código de Ética e Deontologia da Terapia Ocupacional (Resolução COFFITO 425/2013): https://www.coffito.gov.br/nsite/?page_id=3386 ; conselho regional CREFITO responsável; ANPD/LGPD para tratamento de dados; referenciais acadêmicos e institucionais efetivamente consultados.

### Testes da expansão

- 40 novas páginas × cinco visualizações = **200 renderizações simuladas**, todas sem exceção.
- Registros editáveis independentes entre dois módulos testados, adição de etapas funcional; os 40 cartões aparecem no catálogo.
- Três ferramentas especiais (simulador universitário, simulador de custos e inventário) aparecem apenas em seus módulos.
- Os 54 ambientes antigos continuam renderizando sem mistura de links entre os ambientes irmãos; biblioteca conjunta apresenta **54 cartões antigos + 40 novos**.
- Pendente: validação visual real em desktop e celular; garantia e tempo de publicação pelo host externo não foram verificados.


## Tela de acesso simplificada por e-mail — 08/10/2026

Foi adicionada uma **tela de entrada** com identidade visual própria, leve e positiva, contendo apenas o campo "E-mail utilizado na compra" e o botão "Entrar no meu caderno". Há um botão discreto **Sair** na barra superior após o acesso.

### Comportamento solicitado

- **Primeiro acesso neste navegador:** qualquer texto não vazio digitado no campo de e-mail é aceito, inclusive se estiver com letra trocada, omitida ou sem formato válido, pois a tela não consulta a compra ou servidor de autenticação. O texto é aparado e normalizado para minúsculas e salvo no armazenamento local.
- **Acessos seguintes:** ao visitar novamente no mesmo navegador, o estudante entra automaticamente enquanto a sessão local está ativa. O primeiro e-mail permanece associado àquele navegador.
- **Sair:** o estudante pode sair sem apagar o e-mail associado nem suas anotações. Para entrar novamente, deve digitar o mesmo e-mail registrado no primeiro acesso; a comparação ignora maiúsculas e espaços nas extremidades.
- **E-mail diferente:** não substitui o primeiro e-mail e não abre o caderno quando a pessoa saiu.
- **Navegação protegida na interface:** \`app.js\` não renderiza nenhuma rota enquanto o acesso local não está ativo. O hash de navegação pode permanecer inalterado durante a tela de entrada e a rota anterior abre após o acesso.

### Implementação

- \`login-screen.js\`: interface, formulários, mensagens positivas, registro e controle do acesso local.
- \`login-screen.css\`: estilos exclusivos da tela de entrada, responsividade, foco visível, efeito scrapbook, contraste e preferência por movimento reduzido.
- \`index.html\`: inclusão dos novos arquivos e do botão "Sair"; sem mudar os módulos.
- \`app.js\`: checagem no início de \`render()\` antes de abrir a aplicação.

**Chaves:** \`to-caderno-compra-email-v1\` (primeiro e-mail) e \`to-caderno-compra-active-v1\` (estado de entrada), ambas em \`localStorage\`, separadas do armazenamento de estudos. Não alterar a chave antiga \`to-caderno-2026-v1\`.

### Limitações importantes

**Este é um bloqueio visual local, não autenticação real nem verificação de compra.** Não consulta checkout, plataforma de pagamento ou lista de compradores; não protege conteúdo/código disponibilizado publicamente por hospedagem estática. Dados de \`localStorage\` podem ser alterados pelo usuário e desaparecem quando os dados do site são apagados. Acesso não é sincronizado entre dispositivos. Para autenticação comercial verificável seria necessária integração com backend/provedor de login e base de pedidos.

### Testes específicos

Validado em ambiente de JavaScript simulado: tela bloqueada na primeira visita; aceitação de e-mail com erro de digitação; manutenção do e-mail e entrada automática após recarga; botão Sair; rejeição de outro e-mail após sair; aceitação do e-mail original mesmo em maiúsculas; bloqueio de acesso a rota direta sem sessão ativa. Todos passaram sem exceções neste teste. Revisão visual em navegador real ainda é necessária.


## Endereço oficial da Vercel e diagnóstico de publicação — 08/10/2026

**Única URL oficial informada pelo proprietário:** https://terapia-ocupacional-caderno-si41.vercel.app/

**Repositório fonte:** https://github.com/sarasantoscontas-dotcom/terapia-ocupacional-caderno, branch `main`.

**Recursos do último pedido:** `login-screen.js`, `login-screen.css`, verificação de `window.TO_LOGIN.isAllowed()` em `app.js`, formulário e botão `Sair` em `index.html`. Esses arquivos continuam no repositório e devem ser publicados junto com todos os módulos já criados. Nenhuma duplicata de aplicação deve ser criada.

**Diagnóstico:** os checks do GitHub mostraram `Vercel: failure` nos commits do login (inclusive `f25924ca02bd`), com URL de diagnóstico apontando para `build-rate-limit`. A causa exata e a duração do bloqueio precisam ser verificadas no painel da Vercel. As atualizações do GitHub não garantem que a produção esteja sincronizada enquanto o limite de deploy estiver ativo.

**Recomendações de publicação, sem apagar nada:** no projeto Vercel que responde pelo domínio oficial, confirmar em **Settings → Git** a conexão ao repositório `sarasantoscontas-dotcom/terapia-ocupacional-caderno` e à branch `main`; em **Deployments**, verificar a falha do build e, após liberar o limite, promover/republicar o último commit da branch. Não criar um segundo projeto Vercel nem apontar para o domínio antigo.

O URL de homepage exibido na página de detalhes do GitHub é uma propriedade separada do README/HTML; a alteração dessa propriedade pela interface do GitHub precisa ser feita em **Settings → General → Website** (ou no campo Website/About da página do repositório), pois a conexão do GitHub disponível nesta sessão não fornece ação para editar os metadados do repositório.


## Ampliação do Controle de Semestre e Meu TCC + ajustes para celular — 08/10/2026

Atualização **aditiva**: nenhuma disciplina-base, resumo, flashcard, texto de estudo, ferramenta ou anotação anterior foi removida. Foi retirado apenas o rodapé técnico da home que começava por "Matriz curricular ilustrativa: ordem, duração...".

**Controle de Semestre:** \`semester-expanded-data.js\` acrescenta **96 sugestões de disciplinas**, doze por período, com objetivos, exercícios e perguntas vinculadas a Terapia Ocupacional; a nomenclatura/oferta precisa ser confirmada no PPC da universidade. \`semester-expanded-ui.js\` expõe oito painéis com dados separados por período: catálogo opcional de disciplinas com botão de inclusão na grade pessoal; grade de sete dias por três turnos; avaliações e entregas; revisões; competências; atividades práticas/horas; organização da rotina; e balanço de encerramento. Os materiais anteriores de \`semester-plus.js\`, os períodos e suas matérias permanecem. As novas disciplinas só passam a integrar a lista pessoal do semestre ao clicar em incluir.

**Meu TCC:** \`tcc-kanban-data.js\` fornece **60 cartões pré-preenchidos** organizados em dez etapas metodológicas, do problema científico à defesa, e **48 cartões opcionais** em doze áreas temáticas da Terapia Ocupacional. \`tcc-kanban-pro.js\` integra esses dados ao Kanban existente, mantendo as tarefas originais, com cinco situações (A fazer, Em andamento, Em revisão, Concluído, Pausado), prioridades, responsáveis, documentos, notas, critérios, checklists, filtros, busca, lista, cronograma, duplicação e exportação JSON. Os templates opcionais podem ser incluídos individualmente ou por pacote, sem duplicar o mesmo ID.

**Apresentação:** \`academic-expansion.css\` dá identidade editorial e colorida às novas ferramentas. \`mobile-responsiveness.css\` é carregado por último para priorizar o uso em telas menores. Foram revisados pontos de quebra em até 1100 px (tablet), 850 px, 640 px (celular) e 385 px (celular estreito): sidebar, cartões, galerias, tabelas, campos editáveis, filtros, calendário, Kanban, blocos de estágio, TCC, semestre e as 94 áreas adicionais. Em telas de celular, os Kanbans ficam empilhados em vez de estenderem a largura da página; tabelas largas ganham rolagem horizontal interna.

**Caso específico:** o módulo \`#novo/novo-6-1\` (Projeto de Grupos Ocupacionais) teve suas **cinco visualizações** (painel, Kanban, matriz, linha e notas) renderizadas sem erros em testes simulados, assim como as **54 rotas** antigas e as oito rotas de semestre. Os dados foram testados por isolamento (edição em um semestre não muda outro). Os scripts e estilos estão conectados em ordem no \`index.html\`.

**Limites da validação:** testes de JavaScript e revisão das regras CSS são estruturais/simulados; a aparência visual no navegador real e em aparelhos físicos, inclusive rolagem e foco do teclado na tela, ainda depende de verificação manual com a versão publicada. As restrições de privacidade e os riscos de inserir dados de pacientes permanecem documentados e, quando relevantes, nas ferramentas específicas.
