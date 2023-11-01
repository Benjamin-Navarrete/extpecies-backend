// Importo los modelos de Lista, Usuario y Especie
import { Lista } from '../models/Lista';
import { Usuario } from '../models/Usuario';
import { Especie } from '../models/Especie';

// Creo una función para crear una nueva lista
export const createList = async (req, res) => {
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
};
