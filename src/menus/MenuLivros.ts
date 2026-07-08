import readlineSync from 'readline-sync';
import { LivroController } from '../controllers/LivroController';

export async function exibirMenuLivros() {
  const controle = new LivroController();
  let opcao: string;

  do {
    console.log("\n--- MENU LIVROS ---");
    console.log("1. Cadastrar");
    console.log("2. Listar todos");
    console.log("3. Buscar por ID");
    console.log("4. Atualizar");
    console.log("5. Excluir");
    console.log("0. Voltar");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": await controle.cadastrar(); break;
      case "2": await controle.listarTodos(); break;
      case "3": await controle.buscarPorId(); break;
      case "4": await controle.atualizar(); break;
      case "5": await controle.excluir(); break;
      case "0": break;
      default: console.log("Opção inválida!");
    }
  } while (opcao !== "0");
}