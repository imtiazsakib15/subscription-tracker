import { Client } from '@upstash/workflow';
import config from '.';

export const workflowClient = new Client({
  baseUrl: config.QSTASH_URL,
  token: config.QSTASH_TOKEN,
});
