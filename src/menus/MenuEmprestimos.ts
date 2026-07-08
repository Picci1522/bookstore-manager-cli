import readlineSync from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

export async function exibirMenuEmprestimos() {
  const controle = new EmprestimoController();
  let opcao: string;

  do {
    console.log("\n--- MENU EMPRÉSTIMOS ---");
    console.log("1. Realizar empréstimo");
    console.log("2. Registrar devolução");
    console.log("3. Listar todos");
    console.log("0. Voltar");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": await controle.realizarEmprestimo(); break;
      case "2": await controle.registrarDevolucao(); break;
      case "3": await controle.listarEmprestimos(); break;
      case "0": break;
      default: console.log("Opção inválida!");
    }
  } while (opcao !== "0");
}