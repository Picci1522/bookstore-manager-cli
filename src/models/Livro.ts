import type { ILivro } from '../interfaces/ILivro';

export class Livro implements ILivro {
  id?: number;
  titulo: string;
  genero: string;
  anoPublicacao?: number;
  quantidadeEstoque: number;
  autorId: number;
  nomeAutor?: string;

  constructor(dados: ILivro) {
    this.id = dados.id;
    this.titulo = dados.titulo;
    this.genero = dados.genero;
    this.anoPublicacao = dados.anoPublicacao;
    this.quantidadeEstoque = dados.quantidadeEstoque;
    this.autorId = dados.autorId;
    this.nomeAutor = dados.nomeAutor;
  }
}