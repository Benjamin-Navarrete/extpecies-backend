// Archivo src\controllers\usuarios.controller.js
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcrypt';

const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res, message, status = 500) => {
  res.status(status).json({ error: message });
};

const NOT_FOUND_MESSAGE = 'Usuario no encontrado.';
const ERROR_MESSAGES = {
  obtener: 'Ocurrió un error al obtener los usuarios.',
  crear: 'Ocurrió un error al crear el usuario.',
  actualizar: 'Ocurrió un error al actualizar el usuario.',
  eliminar: 'Ocurrió un error al eliminar el usuario.',
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    handleSuccess(res, usuarios);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      nombres,
      apellidos,
      correo,
      telefono,
      password,
      pais,
      boletinInformativo,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // demás validaciones, búsqueda de usuario existente, etc...

    const usuario = await Usuario.create({
      nombre,
      nombres,
      apellidos,
      correo,
      telefono,
      password: hashedPassword,
      pais,
      boletinInformativo,
    });

    handleSuccess(res, usuario, 201);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.crear);
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      nombres,
      apellidos,
      correo,
      telefono,
      password,
      pais,
      boletinInformativo,
    } = req.body;

    // Aquí puedes realizar la validación de los datos recibidos antes de actualizar el usuario

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    await usuario.update({
      nombre,
      nombres,
      apellidos,
      correo,
      telefono,
      password,
      pais,
      boletinInformativo,
    });

    handleSuccess(res, usuario);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.actualizar);
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    await usuario.destroy();

    handleSuccess(res, { message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    handleError(res, ERROR_MESSAGES.eliminar);
  }
};
