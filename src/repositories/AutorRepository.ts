import pool from '../config/database';
import { Autor } from '../models/Autor';
import type { IAutor } from '../interfaces/IAutor';

export class AutorRepository {

  // Cadastrar novo autor
  async criar(autor: IAutor): Promise<Autor> {
    const query = `
      INSERT INTO autores (nome, nacionalidade, data_nascimento)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const valores = [autor.nome, autor.nacionalidade, autor.dataNascimento];

    try {
      const resultado = await pool?.query(query, valores);
      return new Autor(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao cadastrar autor: ${(erro as Error).message}`);
    }
  }

  // Listar todos os autores
  async listarTodos(): Promise<Autor[]> {
    const query = `SELECT * FROM autores ORDER BY nome;`;

    try {
      const resultado = await pool?.query(query);
      return resultado.rows.map((dado) => new Autor(dado));
    } catch (erro) {
      throw new Error(`Erro ao listar autores: ${(erro as Error).message}`);
    }
  }

  // Buscar autor por ID
  async buscarPorId(id: number): Promise<Autor | null> {
    const query = `SELECT * FROM autores WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      if (resultado.rows.length === 0) return null;
      return new Autor(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao buscar autor: ${(erro as Error).message}`);
    }
  }

  // Atualizar dados do autor
  async atualizar(id: number, dados: Partial<IAutor>): Promise<Autor | null> {
    const campos = [];
    const valores = [];
    let indice = 1;

    if (dados.nome) { campos.push(`nome = $${indice++}`); valores.push(dados.nome); }
    if (dados.nacionalidade) { campos.push(`nacionalidade = $${indice++}`); valores.push(dados.nacionalidade); }
    if (dados.dataNascimento) { campos.push(`data_nascimento = $${indice++}`); valores.push(dados.dataNascimento); }

    if (campos.length === 0) return null;

    const query = `
      UPDATE autores
      SET ${campos.join(', ')}
      WHERE id = $${indice}
      RETURNING *;
    `;
    valores.push(id);

    try {
      const resultado = await pool?.query(query, valores);
      if (resultado.rows.length === 0) return null;
      return new Autor(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao atualizar autor: ${(erro as Error).message}`);
    }
  }

  // Excluir autor
  async excluir(id: number): Promise<boolean> {
    const query = `DELETE FROM autores WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      return resultado.rowCount === 1;
    } catch (erro) {
      throw new Error(`Erro ao excluir autor: ${(erro as Error).message}`);
    }
  }
}