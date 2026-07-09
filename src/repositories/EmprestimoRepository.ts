import pool from '../config/database';
import { Emprestimo } from '../models/Emprestimo';
import type { IEmprestimo } from '../interfaces/IEmprestimo';

export class EmprestimoRepository {
  async criar(d: IEmprestimo): Promise<Emprestimo> {
    const q = `INSERT INTO emprestimos (cliente_id,livro_id,data_emprestimo,data_devolucao) VALUES ($1,$2,$3,$4) RETURNING id,cliente_id AS "clienteId",livro_id AS "livroId",data_emprestimo AS "dataEmprestimo",data_devolucao AS "dataDevolucao";`;
    const v = [d.clienteId, d.livroId, d.dataEmprestimo ?? new Date(), d.dataDevolucao ?? null];
    const r = await pool.query(q, v);
    return new Emprestimo(r.rows[0]);
  }

  async listarComDetalhes(): Promise<Emprestimo[]> {
    const q = `SELECT e.id,e.cliente_id AS "clienteId",e.livro_id AS "livroId",e.data_emprestimo AS "dataEmprestimo",e.data_devolucao AS "dataDevolucao",c.nome AS "nomeCliente",l.titulo AS "tituloLivro" FROM emprestimos e JOIN clientes c ON c.id=e.cliente_id JOIN livros l ON l.id=e.livro_id ORDER BY e.id;`;
    const r = await pool.query(q);
    return r.rows.map(x => new Emprestimo(x));
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const r = await pool.query(`SELECT * FROM emprestimos WHERE id=$1`, [id]);
    return r.rows[0] ? new Emprestimo(r.rows[0]) : null;
  }

  async registrarDevolucao(id: number): Promise<Emprestimo | null> {
    const r = await pool.query(`UPDATE emprestimos SET data_devolucao=CURRENT_DATE WHERE id=$1 AND data_devolucao IS NULL RETURNING *;`, [id]);
    return r.rows[0] ? new Emprestimo(r.rows[0]) : null;
  }

  // ------------------------------
  // RELATÓRIOS OBRIGATÓRIOS (RF18)
  // ------------------------------

  /** Livros com quantidade em estoque maior que 0 */
  async relatorioLivrosDisponiveis() {
    const r = await pool.query(`
      SELECT id, titulo, genero, quantidade_estoque AS "quantidadeEstoque"
      FROM livros
      WHERE quantidade_estoque > 0
      ORDER BY titulo;
    `);
    return r.rows;
  }

  /** Livros que estão atualmente emprestados */
  async relatorioLivrosEmprestados() {
    const r = await pool.query(`
      SELECT l.id, l.titulo, COUNT(e.id) AS total_emprestimos
      FROM livros l
      INNER JOIN emprestimos e ON l.id = e.livro_id
      WHERE e.data_devolucao IS NULL
      GROUP BY l.id, l.titulo
      ORDER BY total_emprestimos DESC;
    `);
    return r.rows;
  }

  /** Quantidade de livros cadastrados por autor */
  async relatorioLivrosPorAutor() {
    const r = await pool.query(`
      SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON a.id = l.autor_id
      GROUP BY a.id, a.nome
      ORDER BY a.nome;
    `);
    return r.rows;
  }

  /** Livros com maior número de empréstimos */
  async relatorioMaisEmprestados() {
    const r = await pool.query(`
      SELECT l.titulo, COUNT(e.id) AS total_emprestimos
      FROM livros l
      INNER JOIN emprestimos e ON l.id = e.livro_id
      GROUP BY l.id, l.titulo
      ORDER BY total_emprestimos DESC
      LIMIT 5;
    `);
    return r.rows;
  }

  /** Clientes que possuem empréstimos ainda não devolvidos */
  async relatorioClientesAtivos() {
    const r = await pool.query(`
      SELECT DISTINCT c.id, c.nome, c.email, c.telefone
      FROM clientes c
      INNER JOIN emprestimos e ON c.id = e.cliente_id
      WHERE e.data_devolucao IS NULL
      ORDER BY c.nome;
    `);
    return r.rows;
  }
}