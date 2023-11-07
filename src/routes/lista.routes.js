// Archivo src\routes\lista.routes.js
import { Router } from 'express';
// Importo el controlador de listas
import * as controller from '../controllers/listas.controller';

// Creo una instancia de Router
const router = Router();

router.post('/getLists', controller.getAllLists);
router.post('/', controller.createList);
router.put('/:lista_id/especies/:especie_id', controller.addSpecieToList);
router.delete('/:listaId', controller.deleteList);
router.put('/:lista_id', controller.updateList);
router.delete(
  '/:lista_id/especies/:especie_id',
  controller.deleteSpecieFromList,
);

// Exporto el router
export default router;
