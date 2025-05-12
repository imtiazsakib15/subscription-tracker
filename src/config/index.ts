import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const {
  PORT,
  SERVER_URL,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
} = process.env;

const config = {
  PORT,
  SERVER_URL,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
};

export default config;
