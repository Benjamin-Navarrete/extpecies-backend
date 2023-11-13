// Archivo src\controllers\usuarios.controller.js
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

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

// Crear este nuevo controlador para obtener usuario por id
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    handleSuccess(res, usuario);
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
      fotoPerfil,
      fotoPortada,
      username,
    } = req.body;

    // Aquí puedes realizar la validación de los datos recibidos antes de actualizar el usuario

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    // Validar que el username no esté ya tomado por otro usuario
    const existeUsername = await Usuario.findOne({ where: { username } });
    if (existeUsername && existeUsername.id !== id) {
      return res.status(400).json({ error: 'El username ya está en uso' });
    }

    // Validar que las fotos sean de un formato válido
    // Puedes usar otro criterio si quieres
    const formatosValidos = ['image/jpeg', 'image/png'];
    if (fotoPerfil && !formatosValidos.includes(fotoPerfil.mimetype)) {
      return res.status(400).json({ error: 'La foto de perfil no es válida' });
    }
    if (fotoPortada && !formatosValidos.includes(fotoPortada.mimetype)) {
      return res.status(400).json({ error: 'La foto de portada no es válida' });
    }

    // Borrar las imágenes anteriores si el usuario cambia las fotos
    // Puedes usar otro criterio si quieres
    if (fotoPerfil && fotoPerfil.filename !== usuario.fotoPerfil) {
      fs.unlink(path.join('uploads', usuario.fotoPerfil), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
    if (fotoPortada && fotoPortada.filename !== usuario.fotoPortada) {
      fs.unlink(path.join('uploads', usuario.fotoPortada), (err) => {
        if (err) {
          console.error(err);
        }
      });
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
      fotoPerfil: fotoPerfil ? fotoPerfil.filename : usuario.fotoPerfil,
      fotoPortada: fotoPortada ? fotoPortada.filename : usuario.fotoPortada,
      username,
    });

    // Crear una variable para guardar la ruta base del servidor
    const serverUrl = 'http://localhost:3500';

    // Crear una variable para guardar la ruta completa de la foto de perfil
    const profilePhotoUrl = path.join(serverUrl, usuario.fotoPerfil);
    // Devolver las rutas completas de las fotos en la respuesta
    handleSuccess(res, {
      ...usuario,
      fotoPerfil: profilePhotoUrl,
      fotoPortada: coverPhotoUrl,
    });
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
