// Archivo src\database\loadLogros.js
import fs from 'fs';
import path from 'path';
import { Logro } from '../models/Logro';

export default async function loadLogrosToDatabase() {
  const logrosFilePath = path.resolve(__dirname, 'logros.json');
  const logrosData = JSON.parse(fs.readFileSync(logrosFilePath, 'utf8'));

  for (const logro of logrosData) {
    await Logro.create(logro);
  }
}
