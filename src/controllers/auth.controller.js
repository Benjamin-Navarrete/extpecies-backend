// Archivo src/controllers/auth.controller.js
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Controlador para registrar usuario
export const signUp = async (req, res) => {
  const {
    nombreCompleto,
    correoElectronico,
    password,
    pais,
    boletinInformativo,
  } = req.body;
  try {
    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { correo: correoElectronico },
    });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }
    // Encriptar la contraseña
    const passwordEncriptado = await encryptPassword(password);
    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombres: nombreCompleto.split(' ')[0],
      apellidos: nombreCompleto.split(' ').slice(1).join(' '),
      correo: correoElectronico,
      password: passwordEncriptado,
      pais: pais,
      boletinInformativo: boletinInformativo,
    });
    // Generar el token de autenticación
    const token = jwt.sign({ id: nuevoUsuario.id }, process.env.SECRET, {
      expiresIn: 300,
    });
    // Enviar el token como respuesta
    res.status(201).json({ token });
  } catch (error) {
    // Manejar los posibles errores
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { correo, password } = req.body;
  const usuarioEncontrado = await Usuario.findOne({
    where: { correo: correo },
  });

  if (!usuarioEncontrado) {
    return res.status(400).json({ message: 'Usuario no encontrado.' });
  } else {
    const matchPassword = await comparePassword(
      password,
      usuarioEncontrado.password,
    );

    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: 'Contraseña inválida' });

    const token = jwt.sign({ id: usuarioEncontrado.id }, process.env.SECRET, {
      expiresIn: 300,
    });

    res.json({ token });
  }
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
