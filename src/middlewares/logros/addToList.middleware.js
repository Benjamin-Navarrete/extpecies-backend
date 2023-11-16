// Archivo src\middlewares\logros\addToList.middleware.js
import { Usuario } from '../../models/Usuario';
import { Lista } from '../../models/Lista';
import { Especie } from '../../models/Especie';
import { Logro } from '../../models/Logro';
import { UsuarioLogro } from '../../models/UsuarioLogro';

export const addToList = async (req, res, next) => {
  try {
    console.log('1------------------------------------------');
    // Obtener el id del usuario de la petición
    const usuarioId = req.user.id;

    // Si el usuario no está logeado, continuar con el siguiente middleware o la ruta
    if (!usuarioId) {
      return next();
    }

    console.log('2------------------------------------------');
    // Obtener el usuario de la base de datos con sus logros, listas y especies asociadas
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [
        {
          model: Logro,
          as: 'logros',
        },
        {
          model: Lista,
          as: 'listas',
          include: [
            {
              model: Especie,
              as: 'especies',
            },
          ],
        },
      ],
    });
    console.log('3------------------------------------------');
    // Obtener los nombres de los logros que el usuario ya tiene
    const logrosUsuario = usuario.logros.map((logro) => logro.nombre);

    // Obtener el id de la lista y el id de la especie de la petición
    const listaId = req.params.lista_id;
    const especieId = req.params.especie_id;

    // Buscar la lista y la especie en la base de datos y verificar si existen
    const lista = await Lista.findByPk(listaId, {
      include: [
        {
          model: Especie,
          as: 'especies',
        },
      ],
    });
    const especie = await Especie.findByPk(especieId);
    if (!lista || !especie) {
      return res.status(404).send('Lista o especie no encontrada');
    }
    console.log('4------------------------------------------');
    // Contar el número de especies que la lista tiene
    const especiesLista = lista.especies.length;

    // Incrementar el número de especies en uno para considerar la especie que se está añadiendo
    const especiesListaMasUno = especiesLista + 1;

    // Definir las condiciones para obtener cada logro relacionado con las especies
    const condicionesLogros = {
      'Coleccionista de Especies': () => especiesListaMasUno >= 1, // Si el usuario añade una especie a una lista
      'Guardián de Ecosistemas': () => especiesListaMasUno >= 5, // Si el usuario añade 5 especies a una lista
    };
    console.log('5------------------------------------------');
    // Recorrer las condiciones y asignar los logros que se cumplan y que el usuario no tenga
    for (const [nombre, condicion] of Object.entries(condicionesLogros)) {
      if (condicion() && !logrosUsuario.includes(nombre)) {
        // Obtener el logro de la base de datos
        const logro = await Logro.findOne({ where: { nombre } });
        console.log('6------------------------------------------');
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
    console.log('7------------------------------------------');
    // Continuar con el siguiente middleware o la ruta
    next();
  } catch (error) {
    // Manejar el error de alguna manera (puede ser útil registrar el error)
    console.error('Error en addToList middleware:', error);
    // Puedes enviar una respuesta de error al cliente si es necesario
    res.status(500).send('Error interno del servidor');
  }
};
