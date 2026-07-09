import * as rl from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

const ctrl = new EmprestimoController();

export async function exibirMenuRelatorios() {
  let op = '';
  do {
    console.log('\n--- RELATÓRIOS ---');
    console.log('1 — Livros disponíveis');
    console.log('2 — Livros emprestados');
    console.log('3 — Livros por autor');
    console.log('4 — Mais emprestados');
    console.log('5 — Clientes com empréstimos ativos');
    console.log('0 — Voltar');
    op = rl.question('Opção: ');
    switch (op) {
      case '1': await ctrl.relatorioLivrosDisponiveis(); break;
      case '2': await ctrl.relatorioLivrosEmprestados(); break;
      case '3': await ctrl.relatorioLivrosPorAutor(); break;
      case '4': await ctrl.relatorioEmprestimosPorLivro(); break;
      case '5': await ctrl.relatorioClientesComEmprestimos(); break;
      case '0': break;
      default: console.log('❌ Opção inválida');
    }
  } while (op !== '0');
}