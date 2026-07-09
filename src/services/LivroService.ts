import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import type { ILivro } from '../interfaces/ILivro';

export class LivroService {
  private repo = new LivroRepository();
  private aut = new AutorRepository();

  async cadastrar(d: ILivro) {
    if (!d.titulo?.trim()) throw new Error('Título obrigatório');
    if (!d.genero?.trim()) throw new Error('Gênero obrigatório');
    if (d.quantidadeEstoque === undefined || d.quantidadeEstoque < 0) throw new Error('Estoque inválido');
    const autor = await this.aut.buscarPorId(d.autorId);
    if (!autor) throw new Error('Autor não encontrado');
    return this.repo.criar(d);
  }

  listarTodos() { return this.repo.listarTodos(); }
  buscarPorId(id: number) { return this.repo.buscarPorId(id); }

  async atualizar(id: number, d: Partial<ILivro>) {
    const ex = await this.repo.buscarPorId(id);
    if (!ex) throw new Error('Livro não encontrado');
    if (d.autorId) {
      const a = await this.aut.buscarPorId(d.autorId);
      if (!a) throw new Error('Autor não encontrado');
    }
    return this.repo.atualizar(id, d);
  }

  async excluir(id: number) {
    const ex = await this.repo.buscarPorId(id);
    if (!ex) throw new Error('Livro não encontrado');
    const ok = await this.repo.excluir(id);
    if (!ok) throw new Error('Não foi possível excluir');
    return ok;
  }

  async baixarEstoque(id: number, qtd = 1) {
    const l = await this.repo.buscarPorId(id);
    if (!l) throw new Error('Livro não encontrado');
    if (l.quantidadeEstoque < qtd) throw new Error('Sem estoque');
    return this.repo.atualizar(id, { quantidadeEstoque: l.quantidadeEstoque - qtd });
  }

  async reporEstoque(id: number, qtd = 1) {
    const l = await this.repo.buscarPorId(id);
    if (!l) throw new Error('Livro não encontrado');
    return this.repo.atualizar(id, { quantidadeEstoque: l.quantidadeEstoque + qtd });
  }
}