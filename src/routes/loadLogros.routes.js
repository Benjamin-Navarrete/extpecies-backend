// Archivo src\routes\loadLogros.routes.js
import express from 'express';
import loadLogrosData from '../database/loadLogrosData';

const router = express.Router();

router.get('/loadLogros', async (req, res, next) => {
  try {
    await loadLogrosData();
    res.status(200).send('Logros cargados exitosamente');
  } catch (error) {
    next(error);
  }
});

export default router;
