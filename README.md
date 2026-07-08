# 📚 BookStore Manager CLI

**Projeto Final - Módulo 01**
Desenvolvido para a disciplina de Desenvolvedor Back End Node

---

## 🎯 Objetivo
Sistema de gerenciamento de livraria executado via terminal, com cadastro e controle de autores, livros, clientes e empréstimos, utilizando **Node.js**, **TypeScript** e **PostgreSQL**.

---

## ✅ Funcionalidades Implementadas
Conforme requisitos RF01 a RF22:

### 📂 Cadastros e Gestão
- **Autores**: Cadastrar, listar, consultar por ID, atualizar e excluir
- **Livros**: Cadastrar vinculado a autor, listar, consultar, atualizar e excluir
- **Clientes**: Cadastrar, listar, consultar, atualizar e excluir
- **Empréstimos**: Realizar empréstimo, registrar devolução, listar todos os empréstimos

### 📊 Relatórios
- Livros disponíveis para empréstimo
- Livros atualmente emprestados
- Quantidade de livros cadastrados por autor
- Quantidade total de empréstimos por livro
- Clientes com empréstimos pendentes

---

## 🛠️ Tecnologias Utilizadas
- Node.js
- TypeScript
- PostgreSQL
- `pg` (biblioteca para conexão com o banco)
- `dotenv` (variáveis de ambiente)
- `readline-sync` (interface de entrada no terminal)

---

## 📁 Estrutura do Projeto
bookstore-manager-cli/
├── src/
│ ├── main.ts # Ponto de entrada da aplicação
│ ├── config/
│ │ └── database.ts # Configuração e conexão com PostgreSQL
│ ├── database/
│ │ └── schema.sql # Script de criação das tabelas
│ ├── interfaces/ # Definição de tipos e contratos
│ ├── models/ # Classes das entidades
│ ├── repositories/ # Operações de acesso ao banco de dados
│ ├── services/ # Regras de negócio e validações
│ ├── controllers/ # Intermediação entre menus e serviços
│ ├── menus/ # Interface de navegação no terminal
│ └── utils/ # Funções auxiliares
├── .env # Variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


---

## ⚙️ Como Executar

### 1. Pré-requisitos
- Node.js ≥ 18
- PostgreSQL ≥ 14

### 2. Clonar o repositório
```bash
git clone https://github.com/Picci1522/bookstore-manager-cli.git
cd bookstore-manager-cli