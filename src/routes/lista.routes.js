// Archivo src\routes\lista.routes.js
import { Router } from 'express';
// Importo el controlador de listas
import * as controller from '../controllers/listas.controller';
import { listasLogros } from '../middlewares/logros/listas.middleware';
import { authLogros } from '../middlewares/authLogros';

// Creo una instancia de Router
const router = Router();

router.post('/getLists', controller.getAllLists);
router.post('/', authLogros, listasLogros, controller.createList);
router.put('/:lista_id/especies/:especie_id', controller.addSpecieToList);
router.delete('/:listaId', controller.deleteList);
router.put('/:lista_id', controller.updateList);
router.delete(
  '/:lista_id/especies/:especie_id',
  controller.deleteSpecieFromList,
);
router.get('/:lista_id', controller.getListById);

// Exporto el router
export default router;
