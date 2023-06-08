// Archivo src\routes\loadData.routes.js
import express from 'express';
import loadJsonToDatabase from '../database/loadData';
import { sequelize } from '../database/database';

const router = express.Router();

router.get('/loadData', async (req, res, next) => {
  try {
    await loadJsonToDatabase(sequelize);
    res.status(200).send('Data loaded successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
