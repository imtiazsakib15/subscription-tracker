import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const { PORT, DATABASE_URL } = process.env;

const config = {
  PORT,
  DATABASE_URL,
};

export default config;
