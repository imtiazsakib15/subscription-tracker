import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const { PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const config = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};

export default config;
