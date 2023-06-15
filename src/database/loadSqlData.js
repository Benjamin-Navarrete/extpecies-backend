// Archivo src\database\loadSqlData.js
import fs from 'fs';
import path from 'path';
import { sequelize } from '../database/database';

export const loadSqlFile = async () => {
  const sqlFilePath = path.resolve(__dirname, 'loadData.sql');
  const sql = fs.readFileSync(sqlFilePath, 'utf8');

  return sql;
};

export const executeSql = async (sql) => {
  const lines = sql.split('\n');
  let statement = '';

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine !== '' && !trimmedLine.startsWith('--')) {
      statement += trimmedLine;
      if (trimmedLine.endsWith(';')) {
        try {
          await sequelize.query(statement);
        } catch (error) {
          console.error(`Failed to execute statement: ${statement}`);
          console.error(error);
          throw error;
        }
        statement = '';
      }
    }
  }
};
