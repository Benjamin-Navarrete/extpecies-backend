// Archivo src\middlewares\logros\listas.middleware.js
import { Usuario } from '../../models/Usuario';
import { Lista } from '../../models/Lista';
import { Logro } from '../../models/Logro';
import { UsuarioLogro } from '../../models/UsuarioLogro';

export const listasLogros = async (req, res, next) => {
  try {
    // Obtener el id del usuario de la petición
    const usuarioId = req.user.id;

    // Si el usuario no está logeado, continuar con el siguiente middleware o la ruta
    if (!usuarioId) {
      return next();
    }

    // Obtener el usuario de la base de datos con sus logros y listas asociadas
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [
        {
          model: Logro,
          as: 'logros',
        },
        {
          model: Lista,
          as: 'listas',
        },
      ],
    });

    // Obtener los nombres de los logros que el usuario ya tiene
    const logrosUsuario = usuario.logros.map((logro) => logro.nombre);

    // Contar el número de listas que el usuario ha creado
    const listasCreadas = usuario.listas.length;

    // Incrementar el número de listas creadas en uno para considerar la lista que se está creando
    const listasCreadasMasUno = listasCreadas + 1;

    // Definir las condiciones para obtener cada logro relacionado con las listas
    const condicionesLogros = {
      'Creador de Catálogos': () => listasCreadasMasUno >= 1, // Si el usuario crea una lista
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
    console.error('Error en listasLogros middleware:', error);
    // Puedes enviar una respuesta de error al cliente si es necesario
    res.status(500).send('Error interno del servidor');
  }
};
