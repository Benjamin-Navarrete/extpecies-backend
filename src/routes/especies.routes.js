// Archivo src/routes/especieRoutes.js
import { Router } from 'express';
import { especieController as controller } from '../controllers/especies.controller';

const router = Router();

// CRUD especies
router.get('/', controller.getAll);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.get('/:id', controller.getById);

export default router;
