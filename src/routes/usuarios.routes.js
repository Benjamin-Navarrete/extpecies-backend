// Archivo src\routes\usuarios.routes.js
import { Router } from 'express';
const router = Router();

import * as usuariosController from '../controllers/usuarios.controller';
// import { authJwt } from '../middlewares';

// CRUD usuarios

router.get('/', usuariosController.obtenerUsuario);

router.post('/', usuariosController.crearUsuario);

router.put('/:id', usuariosController.actualizarUsuario);

router.delete('/:id', usuariosController.eliminarUsuario);

export default router;
