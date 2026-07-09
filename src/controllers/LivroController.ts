import * as rl from 'readline-sync';
import { LivroService } from '../services/LivroService';

export class LivroController {
  private svc = new LivroService();

  async cadastrar() {
    try {
      const titulo = rl.question('Titulo: ');
      const genero = rl.question('Genero: ');
      const ano = rl.questionInt('Ano publicacao (0=pular): ', { defaultInput: '0' });
      const qtd = rl.questionInt('Quantidade estoque: ');
      const autorId = rl.questionInt('ID Autor: ');
      const l = await this.svc.cadastrar({
        titulo, genero,
        anoPublicacao: ano || undefined,
        quantidadeEstoque: qtd, autorId,
      });
      console.log('✅ Cadastrado ID:', l.id);
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async listarTodos() {
    try {
      const lista = await this.svc.listarTodos();
      lista.forEach(l => console.log(`#${l.id} | ${l.titulo} | ${l.genero} | Estoque:${l.quantidadeEstoque} | Autor:${l.nomeAutor ?? l.autorId}`));
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async buscarPorId() {
    try {
      const id = rl.questionInt('ID Livro: ');
      const l = await this.svc.buscarPorId(id);
      if (!l) return console.log('Não encontrado');
      console.log(l);
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async atualizar() {
    try {
      const id = rl.questionInt('ID Livro: ');
      const titulo = rl.question('Novo titulo (vazio=pular): ');
      const atualizado = await this.svc.atualizar(id, { titulo: titulo || undefined });
      if (!atualizado) return console.log('Não alterado');
      console.log('✅ Atualizado');
    } catch (e) { console.log('❌', (e as Error).message); }
  }

  async excluir() {
    try {
      const id = rl.questionInt('ID Livro: ');
      await this.svc.excluir(id);
      console.log('✅ Excluido');
    } catch (e) { console.log('❌', (e as Error).message); }
  }
}