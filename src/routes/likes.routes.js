// Archivo src\routes\likes.routes.js
import { Router } from 'express';
const router = Router();

import * as likesController from '../controllers/likes.controller';

// CRUD likes

router.get('/', likesController.obtenerLikes);

router.post('/', likesController.crearLike);

router.delete('/:id', likesController.eliminarLike);

router.get('/users/:id', likesController.getLikesByUser);

router.get('/especies/:id', likesController.getLikesByEspecie);

export default router;
