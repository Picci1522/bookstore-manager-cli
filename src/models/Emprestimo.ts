import type { IEmprestimo } from '../interfaces/IEmprestimo';
export class Emprestimo implements IEmprestimo {
  id?: number;
  clienteId: number;
  livroId: number;
  dataEmprestimo?: Date | string;
  dataDevolucao?: Date | string | null;
  nomeCliente?: string;
  tituloLivro?: string;
  constructor(d: IEmprestimo) {
    this.id=d.id; this.clienteId=d.clienteId; this.livroId=d.livroId;
    this.dataEmprestimo=d.dataEmprestimo; this.dataDevolucao=d.dataDevolucao;
    this.nomeCliente=d.nomeCliente; this.tituloLivro=d.tituloLivro;
  }
}