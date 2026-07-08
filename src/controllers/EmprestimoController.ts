import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
  private servico = new EmprestimoService();

  async realizarEmprestimo() {
    try {
      console.log("\n📤 Registrar Novo Empréstimo");
      const idLivro = Number(readlineSync.question("Digite o ID do livro: "));
      const idCliente = Number(readlineSync.question("Digite o ID do cliente: "));

      const emprestimo = await this.servico.realizarEmprestimo({
        livroId: idLivro,
        clienteId: idCliente,
        devolvido: false
      });

      console.log(`✅ Empréstimo registrado! ID: ${emprestimo.id}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async registrarDevolucao() {
    try {
      console.log("\n📥 Registrar Devolução");
      const idEmprestimo = Number(readlineSync.question("Digite o ID do empréstimo: "));
      const resultado = await this.servico.registrarDevolucao(idEmprestimo);
      console.log(`✅ ${resultado.mensagem}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async listarEmprestimos() {
    try {
      console.log("\n📋 Lista de Empréstimos");
      const lista = await this.servico.listarEmprestimos();
      lista.forEach(e => {
        const status = e.devolvido ? "✅ Devolvido" : "⏳ Pendente";
        console.log(`ID: ${e.id} | Livro ID: ${e.livroId} | Cliente ID: ${e.clienteId} | Data: ${e.dataEmprestimo?.toLocaleDateString()} | Status: ${status}`);
      });
    } catch (erro) {
      console.log(`ℹ️ ${(erro as Error).message}`);
    }
  }

  // Métodos dos relatórios
  async relatorioLivrosDisponiveis() {
    try {
      console.log("\n📊 Relatório: Livros Disponíveis");
      const lista = await this.servico.livrosDisponiveis();
      if (lista.length === 0) {
        console.log("Nenhum livro disponível no momento.");
        return;
      }
      lista.forEach(l => {
        console.log(`ID: ${l.id} | Título: ${l.titulo} | Quantidade: ${l.quantidade_disponivel}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async relatorioLivrosEmprestados() {
    try {
      console.log("\n📊 Relatório: Livros Emprestados");
      const lista = await this.servico.livrosEmprestados();
      if (lista.length === 0) {
        console.log("Nenhum livro emprestado no momento.");
        return;
      }
      lista.forEach(l => {
        console.log(`ID: ${l.livro_id} | Título: ${l.livro_titulo} | Cliente: ${l.cliente_nome} | Empréstimo: ${new Date(l.data_emprestimo).toLocaleDateString()}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async relatorioLivrosPorAutor() {
    try {
      console.log("\n📊 Relatório: Livros por Autor");
      const lista = await this.servico.livrosPorAutor();
      lista.forEach(r => {
        console.log(`Autor: ${r.autor_nome} | Total de livros: ${r.total_livros}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async relatorioEmprestimosPorLivro() {
    try {
      console.log("\n📊 Relatório: Quantidade de Empréstimos por Livro");
      const lista = await this.servico.qtdEmprestimosPorLivro();
      lista.forEach(l => {
        console.log(`ID: ${l.livro_id} | Título: ${l.livro_titulo} | Total de empréstimos: ${l.total_emprestimos}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async relatorioClientesComEmprestimos() {
    try {
      console.log("\n📊 Relatório: Clientes com Empréstimos Ativos");
      const lista = await this.servico.clientesComEmprestimosAtivos();
      if (lista.length === 0) {
        console.log("Nenhum cliente com empréstimo pendente.");
        return;
      }
      lista.forEach(c => {
        console.log(`ID: ${c.cliente_id} | Nome: ${c.cliente_nome} | E-mail: ${c.cliente_email}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }
}