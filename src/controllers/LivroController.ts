import readlineSync from 'readline-sync';
import { LivroService } from '../services/LivroService';
import { AutorService } from '../services/AutorService';

export class LivroController {
  private servico = new LivroService();

  async cadastrar() {
    try {
      console.log("\n📖 Cadastrar Novo Livro");
      const titulo = readlineSync.question("Título: ");
      const ano = Number(readlineSync.question("Ano de publicação: "));
      const qtd = Number(readlineSync.question("Quantidade disponível: "));
      const idAutor = Number(readlineSync.question("ID do autor: "));

      const livro = await this.servico.cadastrar({
        titulo,
        anoPublicacao: ano || undefined,
        quantidadeDisponivel: qtd,
        autorId: idAutor
      });

      console.log(`✅ Livro cadastrado! ID: ${livro.id}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async listarTodos() {
    try {
      console.log("\n📚 Lista de Livros");
      const lista = await this.servico.listarTodos();
      lista.forEach(l => {
        console.log(`ID: ${l.id} | Título: ${l.titulo} | Qtd: ${l.quantidadeDisponivel} | Autor ID: ${l.autorId}`);
      });
    } catch (erro) {
      console.log(`ℹ️ ${(erro as Error).message}`);
    }
  }

  async buscarPorId() {
    try {
      const id = Number(readlineSync.question("Digite o ID do livro: "));
      const livro = await this.servico.buscarPorId(id);
      console.log(`\n🔍 Livro encontrado:`);
      console.log(`ID: ${livro.id}`);
      console.log(`Título: ${livro.titulo}`);
      console.log(`Ano: ${livro.anoPublicacao || 'Não informado'}`);
      console.log(`Quantidade: ${livro.quantidadeDisponivel}`);
      console.log(`ID do Autor: ${livro.autorId}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async atualizar() {
    try {
      const id = Number(readlineSync.question("Digite o ID do livro: "));
      const novoTitulo = readlineSync.question("Novo título (vazio = manter): ");
      const novoAno = readlineSync.question("Novo ano (vazio = manter): ");
      const novaQtd = readlineSync.question("Nova quantidade (vazio = manter): ");
      const novoAutor = readlineSync.question("Novo ID do autor (vazio = manter): ");

      const dados = {
        ...(novoTitulo && { titulo: novoTitulo }),
        ...(novoAno && { anoPublicacao: Number(novoAno) }),
        ...(novaQtd && { quantidadeDisponivel: Number(novaQtd) }),
        ...(novoAutor && { autorId: Number(novoAutor) })
      };

      const atualizado = await this.servico.atualizar(id, dados);
      console.log(`✅ Livro atualizado: ${atualizado.titulo}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async excluir() {
    try {
      const id = Number(readlineSync.question("Digite o ID do livro para excluir: "));
      const resultado = await this.servico.excluir(id);
      console.log(`✅ ${resultado.mensagem}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }
}