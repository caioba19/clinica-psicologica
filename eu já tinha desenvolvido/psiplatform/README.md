# Ânima — Plataforma de Gestão Clínica (Front-end)

Projeto Integrador (AV3) — plataforma web para gestão de profissionais e
pacientes de Psicologia. Este repositório contém a etapa de **front-end**
(React + TypeScript), com dados mockados. A integração com back-end
(Node.js + Express + TypeScript) e banco de dados MySQL será feita na
próxima etapa.

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Credenciais de demonstração

Como ainda não há back-end, o login é validado contra uma lista de
usuários mockada em `src/mockData.ts`.

| Perfil     | E-mail                  | Senha      |
|------------|--------------------------|------------|
| Administrador | renata@clinica.com    | admin123   |
| Psicólogo     | marcelo@clinica.com   | psi123     |

> Usuários com situação `inativo` ou `bloqueado` (ex.: `diego@clinica.com`,
> `bianca@clinica.com`) não têm senha cadastrada em `credenciais` de
> propósito — servem para validar a mensagem de acesso negado; não é bug.

## Estrutura

```
src/
  components/   Shell (layout), ProtectedRoute, UI (Panel, StatCard, StatusBadge)
  context/      AuthContext (autenticação mockada)
  pages/        Login, PainelRedirect, AdminDashboard, PsychologistArea, Patients
  mockData.ts   Dados fictícios (usuários, psicólogos, pacientes, atendimentos, logs)
  types.ts      Tipos compartilhados
```

## Perfis e rotas

- `/` — Login
- `/painel` — redireciona conforme o perfil logado
- `/admin` — painel administrativo (indicadores, usuários, logs)
- `/admin/pacientes` — CRUD de pacientes
- `/psicologo` — perfil do psicólogo, pacientes vinculados e atendimentos

Rotas são protegidas por perfil via `ProtectedRoute`: um psicólogo não
acessa `/admin` e um admin não acessa `/psicologo`.

## Próximos passos

- Substituir `mockData.ts` por chamadas à API REST
- Implementar back-end (Node + TypeScript + MySQL) com hash de senha e
  autorização validada no servidor
- Persistir ações do CRUD de pacientes e do painel admin
