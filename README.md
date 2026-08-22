# 🧠 PsicoManager — Plataforma de Gestão para Profissionais de Psicologia

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Status](https://img.shields.io/badge/Front--End-Concluído%20%26%20Testado-success)](#)

> **AV3 — PROJETO INTEGRADOR**  
> **Produto:** Aplicação Web Responsiva para Clínicas e Consultórios de Psicologia  
> **Instituição:** Centro Universitário Jorge Amado (Unijorge)

---

## 📌 Sobre o Projeto

O **PsicoManager** é uma plataforma web desenvolvida para centralizar a gestão clínica, administrativa e financeira de profissionais de Psicologia em diversas áreas de atuação (Clínica, TCC, Psicanálise, Organizacional, Escolar e Hospitalar).

O sistema substitui controles manuais e planilhas dispersas por uma solução segura, intuitiva e em total conformidade com as diretrizes do **Conselho Federal de Psicologia (CFP)** e da **LGPD (Lei Geral de Proteção de Dados)**.

---

## ✨ Funcionalidades do Front-end

### 🔐 1. Autenticação e Perfis de Acesso
- **Telas Públicas:** Landing Page institucional, Como Funciona, Para Psicólogos, Para Empresas e Blog;
- **Login Dinâmico:** Autenticação com e-mail/senha e redirecionamento automático por perfil:
  - 👑 **Administrador Geral:** Gestão de usuários, psicólogos, bloqueios e auditoria;
  - 🩺 **Psicólogo:** Painel clínico, agenda, prontuários, financeiro e relatórios;
  - 👤 **Paciente:** Portal do paciente, acompanhamento de sessões e tarefas terapêuticas;
- **Seletor Rápido de Simulação:** Permite alternar a visão de perfil no menu lateral para facilitar a avaliação acadêmica.

### 👥 2. Gestão de Pacientes (CRUD Completo)
- Listagem em modo **Tabela** e **Cards** com busca em tempo real (nome, CPF, e-mail) e filtros por situação (*Ativo, Em Espera, Inativo*);
- Formulário cadastral completo com **validação real de CPF (dígitos verificadores)**, máscaras automáticas (Telefone, CEP, CPF) e validação de e-mail;
- Modal de **Prontuário Rápido** com histórico do paciente;
- **Exportação de Relatório de Pacientes em CSV**.

### 📝 3. Prontuários Eletrônicos & Evolução Clínica (Módulo de Inovação)
- Registro de evolução por atendimento com carimbo de data/hora;
- **Escala de Humor e Adesão (1 a 10)** para acompanhamento do progresso terapêutico;
- Histórico de queixas clínicas e anamnese estruturada;
- Emissão e impressão de **Declarações de Comparecimento** e **Laudos Iniciais** formatados para impressão/PDF.

### 📅 4. Agenda e Consultas
- Grade de horários diários com indicação de salas e modalidades (*Presencial vs. Online*);
- Agendamento de novas consultas com cálculo de iniciais e cores de identificação;
- Navegação entre os dias da semana.

### 💰 5. Módulo Financeiro & Relatórios
- Controle de fluxo de caixa (receitas de consultas vs. despesas operacionais);
- Emissão de recibos de pagamento;
- Gráficos analíticos e estatísticas de diagnósticos mais frequentes via **Chart.js**.

### ♿ 6. Acessibilidade & Usabilidade (WCAG 2.1 AA)
- Suporte a **Tema Claro (Light)** e **Tema Escuro (Dark)**;
- Modal de Acessibilidade: ajuste de tamanho de fonte, alto contraste e suporte a navegação por teclado.

---

## 🛠️ Tecnologias e Bibliotecas

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Roteamento:** [React Router DOM v7](https://reactrouter.com/)
- **Estilização & Ícones:** [Bootstrap 5.3](https://getbootstrap.com/), [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Visualização de Dados:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Gerenciamento de Estado & Camada de Serviços:** React Context API (`AuthContext`, `ToastContext`, `ThemeContext`, `AccessibilityContext`) e camada desacoplada `src/services/`.

---

## 📂 Estrutura de Pastas do Front-end

```text
src/
├── components/
│   ├── common/              # Componentes reutilizáveis (StatCard, EmptyState, Logo, PrintModal)
│   └── layout/              # Estrutura de layout (AppLayout, Topbar, Sidebar, AccessibilityModal)
├── context/                 # Contextos globais (Auth, Toast, Theme, Accessibility)
├── pages/
│   ├── admin/               # Painel do Administrador (AdminUsuariosPage)
│   ├── agenda/              # Agenda Clínica (AgendaPage)
│   ├── auth/                # Autenticação (LoginPage, ForgotPasswordPage)
│   ├── configuracoes/       # Configurações do sistema
│   ├── dashboard/           # Dashboard do Psicólogo
│   ├── financeiro/          # Fluxo de Caixa e Recibos (FinanceiroPage)
│   ├── paciente/            # Portal do Paciente (PacientePortalPage)
│   ├── pacientes/           # CRUD de Pacientes (PacientesListPage, PacienteFormPage)
│   ├── perfil/              # Edição de perfil profissional
│   ├── public/              # Landing Page institucional e páginas informativas
│   ├── relatorios/          # Indicadores e gráficos estatísticos
│   └── sessoes/             # Prontuário e Evolução Clínica (SessoesPage)
├── services/                # Camada de Integração REST (api, patientService, userService, sessionService)
├── styles/                  # Estilos globais e temas (style.css, custom-react.css, polish.css)
├── types/                   # Interfaces e Tipagens TypeScript
└── utils/                   # Utilitários, máscaras e validadores de CPF/E-mail
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `npm`

### Passo a Passo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/caioba19/clinica-psicologica.git
   cd clinica-psicologica
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```text
   http://localhost:5173
   ```

---

## 🔌 Integração com o Back-end (API REST)

O front-end conta com uma camada de serviços (`src/services/api.ts`) pronta para comunicação assíncrona. Quando o servidor back-end estiver em execução, basta configurar a variável de ambiente criando um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api
```

### Principais Endpoints Consumidos:
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autenticação com credenciais e geração de JWT |
| `GET` / `POST` | `/api/users` | Listagem e cadastro de usuários pelo administrador |
| `PATCH` | `/api/users/:id` | Atualização de situação e perfil de acesso |
| `GET` / `POST` | `/api/patients` | Listagem e cadastro de pacientes |
| `PATCH` | `/api/patients/:id` | Atualização e inativação de pacientes |
| `GET` / `POST` | `/api/sessions` | Registro e consulta de evoluções clínicas |

---

## 👥 Equipe de Desenvolvimento

| Integrante | Atuação Principal |
| :--- | :--- |
| **Caio** | Desenvolvimento Front-end, UI/UX, Componentes React, Validações e Integração de Telas |
| *(Outros integrantes)* | Back-end Node.js, Modelagem e Implementação do Banco MySQL, Documentação e Vídeo Pitch |

---

## 📄 Licença
Este projeto foi desenvolvido para fins acadêmicos no âmbito da avaliação AV3 da Unijorge.
