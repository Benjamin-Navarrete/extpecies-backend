// Archivo src/controllers/auth.controller.js
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async (req, res) => {
  const { nombres, apellidos, correo, telefono, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo: correo } });
    if (usuario === null) {
      const newUsuario = await Usuario.create({
        nombres,
        apellidos,
        correo,
        telefono,
        password: await encryptPassword(password),
      });

      console.log(newUsuario);

      res.status(201).json('Usuario creado exitosamente');
    } else {
      res.json('Usuario ya existe');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
