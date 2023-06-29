// Archivo src\app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { RolPermiso } from './models/RolPermiso';

import usuariosRoutes from './routes/usuarios.routes';
import especiesRoutes from './routes/especies.routes';
import authRoutes from './routes/auth.routes';
import loadDataRoutes from './routes/loadData.routes';
import rolRoutes from './routes/rol.routes';
import loadUsersRoutes from './routes/loadUsers.routes';
import historialRoutes from './routes/historial.routes';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/especies', especiesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', loadDataRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/', loadUsersRoutes);
app.use('/api/', historialRoutes);

export default app;
