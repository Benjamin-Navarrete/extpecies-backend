// Archivo src\middlewares\authLogros.js
import jwt from 'jsonwebtoken';

export const authLogros = (req, res, next) => {
  // Crear el objeto req.user
  req.user = {};
  console.log('------------------1------------------------');
  // Obtener el token del encabezado Authorization
  const token = req.headers['authorization'];
  console.log('------------------2------------------------');

  console.log(token);
  console.log(req.headers);
  // Si el token no existe, asignar un valor null al objeto req.user.id
  if (!token) {
    req.user.id = null;

    return next();
  }
  console.log('------------------3------------------------');
  // Verificar el token usando el secreto con el que se firmó
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // Si hay un error al verificar el token, asignar un valor null al objeto req.user.id
    if (err) {
      req.user.id = null;
      return next();
    }
    console.log('------------------4------------------------');
    // Si el token es válido, asignar el id del usuario al objeto req.user.id
    req.user.id = decoded.id;

    // Continuar con el siguiente middleware o la ruta
    next();
  });
};
