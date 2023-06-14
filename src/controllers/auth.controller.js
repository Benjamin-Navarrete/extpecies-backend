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
  const { correoElectronico, password } = req.body;
  try {
    // Buscar el usuario por el correo electrónico
    const usuario = await Usuario.findOne({
      where: { correo: correoElectronico },
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Comparar la contraseña recibida con la contraseña encriptada
    const passwordValido = await comparePassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    // Generar el token de autenticación
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
      expiresIn: 300,
    });
    // Enviar el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    // Manejar los posibles errores
    res.status(500).json({ message: error.message });
  }
};

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
