// Archivo src\middlewares\logros\species.middleware.js
import { Usuario } from '../../models/Usuario';
import { Logro } from '../../models/Logro';
import { UsuarioLogro } from '../../models/UsuarioLogro';
import { EspecieVista } from '../../models/EspecieVista';

export const speciesLogros = async (req, res, next) => {
  try {
    // Obtener el id del usuario de la petición
    const usuarioId = req.user.id;

    // Si el usuario no está logeado, continuar con el siguiente middleware o la ruta
    if (!usuarioId) {
      return next();
    }

    // Obtener el id de la especie de la url
    const especieId = req.params.id;

    // Consultar si el usuario ha visto la especie antes
    const especieVista = await EspecieVista.findOne({
      where: { id_usuario: usuarioId, id_especie: especieId },
    });

    // Si el usuario no ha visto la especie antes
    if (!especieVista) {
      // Incrementar el contador de especies vistas del usuario
      await Usuario.increment('especiesVisionadas', {
        where: { id: usuarioId },
      });

      // Crear un nuevo registro en la tabla intermedia
      await EspecieVista.create({
        id_usuario: usuarioId,
        id_especie: especieId,
      });
    }

    // Obtener el usuario de la base de datos
    const usuario = await Usuario.findByPk(usuarioId, {
      include: {
        model: Logro,
        as: 'logros',
      },
    });

    // Obtener los nombres de los logros que el usuario ya tiene
    const logrosUsuario = usuario.logros.map((logro) => logro.nombre);

    // Definir las condiciones para obtener cada logro
    const condicionesLogros = {
      'Explorador Novato': () => usuario.especiesVisionadas >= 1, // Si el usuario ve una especie
      'Ojo Agudo': () => usuario.especiesVisionadas >= 15, // Si el usuario ha visto 15 especies
      'Eco Explorador': () => usuario.especiesVisionadas >= 30, // Si el usuario ha visto 30 especies
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
    console.error('Error en speciesLogros middleware:', error);
    // Puedes enviar una respuesta de error al cliente si es necesario
    res.status(500).send('Error interno del servidor');
  }
};
