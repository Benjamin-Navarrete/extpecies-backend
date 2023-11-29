// Archivo src\routes\usuarios.routes.js
import { Router } from 'express';
const router = Router();

import * as usuariosController from '../controllers/usuarios.controller';
import upload from '../config/multer';

// CRUD usuarios

router.get('/', usuariosController.obtenerUsuarios);

router.post('/', usuariosController.crearUsuario);

// Modificar esta ruta para que use multer y suba las imágenes
// Agregar el middleware verificarEstado para que solo los usuarios activados puedan actualizar sus datos
router.put(
  '/:id',
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'fotoPortada', maxCount: 1 },
  ]),
  usuariosController.actualizarUsuario,
);

router.get('/:id', usuariosController.obtenerUsuarioPorId);

// Nueva ruta para obtener usuario por username
router.get('/username/:username', usuariosController.obtenerUsuarioPorUsername);

router.put('/editUserByAdmin/:id', usuariosController.actualizarUsuarioByAdmin);

router.put('/cambiar-pass/:id', usuariosController.cambiarContraseña);

router.put('/activar/:id', usuariosController.activarODesactivar);

export default router;
