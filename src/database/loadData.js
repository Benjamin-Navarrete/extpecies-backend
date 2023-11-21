// Archivo src\database\loadData.js
import fs from 'fs';
import path from 'path';
import { Especie } from '../models/Especie';

const loadJsonToDatabase = async () => {
  const jsonFilePath = path.resolve(__dirname, 'especies_EX.json');
  const json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  const especies = Object.values(json);

  for (const especie of especies) {
    try {
      await Especie.create(especie);
    } catch (error) {
      console.error(`Failed to create species: ${especie.nombreCientifico}`);
      console.error(error);
      throw error; // Lanzar una excepción para detener la carga de datos
    }
  }
};

export default loadJsonToDatabase;
