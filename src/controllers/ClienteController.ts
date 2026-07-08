import readlineSync from 'readline-sync';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
  private servico = new ClienteService();

  async cadastrar() {
    try {
      console.log("\n👤 Cadastrar Novo Cliente");
      const nome = readlineSync.question("Nome: ");
      const email = readlineSync.question("E-mail: ");
      const telefone = readlineSync.question("Telefone: ");
      const endereco = readlineSync.question("Endereço: ");

      const cliente = await this.servico.cadastrar({
        nome,
        email,
        telefone: telefone || undefined,
        endereco: endereco || undefined
      });

      console.log(`✅ Cliente cadastrado! ID: ${cliente.id}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async listarTodos() {
    try {
      console.log("\n📋 Lista de Clientes");
      const lista = await this.servico.listarTodos();
      lista.forEach(c => {
        console.log(`ID: ${c.id} | Nome: ${c.nome} | E-mail: ${c.email}`);
      });
    } catch (erro) {
      console.log(`ℹ️ ${(erro as Error).message}`);
    }
  }

  async buscarPorId() {
    try {
      const id = Number(readlineSync.question("Digite o ID do cliente: "));
      const cliente = await this.servico.buscarPorId(id);
      console.log(`\n🔍 Cliente encontrado:`);
      console.log(`ID: ${cliente.id}`);
      console.log(`Nome: ${cliente.nome}`);
      console.log(`E-mail: ${cliente.email}`);
      console.log(`Telefone: ${cliente.telefone || 'Não informado'}`);
      console.log(`Endereço: ${cliente.endereco || 'Não informado'}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async atualizar() {
    try {
      const id = Number(readlineSync.question("Digite o ID do cliente: "));
      const novoNome = readlineSync.question("Novo nome (vazio = manter): ");
      const novoEmail = readlineSync.question("Novo e-mail (vazio = manter): ");
      const novoTel = readlineSync.question("Novo telefone (vazio = manter): ");
      const novoEnd = readlineSync.question("Novo endereço (vazio = manter): ");

      const dados = {
        ...(novoNome && { nome: novoNome }),
        ...(novoEmail && { email: novoEmail }),
        ...(novoTel && { telefone: novoTel }),
        ...(novoEnd && { endereco: novoEnd })
      };

      const atualizado = await this.servico.atualizar(id, dados);
      console.log(`✅ Cliente atualizado: ${atualizado.nome}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }

  async excluir() {
    try {
      const id = Number(readlineSync.question("Digite o ID do cliente para excluir: "));
      const resultado = await this.servico.excluir(id);
      console.log(`✅ ${resultado.mensagem}`);
    } catch (erro) {
      console.log(`❌ ${(erro as Error).message}`);
    }
  }
}