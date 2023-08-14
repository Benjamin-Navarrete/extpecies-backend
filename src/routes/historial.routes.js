// Archivo src\routes\historial.routes.js:
import { Router } from 'express';
import * as historialController from '../controllers/historial.controller';

const router = Router();

router.post('/historial', historialController.createHistorial);

router.get('/historial/:usuarioId', historialController.getHistorialByUsuario);

router.put('/historial/:id', historialController.updateHistorial);

router.delete('/historial/:id', historialController.deleteHistorial);

router.delete(
  '/historiales/:usuarioId',
  historialController.deleteHistorialByUsuario,
);

export default router;
