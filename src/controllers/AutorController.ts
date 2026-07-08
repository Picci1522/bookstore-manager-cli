import readlineSync from 'readline-sync';
import { AutorService } from '../services/AutorService';

export class AutorController {
  private servico = new AutorService();

  async cadastrar() {
    try {
      console.log("\n📝 Cadastrar Novo Autor");
      const nome = readlineSync.question("Nome: ");
      const nacionalidade = readlineSync.question("Nacionalidade: ");
      const dataNascimento = readlineSync.question("Data de nascimento (AAAA-MM-DD): ");

      const autor = await this.servico.cadastrar({
        nome,
        nacionalidade: nacionalidade || undefined,
        dataNascimento: dataNascimento || undefined
      });

      console.log(`✅ Autor cadastrado com sucesso! ID: ${autor.id}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async listarTodos() {
    try {
      console.log("\n📋 Lista de Autores");
      const lista = await this.servico.listarTodos();
      lista.forEach(a => {
        console.log(`ID: ${a.id} | Nome: ${a.nome} | Nacionalidade: ${a.nacionalidade || 'Não informada'}`);
      });
    } catch (erro) {
      console.log(`ℹ️ ${(erro as Error).message}`);
    }
  }

  async buscarPorId() {
    try {
      const id = Number(readlineSync.question("Digite o ID do autor: "));
      const autor = await this.servico.buscarPorId(id);
      console.log(`\n🔍 Autor encontrado:`);
      console.log(`ID: ${autor.id}`);
      console.log(`Nome: ${autor.nome}`);
      console.log(`Nacionalidade: ${autor.nacionalidade || 'Não informada'}`);
      console.log(`Nascimento: ${autor.dataNascimento || 'Não informada'}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async atualizar() {
    try {
      const id = Number(readlineSync.question("Digite o ID do autor: "));
      const novoNome = readlineSync.question("Novo nome (deixe vazio para manter): ");
      const novaNacionalidade = readlineSync.question("Nova nacionalidade (deixe vazio para manter): ");
      const novaData = readlineSync.question("Nova data de nascimento (deixe vazio para manter): ");

      const dados = {
        ...(novoNome && { nome: novoNome }),
        ...(novaNacionalidade && { nacionalidade: novaNacionalidade }),
        ...(novaData && { dataNascimento: novaData })
      };

      const atualizado = await this.servico.atualizar(id, dados);
      console.log(`✅ Autor atualizado: ${atualizado.nome}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async excluir() {
    try {
      const id = Number(readlineSync.question("Digite o ID do autor para excluir: "));
      const resultado = await this.servico.excluir(id);
      console.log(`✅ ${resultado.mensagem}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }
}