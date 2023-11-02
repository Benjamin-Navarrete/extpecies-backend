// Archivo src\controllers\roles.controller.js
import { Rol } from '../models/Rol';
import { RolPermiso } from '../models/RolPermiso';

const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res, message, status = 500) => {
  res.status(status).json({ error: message });
};

const ERROR_MESSAGE = 'Ocurrió un error al obtener los roles.';

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    handleSuccess(res, roles);
  } catch (error) {
    handleError(res, ERROR_MESSAGE);
  }
};
