import { ClienteRepository } from '../repositories/ClienteRepository';
import type { ICliente } from '../interfaces/ICliente';
import { Cliente } from '../models/Cliente';

export class ClienteService {
  private repositorio = new ClienteRepository();

  async cadastrar(dados: ICliente): Promise<Cliente> {
    if (!dados.nome || dados.nome.trim().length < 2) {
      throw new Error("Nome é obrigatório e deve ter pelo menos 2 caracteres");
    }
    if (!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      throw new Error("E-mail inválido");
    }
    return this.repositorio.criar(dados);
  }

  async listarTodos(): Promise<Cliente[]> {
    const lista = await this.repositorio.listarTodos();
    if (lista.length === 0) throw new Error("Nenhum cliente cadastrado");
    return lista;
  }

  async buscarPorId(id: number): Promise<Cliente> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    const cliente = await this.repositorio.buscarPorId(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return cliente;
  }

  async atualizar(id: number, dados: Partial<ICliente>): Promise<Cliente> {
    await this.buscarPorId(id);
    if (dados.nome && dados.nome.trim().length < 2) {
      throw new Error("Nome deve ter pelo menos 2 caracteres");
    }
    if (dados.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      throw new Error("E-mail inválido");
    }

    const atualizado = await this.repositorio.atualizar(id, dados);
    if (!atualizado) throw new Error("Não foi possível atualizar o cliente");
    return atualizado;
  }

  async excluir(id: number): Promise<{ mensagem: string }> {
    await this.buscarPorId(id);
    const removido = await this.repositorio.excluir(id);
    if (!removido) throw new Error("Não foi possível excluir");
    return { mensagem: "Cliente excluído com sucesso" };
  }
}