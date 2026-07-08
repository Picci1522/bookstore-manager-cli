import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
  private servico = new EmprestimoService();

  async realizarEmprestimo() {
    try {
      console.log("\n📤 Registrar Empréstimo");
      const idLivro = Number(readlineSync.question("ID do livro: "));
      const idCliente = Number(readlineSync.question("ID do cliente: "));

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
      const idEmprestimo = Number(readlineSync.question("ID do empréstimo: "));
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
        const status = e.devolvido ? "Devolvido" : "Pendente";
        console.log(`ID: ${e.id} | Livro ID: ${e.livroId} | Cliente ID: ${e.clienteId} | Data: ${e.dataEmprestimo} | Status: ${status}`);
      });
    } catch (erro) {
      console.log(`ℹ️ ${(erro as Error).message}`);
    }
  }

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

  async relatorioLivrosPorAutor() {
    try {
      console.log("\n📊 Relatório: Livros por Autor");
      const lista = await this.servico.livrosPorAutor();
      lista.forEach(r => {
        console.log(`Autor: ${r.autor} | Total de livros: ${r.total_livros}`);
      });
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }
}