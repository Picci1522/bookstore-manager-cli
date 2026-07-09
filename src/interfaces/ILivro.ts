export interface ILivro {
  id?: number;
  titulo: string;
  genero: string;
  anoPublicacao?: number;
  quantidadeEstoque: number;
  autorId: number;
  nomeAutor?: string;
}