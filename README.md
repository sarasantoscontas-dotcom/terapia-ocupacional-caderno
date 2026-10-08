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

Os arquivos estão publicados no repositório GitHub na branch `main`. O repositório informa o endereço `https://terapia-ocupacional-caderno.vercel.app`, mas a disponibilidade e a atualização efetiva dessa hospedagem **não foram verificadas nesta entrega**. Não há autenticação ou armazenamento remoto implementados.


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
