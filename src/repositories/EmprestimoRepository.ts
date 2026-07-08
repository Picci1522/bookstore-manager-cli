import pool from '../config/database';
import { Emprestimo } from '../models/Emprestimo';
import type { IEmprestimo } from '../interfaces/IEmprestimo';

export class EmprestimoRepository {

  async criar(emprestimo: IEmprestimo): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo, devolvido)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const valores = [emprestimo.livroId, emprestimo.clienteId, emprestimo.dataEmprestimo, emprestimo.devolvido];

    try {
      const resultado = await pool?.query(query, valores);
      return new Emprestimo(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao registrar empréstimo: ${(erro as Error).message}`);
    }
  }

  async listarTodos(): Promise<Emprestimo[]> {
    const query = `SELECT * FROM emprestimos ORDER BY data_emprestimo DESC;`;

    try {
      const resultado = await pool?.query(query);
      return resultado.rows.map((dado) => new Emprestimo(dado));
    } catch (erro) {
      throw new Error(`Erro ao listar empréstimos: ${(erro as Error).message}`);
    }
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const query = `SELECT * FROM emprestimos WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      if (resultado.rows.length === 0) return null;
      return new Emprestimo(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao buscar empréstimo: ${(erro as Error).message}`);
    }
  }

  async registrarDevolucao(id: number, dataDevolucao: Date): Promise<Emprestimo | null> {
    const query = `
      UPDATE emprestimos
      SET devolvido = true, data_devolucao = $1
      WHERE id = $2 AND devolvido = false
      RETURNING *;
    `;

    try {
      const resultado = await pool?.query(query, [dataDevolucao, id]);
      if (resultado.rows.length === 0) return null;
      return new Emprestimo(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao registrar devolução: ${(erro as Error).message}`);
    }
  }

  // Consultas relacionais para relatórios → cumpre RF17 e RF18
  async livrosDisponiveis(): Promise<any[]> {
    const query = `
      SELECT id, titulo, quantidade_disponivel
      FROM livros
      WHERE quantidade_disponivel > 0
      ORDER BY titulo;
    `;
    try {
      const resultado = await pool?.query(query);
      return resultado.rows;
    } catch (erro) {
      throw new Error(`Erro ao consultar livros disponíveis: ${(erro as Error).message}`);
    }
  }

  async livrosPorAutor(): Promise<any[]> {
    const query = `
      SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON a.id = l.autor_id
      GROUP BY a.id, a.nome
      ORDER BY a.nome;
    `;
    try {
      const resultado = await pool?.query(query);
      return resultado.rows;
    } catch (erro) {
      throw new Error(`Erro ao consultar livros por autor: ${(erro as Error).message}`);
    }
  }
}