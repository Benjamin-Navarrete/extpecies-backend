// Archivo src\routes\likes.routes.js
import { Router } from 'express';
const router = Router();

import * as likesController from '../controllers/likes.controller';

// CRUD likes

router.get('/', likesController.obtenerLikes);

router.get(
  '/users/:id_usuario/especies/:id_especie',
  likesController.getLikeByUserAndEspecie,
);

router.post('/', likesController.crearLike);

router.delete('/', likesController.eliminarLike);

router.get('/users/:id', likesController.getLikesByUser);

router.get('/especies/:id', likesController.getLikesByEspecie);

router.get('/especies/:id/count', likesController.getLikesCountByEspecie);

export default router;
