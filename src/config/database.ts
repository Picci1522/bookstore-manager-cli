import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool: Pool = new Pool({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
});

export default pool;