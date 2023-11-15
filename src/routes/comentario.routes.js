// Archivo src/routes/comentario.js
import express from 'express';
import * as comentarioController from '../controllers/comentario.controller';
import { comentariosLogros } from '../middlewares/logros/comentarios.middleware';
import { authLogros } from '../middlewares/authLogros';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
  '/comentarios',
  authLogros,
  comentariosLogros,
  comentarioController.crearComentario,
);
router.get(
  '/comentarios',
  //   authMiddleware.verificarToken,
  comentarioController.obtenerComentarios,
);
router.put(
  '/comentarios/:id',
  //   authMiddleware.verificarToken,
  comentarioController.actualizarComentario,
);
router.delete(
  '/comentarios/:id',
  //   authMiddleware.verificarToken,
  comentarioController.eliminarComentario,
);

export default router;
