import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroService } from './LivroService';
import { ClienteService } from './ClienteService';
import type { IEmprestimo } from '../interfaces/IEmprestimo';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoService {
  private repositorio = new EmprestimoRepository();
  private servicoLivro = new LivroService();
  private servicoCliente = new ClienteService();

  async realizarEmprestimo(dados: IEmprestimo): Promise<Emprestimo> {
    if (!dados.livroId || !dados.clienteId) {
      throw new Error("ID do livro e do cliente são obrigatórios");
    }

    const livro = await this.servicoLivro.buscarPorId(dados.livroId);
    if (livro.quantidadeDisponivel <= 0) {
      throw new Error("Livro indisponível para empréstimo");
    }

    await this.servicoCliente.buscarPorId(dados.clienteId);

    const emprestimo = await this.repositorio.criar({
      ...dados,
      devolvido: false,
      dataEmprestimo: dados.dataEmprestimo || new Date()
    });

    await this.servicoLivro.alterarEstoque(dados.livroId, -1);
    return emprestimo;
  }

  async registrarDevolucao(idEmprestimo: number): Promise<{ mensagem: string }> {
    if (isNaN(idEmprestimo) || idEmprestimo <= 0) {
      throw new Error("ID do empréstimo inválido");
    }

    const emprestimo = await this.repositorio.buscarPorId(idEmprestimo);
    if (!emprestimo) throw new Error("Empréstimo não encontrado");
    if (emprestimo.devolvido) throw new Error("Este empréstimo já foi devolvido");

    await this.repositorio.registrarDevolucao(idEmprestimo, new Date());
    await this.servicoLivro.alterarEstoque(emprestimo.livroId, +1);

    return { mensagem: "Devolução registrada com sucesso! Estoque atualizado." };
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    const lista = await this.repositorio.listarTodos();
    if (lista.length === 0) throw new Error("Nenhum empréstimo cadastrado");
    return lista;
  }

  // Métodos para relatórios
  async livrosDisponiveis() {
    return this.repositorio.livrosDisponiveis();
  }

  async livrosEmprestados() {
    return this.repositorio.livrosEmprestados();
  }

  async livrosPorAutor() {
    return this.repositorio.livrosPorAutor();
  }

  async qtdEmprestimosPorLivro() {
    return this.repositorio.qtdEmprestimosPorLivro();
  }

  async clientesComEmprestimosAtivos() {
    return this.repositorio.clientesComEmprestimosAtivos();
  }
}