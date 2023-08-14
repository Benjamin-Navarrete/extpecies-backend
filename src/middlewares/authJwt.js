// Archivo src\middlewares\authJwt.js
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';
import dotenv from 'dotenv';

dotenv.config();

const handleAuthError = (res, message, status) => {
  res.status(status).json({ message });
};

const ERROR_MESSAGES = {
  noToken: 'No token provided',
  unauthorized: 'Unauthorized',
  userNotFound: 'User not found',
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return handleAuthError(res, ERROR_MESSAGES.noToken, 403);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    const user = await Usuario.findByPk(req.userId);
    if (!user) {
      return handleAuthError(res, ERROR_MESSAGES.userNotFound, 404);
    }
    console.log(user);
    next();
  } catch (error) {
    return handleAuthError(res, ERROR_MESSAGES.unauthorized, 401);
  }
};

const checkUserRole = async (req, res, next, allowedRoles) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    if (allowedRoles.includes(user.rol)) {
      next();
    } else {
      return handleAuthError(res, ERROR_MESSAGES.unauthorized, 403);
    }
  } catch (error) {
    return handleAuthError(res, ERROR_MESSAGES.unauthorized, 403);
  }
};

export const isUser = async (req, res, next) => {
  await checkUserRole(req, res, next, ['usuario', 'editor', 'administrador']);
};

export const isEditor = async (req, res, next) => {
  await checkUserRole(req, res, next, ['editor', 'administrador']);
};

export const isAdmin = async (req, res, next) => {
  await checkUserRole(req, res, next, ['administrador']);
};
