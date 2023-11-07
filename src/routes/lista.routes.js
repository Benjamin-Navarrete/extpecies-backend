// Archivo src\routes\lista.routes.js
import { Router } from 'express';
// Importo el controlador de listas
import * as controller from '../controllers/listas.controller';

// Creo una instancia de Router
const router = Router();

router.post('/getLists', controller.getAllLists); // Obtener todas las listas
router.post('/', controller.createList); // Crear una nueva lista
router.put('/:lista_id/especies/:especie_id', controller.addSpecieToList); // Agregar una especie a una lista
router.delete('/:listaId', controller.deleteList);

// Exporto el router
export default router;
