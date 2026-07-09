import pool from '../config/database';
import { Livro } from '../models/Livro';
import type { ILivro } from '../interfaces/ILivro';

export class LivroRepository {
  async criar(d: ILivro): Promise<Livro> {
    const q = `INSERT INTO livros (titulo,genero,ano_publicacao,quantidade_estoque,autor_id) VALUES ($1,$2,$3,$4,$5) RETURNING id,titulo,genero,ano_publicacao AS "anoPublicacao",quantidade_estoque AS "quantidadeEstoque",autor_id AS "autorId";`;
    const v = [d.titulo, d.genero, d.anoPublicacao ?? null, d.quantidadeEstoque, d.autorId];
    const r = await pool.query(q, v);
    return new Livro(r.rows[0]);
  }

  async listarTodos(): Promise<Livro[]> {
    const q = `SELECT l.id,l.titulo,l.genero,l.ano_publicacao AS "anoPublicacao",l.quantidade_estoque AS "quantidadeEstoque",l.autor_id AS "autorId",a.nome AS "nomeAutor" FROM livros l JOIN autores a ON a.id=l.autor_id ORDER BY l.id;`;
    const r = await pool.query(q);
    return r.rows.map(x => new Livro(x));
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const r = await pool.query(`SELECT * FROM livros WHERE id=$1`, [id]);
    return r.rows[0] ? new Livro(r.rows[0]) : null;
  }

  async atualizar(id: number, d: Partial<ILivro>): Promise<Livro | null> {
    const c: string[] = []; const v: unknown[] = []; let i = 1;
    if (d.titulo !== undefined)            { c.push(`titulo=$${i++}`);            v.push(d.titulo); }
    if (d.genero !== undefined)            { c.push(`genero=$${i++}`);            v.push(d.genero); }
    if (d.anoPublicacao !== undefined)     { c.push(`ano_publicacao=$${i++}`);    v.push(d.anoPublicacao); }
    if (d.quantidadeEstoque !== undefined) { c.push(`quantidade_estoque=$${i++}`);v.push(d.quantidadeEstoque); }
    if (d.autorId !== undefined)           { c.push(`autor_id=$${i++}`);          v.push(d.autorId); }
    if (!c.length) return null;
    v.push(id);
    const r = await pool.query(`UPDATE livros SET ${c.join(',')} WHERE id=$${i} RETURNING *;`, v);
    return r.rows[0] ? new Livro(r.rows[0]) : null;
  }

  async excluir(id: number): Promise<boolean> {
    const r = await pool.query(`DELETE FROM livros WHERE id=$1`, [id]);
    return r.rowCount === 1;
  }
}