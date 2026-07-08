import { LivroRepository } from '../repositories/LivroRepository';
import { AutorService } from './AutorService';
import type { ILivro } from '../interfaces/ILivro';
import { Livro } from '../models/Livro';

export class LivroService {
  private repositorio = new LivroRepository();
  private servicoAutor = new AutorService();

  async cadastrar(dados: ILivro): Promise<Livro> {
    if (!dados.titulo || dados.titulo.trim().length < 2) {
      throw new Error("Título é obrigatório e deve ter pelo menos 2 caracteres");
    }
    if (!dados.autorId || isNaN(dados.autorId) || dados.autorId <= 0) {
      throw new Error("ID do autor é obrigatório e deve ser válido");
    }
    if (dados.quantidadeDisponivel === undefined || dados.quantidadeDisponivel < 0) {
      throw new Error("Quantidade disponível não pode ser negativa");
    }

    await this.servicoAutor.buscarPorId(dados.autorId);
    return this.repositorio.criar(dados);
  }

  async listarTodos(): Promise<Livro[]> {
    const lista = await this.repositorio.listarTodos();
    if (lista.length === 0) throw new Error("Nenhum livro cadastrado");
    return lista;
  }

  async buscarPorId(id: number): Promise<Livro> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    const livro = await this.repositorio.buscarPorId(id);
    if (!livro) throw new Error("Livro não encontrado");
    return livro;
  }

  async atualizar(id: number, dados: Partial<ILivro>): Promise<Livro> {
    await this.buscarPorId(id);
    if (dados.titulo && dados.titulo.trim().length < 2) {
      throw new Error("Título deve ter pelo menos 2 caracteres");
    }
    if (dados.autorId) await this.servicoAutor.buscarPorId(dados.autorId);
    if (dados.quantidadeDisponivel !== undefined && dados.quantidadeDisponivel < 0) {
      throw new Error("Quantidade não pode ser negativa");
    }

    const atualizado = await this.repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error("Não foi possível atualizar o livro");
    return atualizado;
  }

  async excluir(id: number): Promise<{ mensagem: string }> {
    await this.buscarPorId(id);
    const removido = await this.repositorio.excluir(id);
    if (!removido) throw new Error("Não foi possível excluir");
    return { mensagem: "Livro excluído com sucesso" };
  }

  async alterarEstoque(id: number, quantidade: number): Promise<Livro> {
    const livro = await this.buscarPorId(id);
    const novaQtd = livro.quantidadeDisponivel + quantidade;
    if (novaQtd < 0) throw new Error("Estoque insuficiente");
    const atualizado = await this.repositorio.alterarQuantidade(id, novaQtd);
    if (!atualizado) throw new Error("Erro ao atualizar estoque");
    return atualizado;
  }
}