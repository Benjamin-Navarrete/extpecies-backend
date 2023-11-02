// Importo los modelos de Lista, Usuario y Especie
import { Lista } from '../models/Lista';
import { Usuario } from '../models/Usuario';
import { Especie } from '../models/Especie';

// Creo una función para crear una nueva lista
export const createList = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la petición
    const { nombre, descripcion, usuarioId } = req.body;

    // Valido que el usuario exista en la base de datos
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      // Si el usuario no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró el usuario con el id ' + usuarioId,
      });
    }

    // Si el usuario existe, creo una nueva lista con los datos recibidos
    const lista = await Lista.create({
      nombre,
      descripcion,
      usuarioId,
    });

    // Envío una respuesta con el código 201 y la lista creada
    return res.status(201).json(lista);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear la lista',
      error,
    });
  }
};

// Creo una función para obtener todas las listas del usuario
export const getAllLists = async (req, res) => {
  try {
    // Obtengo el id del usuario de la petición
    const { userId } = req.body;

    // Valido que el usuario exista en la base de datos
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      // Si el usuario no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró el usuario con el id ' + userId,
      });
    }

    // Si el usuario existe, obtengo todas las listas del usuario
    const listas = await Lista.findAll({
      where: { usuarioId: userId },
      include: {
        model: Especie,
        as: 'especies',
        through: { attributes: [] }, // No incluir la tabla intermedia
      },
    });

    // Envío una respuesta con el código 200 y las listas obtenidas
    return res.status(200).json(listas);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener las listas',
      error,
    });
  }
};
