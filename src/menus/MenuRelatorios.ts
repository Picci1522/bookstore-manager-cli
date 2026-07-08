import readlineSync from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

export async function exibirMenuRelatorios() {
  const controle = new EmprestimoController();
  let opcao: string;

  do {
    console.log("\n--- MENU RELATÓRIOS ---");
    console.log("1. Livros disponíveis");
    console.log("2. Livros emprestados");
    console.log("3. Livros cadastrados por autor");
    console.log("4. Quantidade de empréstimos por livro");
    console.log("5. Clientes com empréstimos ativos");
    console.log("0. Voltar ao menu principal");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": await controle.relatorioLivrosDisponiveis(); break;
      case "2": await controle.relatorioLivrosEmprestados(); break;
      case "3": await controle.relatorioLivrosPorAutor(); break;
      case "4": await controle.relatorioEmprestimosPorLivro(); break;
      case "5": await controle.relatorioClientesComEmprestimos(); break;
      case "0": break;
      default: console.log("❌ Opção inválida! Tente novamente.");
    }
  } while (opcao !== "0");
}