// Archivo src/routes/especieRoutes.js
import { Router } from 'express';
import { especieController as controller } from '../controllers/especies.controller';
import { authLogros } from '../middlewares/authLogros';
import { speciesLogros } from '../middlewares/logros/species.middleware';

const router = Router();

// CRUD especies
router.get('/', controller.getAllSpecies);

router.post('/', controller.createSpecies);

router.put('/:id', controller.updateSpecies);

router.delete('/:id', controller.deleteSpecies);

router.get('/:id', authLogros, speciesLogros, controller.getSpeciesById);

router.get('/all/allSpecies', controller.getAllAllSpecies);

export default router;
