import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroService } from './LivroService';
import { ClienteRepository } from '../repositories/ClienteRepository';
import type { IEmprestimo } from '../interfaces/IEmprestimo';

export class EmprestimoService {
  private repo = new EmprestimoRepository();
  private cli = new ClienteRepository();
  private liv = new LivroService();

  async realizarEmprestimo(d: IEmprestimo) {
    const c = await this.cli.buscarPorId(d.clienteId);
    if (!c) throw new Error('Cliente não encontrado');
    const l = await this.liv.buscarPorId(d.livroId);
    if (!l) throw new Error('Livro não encontrado');
    if (l.quantidadeEstoque <= 0) throw new Error('Sem estoque');
    await this.liv.baixarEstoque(d.livroId);
    return this.repo.criar(d);
  }

  async registrarDevolucao(id: number) {
    const e = await this.repo.buscarPorId(id);
    if (!e) throw new Error('Empréstimo não encontrado');
    if (e.dataDevolucao) throw new Error('Já devolvido');
    await this.liv.reporEstoque(e.livroId);
    return this.repo.registrarDevolucao(id);
  }

  listarEmprestimos() { return this.repo.listarComDetalhes(); }

  livrosDisponiveis() { return this.repo.relatorioLivrosDisponiveis(); }
  livrosEmprestados() { return this.repo.relatorioLivrosEmprestados(); }
  livrosPorAutor() { return this.repo.relatorioLivrosPorAutor(); }
  qtdEmprestimosPorLivro() { return this.repo.relatorioMaisEmprestados(); }
  clientesComEmprestimosAtivos() { return this.repo.relatorioClientesAtivos(); }
}