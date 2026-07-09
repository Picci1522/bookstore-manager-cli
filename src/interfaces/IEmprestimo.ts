export interface IEmprestimo {
  id?: number;
  clienteId: number;
  livroId: number;
  dataEmprestimo?: Date | string;
  dataDevolucao?: Date | string | null;
  nomeCliente?: string;
  tituloLivro?: string;
}