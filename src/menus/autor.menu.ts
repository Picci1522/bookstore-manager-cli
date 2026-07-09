import * as rl from 'readline-sync';
import { AutorController } from '../controllers/AutorController';

const ctrl = new AutorController();

export async function exibirMenuAutores() {
  let op = '';
  do {
    console.log('\n--- AUTORES ---');
    console.log('1 Cadastrar | 2 Listar | 3 Buscar | 4 Atualizar | 5 Excluir | 0 Voltar');
    op = rl.question('Opcao: ');
    switch (op) {
      case '1': await ctrl.cadastrar(); break;
      case '2': await ctrl.listarTodos(); break;
      case '3': await ctrl.buscarPorId(); break;
      case '4': await ctrl.atualizar(); break;
      case '5': await ctrl.excluir(); break;
      case '0': break;
      default: console.log('Invalido');
    }
  } while (op !== '0');
}