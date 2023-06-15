// Archivo src\routes\loadUsers.routes.js
import express from 'express';
import { loadSqlFile, executeSql } from '../database/loadSqlData';

const router = express.Router();

router.get('/loadUsers', async (req, res, next) => {
  try {
    const sql = await loadSqlFile();
    await executeSql(sql);
    res.status(200).send('Data loaded successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
