import pool from './config/database';
import { exibirMenuPrincipal } from './menus/MenuPrincipal';

async function iniciar() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    await exibirMenuPrincipal();
  } catch (erro) {
    console.error('❌ Erro na conexão com o banco:', (erro as Error).message);
    process.exit(1);
  }
}

iniciar();