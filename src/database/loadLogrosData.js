// Archivo src\database\loadLogrosData.js
import loadLogrosToDatabase from './loadLogros';

export default async function loadLogrosData() {
  await loadLogrosToDatabase();
}
