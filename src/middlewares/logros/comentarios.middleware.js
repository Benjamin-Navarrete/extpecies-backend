// Archivo src\middlewares\logros\comentarios.middleware.js
import { Usuario } from '../../models/Usuario';
import { Comentario } from '../../models/Comentario';
import { Logro } from '../../models/Logro';
import { UsuarioLogro } from '../../models/UsuarioLogro';

export const comentariosLogros = async (req, res, next) => {
  try {
    // Obtener el id del usuario de la petición
    const usuarioId = req.user.id;

    // Si el usuario no está logeado, continuar con el siguiente middleware o la ruta
    if (!usuarioId) {
      return next();
    }

    // Obtener el id de la especie de la url
    const especieId = req.body.especie_id;

    // Consultar si el usuario ha comentado la especie antes
    const comentario = await Comentario.findOne({
      where: { usuario_id: usuarioId, especie_id: especieId },
    });

    // Pasar el comentario al objeto req
    req.comentario = comentario;

    // Obtener el usuario de la base de datos con sus logros y comentarios asociados
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [
        {
          model: Logro,
          as: 'logros',
        },
        {
          model: Comentario,
          as: 'comentarios',
        },
      ],
    });

    // Obtener los nombres de los logros que el usuario ya tiene
    const logrosUsuario = usuario.logros.map((logro) => logro.nombre);

    // Crear un conjunto de los ids de las especies que el usuario ha comentado
    const especiesComentadas = new Set(
      usuario.comentarios.map((comentario) => comentario.especie_id),
    );

    // Agregar el id de la especie de la petición al conjunto
    especiesComentadas.add(especieId);

    // Definir las condiciones para obtener cada logro relacionado con los comentarios
    const condicionesLogros = {
      'Voz Comprometida': () => especiesComentadas.size >= 1, // Si el usuario comenta una especie
      'Comentarista Apasionado': () => especiesComentadas.size >= 5, // Si el usuario comenta 5 especies
      'Conversador de la Naturaleza': () => especiesComentadas.size >= 15, // Si el usuario comenta 15 especies
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
    console.error('Error en comentariosLogros middleware:', error);
    // Puedes enviar una respuesta de error al cliente si es necesario
    res.status(500).send('Error interno del servidor');
  }
};
