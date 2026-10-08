# Caderno do Estudante de Terapia Ocupacional

Aplicação web responsiva e de tema claro para a graduação em **Terapia Ocupacional**, inspirada na organização visual do Caderno de Administração e nas visualizações do Notion. Não utiliza dependências de framework: HTML, CSS e JavaScript.

## Início rápido

Abrir `index.html` em um navegador moderno ou publicar os arquivos estáticos em uma hospedagem com HTTPS. Não há etapa de build. A página inicial apresenta seis módulos e uma busca global de conteúdos.

## Módulos implementados

| Módulo | O que funciona |
| --- | --- |
| **Resumos Prontos** | Hierarquia por **8 semestres ilustrativos → 40 disciplinas → 80 assuntos** com textos originais contextualizados, questões de revisão, fonte de aprofundamento, favoritos, notas, leitura marcada e impressão |
| **Flashcards** | **80 cartões** de revisão ativa correspondentes aos assuntos, com revelação de resposta, navegação, níveis de domínio e progresso salvo |
| **Bibliografia** | **12 fontes/portais verificáveis**, filtros por semestre e tipo, favoritos, links à fonte primária e inclusão de referências próprias |
| **Meu TCC** | **12 ideias investigáveis**, projeto editável, 10 seções de escrita, tarefas próprias, Kanban, cronograma, checklist e orientações de integridade |
| **Pesquisa Acadêmica** | Pergunta no formato PCC, construtor inicial de busca, protocolo, fichamentos próprios, tabela de evidências, Kanban de leitura e roteiro de 6 etapas |
| **Controle de Semestre** | 8 períodos-modelo, matérias, matérias personalizadas, 4 campos de notas com pesos, frequência, notas pessoais, tarefas, lista, Kanban, calendário e agenda semanal |

### Visualizações
Galeria, tabela, páginas aninhadas, trilha sequencial, cartões de revisão, tópicos expandíveis, quadro Kanban, cronograma, calendário, agenda semanal, ficha, painel de indicadores e notas editáveis.

### Estrutura de arquivos
- `index.html`: estrutura da página e dependências na ordem correta.
- `styles.css`: tema visual inspirado no Caderno de Administração, com paleta adaptada para Terapia Ocupacional e responsividade.
- `curriculum.js`: disciplinas e conteúdos originais.
- `library.js`: fontes, referências institucionais e temas/roteiros de TCC.
- `app.js`: dashboard, navegação, busca, componentes reutilizáveis e persistência.
- `views-study.js`: Resumos, Flashcards e Bibliografia.
- `views-workspaces.js`: TCC, Pesquisa e Controle de Semestre.

## Persistência e privacidade

Alterações pessoais são armazenadas via **localStorage** no navegador/dispositivo usado. Não há servidor de contas, sincronização entre dispositivos nem backup remoto. Limpar dados do site pode apagar anotações e progresso. Não armazene dados pessoais sensíveis de pacientes nesta versão.

## Escopo acadêmico e fontes

A sequência de semestres é **ilustrativa** e pode não corresponder ao Projeto Pedagógico do Curso (PPC) de uma universidade específica. Consulte a grade oficial, regulamentação e regras de estágio/TCC da instituição. Os textos são apoio ao estudo; **não representam protocolos clínicos individualizados** e não substituem supervisão ou avaliação profissional.

Fontes de referência temática incluem [AOTA OTPF-4](https://www.aota.org/practice/domain-and-process/framework), [CIF da OMS](https://icd.who.int/browse/releases/icf/pt), [WFOT Education Standards (2026)](https://wfot.org/education/wfot-education-standards), [COFFITO — Resolução 425/2013](https://www.coffito.gov.br/nsite/?p=3188) e [normas de ética em pesquisa do CNS](https://www.gov.br/conselho-nacional-de-saude/pt-br/acesso-a-informacao/camaras-tecnicas-e-comissoes-backup/conep/legislacao/resolucoes). Os links indicam fontes primárias; alguns documentos podem exigir credenciais ou compra. A bibliografia deve ser verificada antes de cada citação.

## Validação realizada

Foram executadas verificações de sintaxe JavaScript e testes funcionais simulados de renderização de **36 combinações de rotas/visualizações**, sem erro nas verificações. Isso **não equivale** a um teste automatizado completo em navegadores reais, acessibilidade ou revisão acadêmica por especialistas. Antes de vender ou distribuir, realizar testes manuais em desktop e celular, revisar cada texto com especialista em Terapia Ocupacional e implementar um mecanismo adequado de backup/autenticação se necessário.

## Publicação

Este repositório possui código estático pronto para hospedagem. A publicação em um domínio e a configuração de um serviço de autenticação/backups não estão incluídas automaticamente pela criação de arquivos GitHub.
