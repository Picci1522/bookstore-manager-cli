import pool from '../config/database';
import { Livro } from '../models/Livro';
import type { ILivro } from '../interfaces/ILivro';

export class LivroRepository {

  async criar(livro: ILivro): Promise<Livro> {
    const query = `
      INSERT INTO livros (titulo, ano_publicacao, quantidade_disponivel, autor_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const valores = [livro.titulo, livro.anoPublicacao, livro.quantidadeDisponivel, livro.autorId];

    try {
      const resultado = await pool?.query(query, valores);
      return new Livro(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao cadastrar livro: ${(erro as Error).message}`);
    }
  }

  async listarTodos(): Promise<Livro[]> {
    const query = `SELECT * FROM livros ORDER BY titulo;`;

    try {
      const resultado = await pool?.query(query);
      return resultado.rows.map((dado) => new Livro(dado));
    } catch (erro) {
      throw new Error(`Erro ao listar livros: ${(erro as Error).message}`);
    }
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const query = `SELECT * FROM livros WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      if (resultado.rows.length === 0) return null;
      return new Livro(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao buscar livro: ${(erro as Error).message}`);
    }
  }

  async atualizar(id: number, dados: Partial<ILivro>): Promise<Livro | null> {
    const campos = [];
    const valores = [];
    let indice = 1;

    if (dados.titulo) { campos.push(`titulo = $${indice++}`); valores.push(dados.titulo); }
    if (dados.anoPublicacao) { campos.push(`ano_publicacao = $${indice++}`); valores.push(dados.anoPublicacao); }
    if (dados.quantidadeDisponivel !== undefined) { campos.push(`quantidade_disponivel = $${indice++}`); valores.push(dados.quantidadeDisponivel); }
    if (dados.autorId) { campos.push(`autor_id = $${indice++}`); valores.push(dados.autorId); }

    if (campos.length === 0) return null;

    const query = `
      UPDATE livros
      SET ${campos.join(', ')}
      WHERE id = $${indice}
      RETURNING *;
    `;
    valores.push(id);

    try {
      const resultado = await pool?.query(query, valores);
      if (resultado.rows.length === 0) return null;
      return new Livro(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao atualizar livro: ${(erro as Error).message}`);
    }
  }

  async excluir(id: number): Promise<boolean> {
    const query = `DELETE FROM livros WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      return resultado.rowCount === 1;
    } catch (erro) {
      throw new Error(`Erro ao excluir livro: ${(erro as Error).message}`);
    }
  }

  // Atualiza a quantidade após empréstimo/devolução
  async alterarQuantidade(id: number, novaQuantidade: number): Promise<Livro | null> {
    const query = `
      UPDATE livros
      SET quantidade_disponivel = $1
      WHERE id = $2
      RETURNING *;
    `;

    try {
      const resultado = await pool?.query(query, [novaQuantidade, id]);
      if (resultado.rows.length === 0) return null;
      return new Livro(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao alterar quantidade: ${(erro as Error).message}`);
    }
  }
}