import type { ILivro } from '../interfaces/ILivro';
export class Livro implements ILivro {
  id?: number;
  titulo: string;
  genero: string;
  anoPublicacao?: number;
  quantidadeEstoque: number;
  autorId: number;
  nomeAutor?: string;
  constructor(d: ILivro) {
    this.id=d.id; this.titulo=d.titulo; this.genero=d.genero;
    this.anoPublicacao=d.anoPublicacao; this.quantidadeEstoque=d.quantidadeEstoque;
    this.autorId=d.autorId; this.nomeAutor=d.nomeAutor;
  }
}