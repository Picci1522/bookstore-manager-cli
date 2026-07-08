import pool from '../config/database';
import { Cliente } from '../models/Cliente';
import type { ICliente } from '../interfaces/ICliente';

export class ClienteRepository {

  async criar(cliente: ICliente): Promise<Cliente> {
    const query = `
      INSERT INTO clientes (nome, email, telefone, endereco)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const valores = [cliente.nome, cliente.email, cliente.telefone, cliente.endereco];

    try {
      const resultado = await pool?.query(query, valores);
      return new Cliente(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao cadastrar cliente: ${(erro as Error).message}`);
    }
  }

  async listarTodos(): Promise<Cliente[]> {
    const query = `SELECT * FROM clientes ORDER BY nome;`;

    try {
      const resultado = await pool?.query(query);
      return resultado.rows.map((dado) => new Cliente(dado));
    } catch (erro) {
      throw new Error(`Erro ao listar clientes: ${(erro as Error).message}`);
    }
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const query = `SELECT * FROM clientes WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      if (resultado.rows.length === 0) return null;
      return new Cliente(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao buscar cliente: ${(erro as Error).message}`);
    }
  }

  async atualizar(id: number, dados: Partial<ICliente>): Promise<Cliente | null> {
    const campos = [];
    const valores = [];
    let indice = 1;

    if (dados.nome) { campos.push(`nome = $${indice++}`); valores.push(dados.nome); }
    if (dados.email) { campos.push(`email = $${indice++}`); valores.push(dados.email); }
    if (dados.telefone) { campos.push(`telefone = $${indice++}`); valores.push(dados.telefone); }
    if (dados.endereco) { campos.push(`endereco = $${indice++}`); valores.push(dados.endereco); }

    if (campos.length === 0) return null;

    const query = `
      UPDATE clientes
      SET ${campos.join(', ')}
      WHERE id = $${indice}
      RETURNING *;
    `;
    valores.push(id);

    try {
      const resultado = await pool?.query(query, valores);
      if (resultado.rows.length === 0) return null;
      return new Cliente(resultado.rows[0]);
    } catch (erro) {
      throw new Error(`Erro ao atualizar cliente: ${(erro as Error).message}`);
    }
  }

  async excluir(id: number): Promise<boolean> {
    const query = `DELETE FROM clientes WHERE id = $1;`;

    try {
      const resultado = await pool?.query(query, [id]);
      return resultado.rowCount === 1;
    } catch (erro) {
      throw new Error(`Erro ao excluir cliente: ${(erro as Error).message}`);
    }
  }
}