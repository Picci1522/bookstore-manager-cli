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
async function bootstrap() {
    console.log("🚀 BookStore Manager CLI inicializado com sucesso!");
}

bootstrap();
>>>>>>> f0fa785b23cb81ae95d50578267f110d6a552551
