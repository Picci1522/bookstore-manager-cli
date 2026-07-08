import { AutorRepository } from '../repositories/AutorRepository';
import type { IAutor } from '../interfaces/IAutor';
import { Autor } from '../models/Autor';

export class AutorService {
  private repositorio = new AutorRepository();

  async cadastrar(dados: IAutor): Promise<Autor> {
    if (!dados.nome || dados.nome.trim().length < 2) {
      throw new Error("Nome do autor é obrigatório e deve ter pelo menos 2 caracteres");
    }
    return this.repositorio.criar(dados);
  }

  async listarTodos(): Promise<Autor[]> {
    const lista = await this.repositorio.listarTodos();
    if (lista.length === 0) throw new Error("Nenhum autor cadastrado");
    return lista;
  }

  async buscarPorId(id: number): Promise<Autor> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    const autor = await this.repositorio.buscarPorId(id);
    if (!autor) throw new Error("Autor não encontrado");
    return autor;
  }

  async atualizar(id: number, dados: Partial<IAutor>): Promise<Autor> {
    await this.buscarPorId(id);
    if (dados.nome && dados.nome.trim().length < 2) {
      throw new Error("Nome deve ter pelo menos 2 caracteres");
    }
    const atualizado = await this.repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error("Não foi possível atualizar o autor");
    return atualizado;
  }

  async excluir(id: number): Promise<{ mensagem: string }> {
    await this.buscarPorId(id);
    const removido = await this.repositorio.excluir(id);
    if (!removido) throw new Error("Não foi possível excluir");
    return { mensagem: "Autor excluído com sucesso" };
  }
}