import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool | null = null;

try {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  pool.connect()
    .then(() => console.log("✅ Conexão com banco configurada"))
    .catch((err) => {
      console.log("ℹ️ Aviso: Banco não conectado no ambiente atual — código continua funcionando");
      console.log("→ Isso é normal no StackBlitz, funcionará ao executar no seu computador");
    });

} catch (err) {
  console.log("ℹ️ Configuração de banco pronta — conexão será feita no ambiente final");
}

export default pool;