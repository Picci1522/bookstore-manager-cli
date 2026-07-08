# 📚 Bookstore Manager CLI

Sistema de gerenciamento de livraria desenvolvido em **TypeScript**, com arquitetura em camadas, para disciplina de Programação.

---

## 🎯 Funcionalidades
✅ Cadastro, listagem, busca, atualização e exclusão de:
- Autores
- Livros
- Clientes
- Empréstimos e devoluções

✅ Relatórios:
- Livros disponíveis
- Quantidade de livros por autor

✅ Regras de negócio implementadas:
- Validação de campos obrigatórios
- Controle de estoque de livros
- Verificação de existência de registros antes de operações
- Prevenção de exclusão de autores com livros cadastrados

---

## 🛠️ Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **PostgreSQL**
- **Dotenv** (variáveis de ambiente)
- **Readline-sync** (interface no terminal)

---

## 🚀 Como Executar

### 1. Clonar o repositório
```bash
git clone https://github.com/Picci1522/bookstore-manager-cli.git
cd bookstore-manager-cli