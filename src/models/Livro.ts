import type { ILivro } from '../interfaces/ILivro';

export class Livro implements ILivro {
  id?: number;
  titulo: string;
  anoPublicacao?: number;
  quantidadeDisponivel: number;
  autorId: number;

  constructor(dados: ILivro) {
    this.id = dados.id;
    this.titulo = dados.titulo;
    this.anoPublicacao = dados.anoPublicacao;
    this.quantidadeDisponivel = dados.quantidadeDisponivel;
    this.autorId = dados.autorId;
  }
}