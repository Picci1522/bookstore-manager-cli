import type { IAutor } from '../interfaces/IAutor';

export class Autor implements IAutor {
  id?: number;
  nome: string;
  nacionalidade?: string;
  dataNascimento?: Date | string;

  constructor(dados: IAutor) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.nacionalidade = dados.nacionalidade;
    this.dataNascimento = dados.dataNascimento;
  }
}