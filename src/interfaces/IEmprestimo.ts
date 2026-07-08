export interface IEmprestimo {
    id?: number;
    livroId: number;
    clienteId: number;
    dataEmprestimo?: Date | string;
    dataDevolucao?: Date | string | null;
    devolvido: boolean;
  }