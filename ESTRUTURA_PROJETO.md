# 📖 Guia de Arquitetura e Estrutura de Pastas — Front-End (PsicoManager)

Este documento detalha o propósito, a responsabilidade e o funcionamento de **cada pasta e arquivo** do front-end da aplicação. Ele serve como documentação técnica para a equipe de desenvolvimento e para a entrega acadêmica da **AV3**.

---

## 🗺️ Visão Geral da Estrutura

```text
clinica-psicologica/
├── public/                 # Arquivos estáticos servidos diretamente
├── src/                    # Código-fonte principal da aplicação
│   ├── components/         # Componentes de interface reutilizáveis
│   │   ├── common/         # Blocos visuais genéricos (cards, modais, logos)
│   │   └── layout/         # Estrutura mestra de casca visual (Sidebar, Topbar, Layout)
│   ├── context/            # Gerenciamento de estado global (Context API)
│   ├── pages/              # Telas e rotas da aplicação
│   │   ├── admin/          # Painel e telas do Administrador Geral
│   │   ├── agenda/         # Grade de horários e agendamento de consultas
│   │   ├── auth/           # Login e recuperação de senha
│   │   ├── configuracoes/  # Preferências do sistema e notificações
│   │   ├── dashboard/      # Painel principal com métricas do Psicólogo
│   │   ├── financeiro/     # Fluxo de caixa, recibos e receitas/despesas
│   │   ├── paciente/       # Portal exclusivo de autoatendimento do Paciente
│   │   ├── pacientes/      # Listagem, busca e cadastro (CRUD) de pacientes
│   │   ├── perfil/         # Visualização e edição dos dados profissionais
│   │   ├── public/         # Landing Page e páginas institucionais
│   │   ├── relatorios/     # Estatísticas clínicas e gráficos analíticos
│   │   └── sessoes/        # Prontuário eletrônico e evolução clínica (CFP/LGPD)
│   ├── services/           # Camada de comunicação com API REST e persistência
│   ├── styles/             # Folhas de estilo globais, temas e acessibilidade
│   ├── types/              # Definições de tipos e interfaces TypeScript
│   └── utils/              # Funções utilitárias, máscaras de formulário e validadores
├── index.html              # Ponto de entrada HTML do Vite
├── package.json            # Manifesto de dependências e scripts do projeto
├── tsconfig.json           # Configurações do compilador TypeScript
└── vite.config.ts          # Configurações de bundling e plugins do Vite
```

---

## 📂 Detalhamento de Cada Pasta e sua Função

### 1. `public/`
- **Função:** Armazena arquivos estáticos que não passam pelo processo de compilação do JavaScript/TypeScript.
- **Arquivos:**
  - `favicon.svg`: Ícone da clínica exibido na aba do navegador.

---

### 2. `src/components/` (Componentes Visuais)
Agrupa componentes reutilizáveis para garantir padronização visual e reaproveitamento de código (princípio DRY).

#### `src/components/common/` (Componentes Genéricos)
- **`EmptyState.tsx`:** Exibe uma ilustração/ícone amigável com mensagem quando uma lista está vazia ou nenhum resultado de busca é encontrado.
- **`Logo.tsx`:** Componente vetorizado da marca *PsicoManager* em diferentes tamanhos e temas.
- **`PrintModal.tsx`:** Modal preparado para impressão/geração de PDF de laudos, recibos e declarações de comparecimento (`@media print`).
- **`StatCard.tsx`:** Card visual de métricas (ex: "Pacientes Ativos", "Faturamento", "Consultas Hoje") com ícone, cor e variação percentual.

#### `src/components/layout/` (Estrutura de Layout)
- **`AppLayout.tsx`:** Layout mestre compartilhado por todas as rotas autenticadas. Combina a barra superior (`Topbar`), o menu lateral (`Sidebar`), o conteúdo da página ativa (`<Outlet />`) e modais globais.
- **`Sidebar.tsx`:** Menu lateral retrátil e dinâmico. Adapta as opções de menu automaticamente conforme o perfil logado (*Psicólogo*, *Administrador* ou *Paciente*).
- **`Topbar.tsx`:** Barra superior que exibe o usuário logado, botão de tema (*Light/Dark*), atalho de acessibilidade e notificações.
- **`AccessibilityModal.tsx`:** Painel de acessibilidade que permite ao usuário aumentar/diminuir fonte, ativar alto contraste e modo leitura.
- **`QuickActionModal.tsx`:** Modal de ações rápidas (novo agendamento, novo paciente, registrar evolução) acionável via atalho.

---

### 3. `src/context/` (Estado Global da Aplicação)
Gerencia dados compartilhados entre múltiplas telas sem necessidade de repassar propriedades manualmente (*Prop Drilling*).

- **`AuthContext.tsx`:** Controla a sessão do usuário logado, dados do perfil, permissões e funções de `login`, `logout` e `loginAs` (simulação de papéis).
- **`ToastContext.tsx`:** Sistema de notificações flutuantes na tela (*sucesso, erro, alerta, info*) e modal de confirmação para ações destrutivas (ex: inativar cadastro).
- **`ThemeContext.tsx`:** Alterna entre os modos **Claro (Light)** e **Escuro (Dark)**, persistindo a escolha no navegador.
- **`AccessibilityContext.tsx`:** Gerencia as configurações de acessibilidade (tamanho da fonte, contraste, espaçamento).

---

### 4. `src/pages/` (Páginas e Telas da Aplicação)
Contém as telas roteadas pela aplicação (`react-router-dom`).

- **`admin/AdminUsuariosPage.tsx`:** Painel do Administrador Geral. Lista todos os usuários por situação (*ativo, inativo, bloqueado*), permite criar novos logins, alterar perfis e consultar logs de auditoria.
- **`agenda/AgendaPage.tsx`:** Visualização da agenda semanal/diária com separação por horários, salas de atendimento e modalidade (*Presencial vs. Online*).
- **`auth/LoginPage.tsx`:** Tela de login responsiva com autenticação por e-mail/senha, alternância de perfil e acesso rápido para demonstração.
- **`auth/ForgotPasswordPage.tsx`:** Fluxo de recuperação de senha e redefinição de acesso.
- **`dashboard/DashboardPage.tsx`:** Visão geral do Psicólogo com indicadores do dia, próximas consultas agendadas e lista de tarefas clínicas.
- **`financeiro/FinanceiroPage.tsx`:** Fluxo financeiro com extrato de receitas/despesas, saldo líquido, categorias de pagamento (PIX, Cartão) e emissão de recibos.
- **`paciente/PacientePortalPage.tsx`:** Portal exclusivo para o paciente consultar suas próximas sessões, acessar links de teleconsulta e registrar tarefas de casa.
- **`pacientes/PacientesListPage.tsx`:** Lista completa de pacientes em modo Tabela/Cards com busca, filtros de status, modal de prontuário rápido e **exportação em CSV**.
- **`pacientes/PacienteFormPage.tsx`:** Formulário completo de cadastro e edição de paciente, com validação de CPF real, máscaras automáticas e dados de prontuário.
- **`perfil/PerfilPage.tsx`:** Visualização e edição das informações profissionais do psicólogo (nome, CRP, abordagem clínica, bio).
- **`public/LandingPage.tsx`:** Página inicial institucional com proposta de valor, apresentação dos recursos e depoimentos.
- **`public/ComoFuncionaPage.tsx`:** Explicação passo a passo sobre a operação da plataforma para clínicas.
- **`public/ParaPsicologosPage.tsx`:** Página com tabela comparativa destacando os benefícios do sistema contra métodos manuais/planilhas.
- **`public/ParaEmpresasPage.tsx`:** Apresentação da solução para planos de saúde mental corporativa e RH.
- **`public/BlogPage.tsx`:** Artigos e materiais educativos sobre gestão clínica e Psicologia.
- **`relatorios/RelatoriosPage.tsx`:** Relatórios analíticos com gráficos (*Chart.js*) de volumetria de sessões e queixas/diagnósticos mais frequentes.
- **`sessoes/SessoesPage.tsx`:** Prontuário eletrônico completo, anamnese, evolução de atendimentos por sessão, escala de humor (1 a 10) e emissão de declarações.
- **`configuracoes/ConfiguracoesPage.tsx`:** Configurações gerais da conta, preferências de notificação e segurança.
- **`NotFoundPage.tsx`:** Tela 404 amigável para rotas inexistentes.

---

### 5. `src/services/` (Camada de Integração e Persistência)
Camada desacoplada responsável pelas requisições HTTP e sincronização de dados:

- **`api.ts`:** Cliente HTTP base com envio automático de cabeçalho `Authorization: Bearer <token>`, tratamento de status HTTP e integração com a URL base da API (`VITE_API_URL`).
- **`patientService.ts`:** Métodos para listar (`getAll`), buscar (`getById`), criar (`create`), atualizar (`update`) e inativar (`inactivate`) pacientes.
- **`userService.ts`:** Métodos de administração para listar usuários, alterar situação (*ativo/bloqueado*) e atualizar perfis de acesso.
- **`sessionService.ts`:** Métodos para buscar histórico de prontuário por paciente e registrar novas notas de evolução clínica.

---

### 6. `src/utils/` (Utilitários e Validações)
- **`masks.ts`:** Funções para formatação automática em tempo de digitação (CPF: `000.000.000-00`, Telefone: `(00) 00000-0000`, CEP: `00000-000`, CRP: `CRP 00/000000`, Moeda: `R$ 0,00`).
- **`validators.ts`:** Algoritmos de validação estrita:
  - `isValidCPF(cpf)`: Cálculo matemático dos dois dígitos verificadores do CPF brasileiro;
  - `isValidEmail(email)`: Validação de estrutura de e-mail;
  - `isValidPhone(phone)`: Verificação de DDD e quantidade de dígitos.

---

### 7. `src/types/` (Tipagem TypeScript)
- **`index.ts`:** Interfaces centrais do sistema (`UsuarioSistema`, `PerfilUsuario`, `SituacaoConta`, `PsicologoProfissional`, `Paciente`, `Sessao`, `LancamentoFinanceiro`, `LogAuditoria`). Garante consistência de dados e autocompletion em todo o código.

---

### 8. `src/styles/` (Estilização e Temas)
- **`style.css`:** Variáveis CSS globais (`--primary`, `--accent`, `--bg-sidebar`, `--radius-lg`, etc.), tipografia e grid responsivo.
- **`polish.css`:** Animações de entrada (`fadeInUp`), scrollbars personalizadas, estilos de acessibilidade e regras de impressão A4 (`@media print`).
- **`custom-react.css`:** Adaptações complementares para componentes dinâmicos do React.

---

### 9. Arquivos da Raiz do Projeto
- **`src/App.tsx`:** Componente raiz que agrupa os `Providers` de contexto e define todas as rotas da aplicação (`<Routes>` e `<Route>`).
- **`src/main.tsx`:** Ponto de entrada do React 19 que renderiza o `App` no elemento `#root` com o `BrowserRouter`.
- **`src/vite-env.d.ts`:** Declaração de tipos para variáveis de ambiente (`ImportMetaEnv`) e importações de ativos (CSS/SVG/PNG).
- **`index.html`:** Documento HTML inicial com as fontes do Google Fonts (*Plus Jakarta Sans*, *Playfair Display*, *Inter*) e o contêiner da aplicação.
- **`package.json`:** Gerencia dependências (`react`, `react-router-dom`, `chart.js`, `bootstrap`, `bootstrap-icons`) e scripts de execução (`dev`, `build`, `preview`).
- **`tsconfig.json`:** Configuração do compilador TypeScript (ES2020, JSX react-jsx, checagem de tipos).
- **`vite.config.ts`:** Configuração do bundler Vite com plugin oficial do React.
- **`.gitignore`:** Instruções ao Git para ignorar `node_modules/`, `dist/`, logs e arquivos de configuração local (`.env.local`, `.vscode/`).
- **`README.md`:** Documentação principal do projeto voltada para a execução e apresentação da AV3.

---

## 🔄 Fluxo de Funcionamento (Ciclo de Vida da Aplicação)

```
[ Usuário ] ──> [ Tela / Formulário (src/pages/) ]
                      │
                      ├──> Validações (src/utils/validators.ts & masks.ts)
                      │
                      ├──> Contextos Globais (src/context/ - Auth / Toast / Theme)
                      │
                      └──> Camada de Serviços (src/services/)
                                │
                                ├── [ Standalone / Demo ]: Sincroniza via localStorage
                                │
                                └── [ Com Back-end Ativo ]: Chamada HTTP REST (VITE_API_URL) ──> Back-end TypeScript ──> MySQL
```
