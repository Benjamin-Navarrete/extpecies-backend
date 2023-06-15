// Archivo src\controllers\usuarios.controller.js
import { Usuario } from '../models/Usuario';

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Ocurrió un error al obtener los usuarios.' });
  }
};

import bcrypt from 'bcrypt';

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
      password: hashedPassword, // guardar la contraseña encriptada
      pais,
      boletinInformativo,
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al crear el usuario.' });
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
      return res.status(404).json({ error: 'Usuario no encontrado.' });
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

    res.status(200).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Ocurrió un error al actualizar el usuario.' });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await usuario.destroy();

    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario.' });
  }
};
