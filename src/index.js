// Archivo index.js
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './database/database';

const port = process.env.PORT;

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database updated');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
