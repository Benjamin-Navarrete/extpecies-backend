// Archivo src\routes\logros.routes.js
import { Router } from 'express';
import { getAllAchievementsByUserId } from '../controllers/logros.controller';

const router = Router();

// Ruta para obtener logros de un usuario por su id
router.get('/usuario/:id', getAllAchievementsByUserId);

export default router;
