import type { IEmprestimo } from '../interfaces/IEmprestimo';

export class Emprestimo implements IEmprestimo {
  id?: number;
  clienteId: number;
  livroId: number;
  dataEmprestimo?: Date | string;
  dataDevolucao?: Date | string | null;
  nomeCliente?: string;
  tituloLivro?: string;

  constructor(dados: IEmprestimo) {
    this.id = dados.id;
    this.clienteId = dados.clienteId;
    this.livroId = dados.livroId;
    this.dataEmprestimo = dados.dataEmprestimo;
    this.dataDevolucao = dados.dataDevolucao;
    this.nomeCliente = dados.nomeCliente;
    this.tituloLivro = dados.tituloLivro;
  }
}