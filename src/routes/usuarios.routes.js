// Archivo src\routes\usuarios.routes.js
import { Router } from 'express';
const router = Router();

import * as usuariosController from '../controllers/usuarios.controller';
import upload from '../config/multer';

// CRUD usuarios

router.get('/', usuariosController.obtenerUsuarios);

router.post('/', usuariosController.crearUsuario);

// Modificar esta ruta para que use multer y suba las imágenes
router.put(
  '/:id',
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'fotoPortada', maxCount: 1 },
  ]),
  usuariosController.actualizarUsuario,
);

router.delete('/:id', usuariosController.eliminarUsuario);

router.get('/:id', usuariosController.obtenerUsuarioPorId);

export default router;
