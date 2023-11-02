// Archivo src\routes\lista.routes.js
import { Router } from 'express';
// Importo el controlador de listas
import * as controller from '../controllers/listas.controller';

// Creo una instancia de Router
const router = Router();

// Defino las rutas para las operaciones CRUD de las listas
router.post('/getLists', controller.getAllLists); // Obtener todas las listas
router.post('/', controller.createList); // Crear una nueva lista
// router.put('/:id', controller.updateList); // Actualizar una lista por id
// router.delete('/:id', controller.deleteList); // Eliminar una lista por id
// router.get('/:id', controller.getListById); // Obtener una lista por id

// Exporto el router
export default router;
