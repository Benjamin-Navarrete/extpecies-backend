// Archivo src\routes\rol.routes.js

import { Router } from 'express';
import * as rolesController from '../controllers/roles.controller';

const router = Router();

router.get('/', rolesController.obtenerRoles);

export default router;
