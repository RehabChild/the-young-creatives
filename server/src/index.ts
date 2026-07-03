import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { checkDbConnection } from './db/pool';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function start() {
  try {
    await checkDbConnection();
    console.log('Connected to PostgreSQL.');
  } catch (err) {
    console.error('Could not connect to the database. Check DATABASE_URL in .env.');
    console.error(err);
    process.exit(1);
  }

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`The Young Creatives API listening on http://localhost:${PORT}`);
  });
}

start();
