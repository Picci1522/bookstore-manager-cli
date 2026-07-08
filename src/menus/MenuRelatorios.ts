import readlineSync from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

export async function exibirMenuRelatorios() {
  const controle = new EmprestimoController();
  let opcao: string;

  do {
    console.log("\n--- MENU RELATÓRIOS ---");
    console.log("1. Livros disponíveis");
    console.log("2. Livros por autor");
    console.log("0. Voltar");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": await controle.relatorioLivrosDisponiveis(); break;
      case "2": await controle.relatorioLivrosPorAutor(); break;
      case "0": break;
      default: console.log("Opção inválida!");
    }
  } while (opcao !== "0");
}