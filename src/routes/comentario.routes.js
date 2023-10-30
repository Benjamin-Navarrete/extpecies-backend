// Archivo src/routes/comentario.js
import express from 'express';
import * as comentarioController from '../controllers/comentario.controller';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
  '/comentarios',
  //   authMiddleware.verificarToken,
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
