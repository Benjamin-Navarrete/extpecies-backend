// Archivo src\controllers\roles.controller.js

import { Rol } from '../models/Rol';

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los roles.' });
  }
};
