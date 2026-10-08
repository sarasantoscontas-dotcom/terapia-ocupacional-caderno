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

Os arquivos estão publicados no repositório GitHub na branch `main`; esta entrega não inclui configuração de domínio, hospedagem Vercel ou autenticação.
