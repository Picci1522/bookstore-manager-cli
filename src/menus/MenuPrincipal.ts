import readlineSync from 'readline-sync';
import { exibirMenuAutores } from './MenuAutores';
import { exibirMenuLivros } from './MenuLivros';
import { exibirMenuClientes } from './MenuClientes';
import { exibirMenuEmprestimos } from './MenuEmprestimos';
import { exibirMenuRelatorios } from './MenuRelatorios';

export async function exibirMenuPrincipal() {
  let opcao: string;

  console.log("\n====================================");
  console.log("📚 BOOKSTORE MANAGER CLI");
  console.log("====================================");

  do {
    console.log("\n--- MENU PRINCIPAL ---");
    console.log("1. Gerenciar Autores");
    console.log("2. Gerenciar Livros");
    console.log("3. Gerenciar Clientes");
    console.log("4. Gerenciar Empréstimos");
    console.log("5. Relatórios");
    console.log("0. Sair");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": await exibirMenuAutores(); break;
      case "2": await exibirMenuLivros(); break;
      case "3": await exibirMenuClientes(); break;
      case "4": await exibirMenuEmprestimos(); break;
      case "5": await exibirMenuRelatorios(); break;
      case "0": console.log("👋 Encerrando sistema..."); break;
      default: console.log("❌ Opção inválida! Tente novamente.");
    }
  } while (opcao !== "0");
}