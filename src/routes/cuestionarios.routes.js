// Archivo src\routes\cuestionarios.routes.js
import { Router } from 'express';
const router = Router();

import * as cuestionariosController from '../controllers/cuestionarios.controller';

router.get('/:id', cuestionariosController.obtenerCuestionariosPorUsuarioId);

router.post('/', cuestionariosController.crearCuestionario);

export default router;
