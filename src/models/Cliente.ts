import type { ICliente } from '../interfaces/ICliente';

export class Cliente implements ICliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;

  constructor(dados: ICliente) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.email = dados.email;
    this.telefone = dados.telefone;
    this.endereco = dados.endereco;
  }
}