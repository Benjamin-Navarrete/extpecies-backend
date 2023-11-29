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

    const usuario = await Usuario.findByPk(id, {
      attributes: [
        'id',
        'nombres',
        'apellidos',
        'correo',
        'pais',
        'fotoPerfil',
        'fotoPortada',
        'username',
      ], // replace with your actual field names
    });

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

    // Buscar si existe un usuario con el mismo correo
    const usuarioExistente = await Usuario.findOne({
      where: { correo: correo },
    });
    console.log(usuarioExistente);

    // Si existe, enviar un mensaje de error
    if (usuarioExistente) {
      return handleError(res, 'Ya existe un usuario con ese correo', 409);
    }

    // Si no existe, continuar con la creación del usuario
    const hashedPassword = await bcrypt.hash(password, 10);

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

// Crear una función para validar el formato de las imágenes y devolver un mensaje de error si no son válidas
const validarFormatoImagen = (imagen) => {
  const formatosValidos = ['image/jpeg', 'image/png'];
  if (imagen && !formatosValidos.includes(imagen.mimetype)) {
    return `La imagen ${imagen.fieldname} no es válida`;
  }
  return null;
};

// Crear una función para borrar las imágenes anteriores si el usuario cambia las fotos
const borrarImagenAnterior = (imagen, usuario) => {
  if (imagen && imagen.filename !== usuario[imagen.fieldname]) {
    if (
      usuario[imagen.fieldname] !== 'default-cover.jpg' &&
      usuario[imagen.fieldname] !== 'default-profile.jpg'
    ) {
      fs.unlink(path.join('uploads', usuario[imagen.fieldname]), (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      nombres,
      apellidos,
      telefono,
      pais,
      boletinInformativo,
      username,
    } = req.body;

    // Obtener las imágenes de la solicitud
    const fotoPerfil = req.files.fotoPerfil ? req.files.fotoPerfil[0] : null;
    const fotoPortada = req.files.fotoPortada ? req.files.fotoPortada[0] : null;

    // Aquí puedes realizar la validación de los datos recibidos antes de actualizar el usuario

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    // Fetch the current user's data
    const currentUser = await Usuario.findOne({ where: { id } });

    // If the username hasn't changed, skip the validation
    if (currentUser.username === username) {
      // Continue with the rest of the code
    } else {
      // Validar que el username no esté ya tomado por otro usuario
      const existeUsername = await Usuario.findOne({ where: { username } });
      if (existeUsername && existeUsername.id !== id) {
        return res.status(400).json({ error: 'El username ya está en uso' });
      }
      // Continue with the rest of the code
    }

    // Validar que las fotos sean de un formato válido usando la función creada
    const errorFotoPerfil = validarFormatoImagen(fotoPerfil);
    const errorFotoPortada = validarFormatoImagen(fotoPortada);
    if (errorFotoPerfil) {
      return res.status(400).json({ error: errorFotoPerfil });
    }
    if (errorFotoPortada) {
      return res.status(400).json({ error: errorFotoPortada });
    }

    // Borrar las imágenes anteriores si el usuario cambia las fotos usando la función creada
    borrarImagenAnterior(fotoPerfil, usuario);
    borrarImagenAnterior(fotoPortada, usuario);

    await usuario.update({
      nombre,
      nombres,
      apellidos,
      telefono,
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
    // Crear una variable para guardar la ruta completa de la foto de portada
    const coverPhotoUrl = path.join(serverUrl, usuario.fotoPortada);
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

export const actualizarUsuarioByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, correo, pais, nombre_rol } = req.body;

    console.log('rol', nombre_rol);

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    await usuario.update({
      nombres,
      apellidos,
      correo,
      pais,
      nombre_rol,
    });

    handleSuccess(res, usuario);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.actualizar);
  }
};

export const desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Buscar el usuario por el id
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    // En lugar de eliminar el usuario, llamar a la función activarODesactivar con el estado false
    await Usuario.activarODesactivar(id, false);

    handleSuccess(res, { message: 'Usuario desactivado correctamente.' });
  } catch (error) {
    console.error(error);
    handleError(res, ERROR_MESSAGES.eliminar);
  }
};

export const activarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Buscar el usuario por el id
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    // Llamar a la función activarODesactivar con el estado true
    await Usuario.activarODesactivar(id, true);

    handleSuccess(res, { message: 'Usuario activado correctamente.' });
  } catch (error) {
    console.error(error);
    handleError(res, ERROR_MESSAGES.activar);
  }
};

// Nuevo controlador para obtener usuario por username
export const obtenerUsuarioPorUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const usuario = await Usuario.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
    });

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    handleSuccess(res, usuario);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};

// Nuevo controlador para cambiar contraseña
export const cambiarContraseña = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaContraseña } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    // Hashear la nueva contraseña usando el mismo número de rondas que se usó al crear el usuario
    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar el usuario con la nueva contraseña hasheada
    await usuario.update({
      password: hashedPassword,
    });

    // Enviar una respuesta exitosa con el usuario actualizado y un mensaje de confirmación
    handleSuccess(
      res.status(200).json({
        usuario,
        message: 'Contraseña actualizada correctamente.',
      }),
    );
  } catch (error) {
    console.log(error);
    handleError(res, ERROR_MESSAGES.actualizar);
  }
};
