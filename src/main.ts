<<<<<<< HEAD
<<<<<<< HEAD
import dotenv from 'dotenv';
import './config/database';
import { exibirMenuPrincipal } from './menus/MenuPrincipal';

dotenv.config();

async function iniciarSistema() {
  try {
    await exibirMenuPrincipal();
  } catch (erro) {
    console.log("❌ Erro inesperado:", (erro as Error).message);
    process.exit(1);
  }
}

iniciarSistema();
=======
=======
>>>>>>> feat/relatorios
async function bootstrap() {
    console.log("🚀 BookStore Manager CLI inicializado com sucesso!");
}

bootstrap();
<<<<<<< HEAD
>>>>>>> f0fa785b23cb81ae95d50578267f110d6a552551
=======
=======
import { showMainMenu } from './menus/main.menu';

const main = async () => {
    console.log("🚀 BookStore Manager CLI inicializado com sucesso!\n");
    
    // Chama o menu principal para a tela
    await showMainMenu();
};

main();
>>>>>>> bd1a9d9 (Primeiro commit)
>>>>>>> feat/relatorios
