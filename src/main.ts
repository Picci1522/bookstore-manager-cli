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