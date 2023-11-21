// Archivo src\middlewares\logros\likes.middleware.js
import { Usuario } from '../../models/Usuario';
import { Likes } from '../../models/Likes';
import { Logro } from '../../models/Logro';
import { UsuarioLogro } from '../../models/UsuarioLogro';

export const likesLogros = async (req, res, next) => {
  try {
    // Obtener el id del usuario de la petición
    const usuarioId = req.user.id;

    // Si el usuario no está logeado, continuar con el siguiente middleware o la ruta
    if (!usuarioId) {
      return next();
    }

    // Obtener el id de la especie de la url
    const especieId = req.body.id_especie;

    // Consultar si el usuario ha dado like a la especie antes
    const like = await Likes.findOne({
      where: { id_usuario: usuarioId, id_especie: especieId },
    });

    // Si el usuario no ha dado like a la especie antes
    if (!like) {
      // Incrementar el contador de likesCount del usuario
      await Usuario.increment('likesCount', { where: { id: usuarioId } });
    }

    // Obtener el usuario de la base de datos con sus logros asociados
    const usuario = await Usuario.findByPk(usuarioId, {
      include: {
        model: Logro,
        as: 'logros',
      },
    });

    // Obtener los nombres de los logros que el usuario ya tiene
    const logrosUsuario = usuario.logros.map((logro) => logro.nombre);

    // Definir las condiciones para obtener cada logro relacionado con los likesCount
    const condicionesLogros = {
      'Me Gusta Inicial': () => usuario.likesCount >= 1, // Si el usuario da un like
      'Amante de la Biodiversidad': () => usuario.likesCount >= 5, // Si el usuario da 5 likesCount
      'Guardián de la Naturaleza': () => usuario.likesCount >= 15, // Si el usuario da 15 likesCount
    };

    // Recorrer las condiciones y asignar los logros que se cumplan y que el usuario no tenga
    for (const [nombre, condicion] of Object.entries(condicionesLogros)) {
      if (condicion() && !logrosUsuario.includes(nombre)) {
        // Obtener el logro de la base de datos
        const logro = await Logro.findOne({ where: { nombre } });

        // Asignar el logro al usuario y guardar la fecha
        await UsuarioLogro.create({
          id_usuario: usuarioId,
          id_logro: logro.id,
          fecha: new Date(),
        });

        // Guardar el nombre y el icono del logro en el objeto req
        req.logro = { nombre: logro.nombre, descripcion: logro.descripcion };
      }
    }

    // Continuar con el siguiente middleware o la ruta
    next();
  } catch (error) {
    // Manejar el error de alguna manera (puede ser útil registrar el error)
    console.error('Error en likesLogros middleware:', error);
    // Puedes enviar una respuesta de error al cliente si es necesario
    res.status(500).send('Error interno del servidor');
  }
};
