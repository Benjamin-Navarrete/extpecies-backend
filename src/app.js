// Archivo src\app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.routes';
import especiesRoutes from './routes/especies.routes';
import authRoutes from './routes/auth.routes';
import loadDataRoutes from './routes/loadData.routes';
import rolRoutes from './routes/rol.routes';
import loadUsersRoutes from './routes/loadUsers.routes';
import historialRoutes from './routes/historial.routes';
import likesRoutes from './routes/likes.routes';
import comentarioRoutes from './routes/comentario.routes';
import listaRoutes from './routes/lista.routes';
import loadLogrosRoutes from './routes/loadLogros.routes';
import logrosRoutes from './routes/logros.routes';
import cuestionariosRoutes from './routes/cuestionarios.routes';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurar el servidor para que sirva los archivos estáticos desde la carpeta uploads
app.use(express.static('uploads'));

//routes
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/especies', especiesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', loadDataRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/', loadUsersRoutes);
app.use('/api/', historialRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/', comentarioRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/', loadLogrosRoutes);
app.use('/api/logros', logrosRoutes);
app.use('/api/cuestionarios', cuestionariosRoutes);

export default app;
