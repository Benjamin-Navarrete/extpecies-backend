// Archivo src/routes/especieRoutes.js
import { Router } from 'express';
import { especieController as controller } from '../controllers/especies.controller';

const router = Router();

// CRUD especies
router.get('/', controller.getAllSpecies);

router.post('/', controller.createSpecies);

router.put('/:id', controller.updateSpecies);

router.delete('/:id', controller.deleteSpecies);

router.get('/:id', controller.getSpeciesById);

export default router;
