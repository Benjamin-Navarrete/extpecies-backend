// Archivo src/controllers/auth.controller.js
import { Usuario } from '../models/Usuario';
import { Rol } from '../models/Rol';
import { Permiso } from '../models/Permiso';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_EXPIRATION = 43200; // Tiempo de expiración del token (en segundos)

export const signUp = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      correoElectronico,
      password,
      pais,
      boletinInformativo,
      rol = 'usuario',
    } = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: { correo: correoElectronico },
    });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const passwordEncriptado = await encryptPassword(password);

    let rolUsuario = await Rol.findOne({ where: { nombre_rol: rol } });

    if (!rolUsuario) {
      rolUsuario = await Rol.create({ nombre_rol: rol });
    }

    // Generar un username único con el nombre, el apellido y un número aleatorio entre 1 y 1000
    let username = await Usuario.generarNumeroAleatorio(nombres, 1, 1000);
    const nuevoUsuario = await Usuario.create({
      nombres,
      apellidos,
      correo: correoElectronico,
      password: passwordEncriptado,
      pais,
      boletinInformativo,
      nombre_rol: rolUsuario.nombre_rol,
      username,
    });

    const token = jwt.sign({ id: nuevoUsuario.id }, process.env.SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { correoElectronico, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { correo: correoElectronico },
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no registrado' });
    }

    const passwordValido = await comparePassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const { rol, permisos } = await usuario.getRoleAndPermissions();

    // retornar usuario y token
    const usuarioLogeado = {
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      telefono: usuario.telefono,
      pais: usuario.pais,
      boletinInformativo: usuario.boletinInformativo,
      nombre_rol: usuario.nombre_rol,
    };

    const token = jwt.sign(
      { id: usuario.id, rol, permisos, usuario: usuarioLogeado },
      process.env.SECRET,
      { expiresIn: TOKEN_EXPIRATION },
    );

    res.status(200).json({ token, usuario: usuarioLogeado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, receivedPassword) => {
  try {
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    throw error;
  }
};
