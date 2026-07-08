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
    const valores = [
      emprestimo.livroId,
      emprestimo.clienteId,
      emprestimo.dataEmprestimo || new Date(),
      emprestimo.devolvido
    ];

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

  // ------------------------------
  // Métodos de Relatórios (RF18)
  // ------------------------------

  // 1. Livros disponíveis para empréstimo
  async livrosDisponiveis(): Promise<any[]> {
    const query = `
      SELECT id, titulo, ano_publicacao, quantidade_disponivel
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

  // 2. Livros que estão emprestados no momento
  async livrosEmprestados(): Promise<any[]> {
    const query = `
      SELECT
        l.id AS livro_id,
        l.titulo AS livro_titulo,
        c.nome AS cliente_nome,
        c.email AS cliente_email,
        e.data_emprestimo
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      WHERE e.devolvido = false
      ORDER BY e.data_emprestimo DESC;
    `;
    try {
      const resultado = await pool?.query(query);
      return resultado.rows;
    } catch (erro) {
      throw new Error(`Erro ao consultar livros emprestados: ${(erro as Error).message}`);
    }
  }

  // 3. Quantidade de livros cadastrados por autor
  async livrosPorAutor(): Promise<any[]> {
    const query = `
      SELECT
        a.id AS autor_id,
        a.nome AS autor_nome,
        COUNT(l.id) AS total_livros
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

  // 4. Quantidade total de empréstimos por livro
  async qtdEmprestimosPorLivro(): Promise<any[]> {
    const query = `
      SELECT
        l.id AS livro_id,
        l.titulo AS livro_titulo,
        COUNT(e.id) AS total_emprestimos
      FROM livros l
      LEFT JOIN emprestimos e ON l.id = e.livro_id
      GROUP BY l.id, l.titulo
      ORDER BY total_emprestimos DESC;
    `;
    try {
      const resultado = await pool?.query(query);
      return resultado.rows;
    } catch (erro) {
      throw new Error(`Erro ao consultar quantidade de empréstimos por livro: ${(erro as Error).message}`);
    }
  }

  // 5. Clientes com empréstimos ainda não devolvidos
  async clientesComEmprestimosAtivos(): Promise<any[]> {
    const query = `
      SELECT DISTINCT
        c.id AS cliente_id,
        c.nome AS cliente_nome,
        c.email AS cliente_email,
        c.telefone AS cliente_telefone
      FROM clientes c
      INNER JOIN emprestimos e ON c.id = e.cliente_id
      WHERE e.devolvido = false
      ORDER BY c.nome;
    `;
    try {
      const resultado = await pool?.query(query);
      return resultado.rows;
    } catch (erro) {
      throw new Error(`Erro ao consultar clientes com empréstimos ativos: ${(erro as Error).message}`);
    }
  }
}