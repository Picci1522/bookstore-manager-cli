import type { IEmprestimo } from '../interfaces/IEmprestimo';

export class Emprestimo implements IEmprestimo {
  id?: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo?: Date | string;
  dataDevolucao?: Date | string | null;
  devolvido: boolean;

  constructor(dados: IEmprestimo) {
    this.id = dados.id;
    this.livroId = dados.livroId;
    this.clienteId = dados.clienteId;
    this.dataEmprestimo = dados.dataEmprestimo || new Date();
    this.dataDevolucao = dados.dataDevolucao;
    this.devolvido = dados.devolvido;
  }
}