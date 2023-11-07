// Archivo src\controllers\listas.controller.js
import { Lista } from '../models/Lista';
import { Usuario } from '../models/Usuario';
import { Especie } from '../models/Especie';

// Creo una función para crear una nueva lista
export const createList = async (req, res) => {
  try {
    // Obtengo los datos del cuerpo de la petición
    const { nombre, descripcion, usuario_id } = req.body;

    // Valido que el usuario exista en la base de datos
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      // Si el usuario no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró el usuario con el id ' + usuario_id,
      });
    }

    // Si el usuario existe, creo una nueva lista con los datos recibidos
    const lista = await Lista.create({
      nombre,
      descripcion,
      usuario_id,
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
      where: { usuario_id: userId },
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

// Creo una función para añadir una especie a una lista
export const addSpecieToList = async (req, res) => {
  try {
    // Obtengo los parámetros de la ruta
    const { lista_id, especie_id } = req.params;

    // Valido que la lista exista en la base de datos
    const lista = await Lista.findByPk(lista_id, {
      include: {
        model: Especie,
        as: 'especies',
      },
    });
    if (!lista) {
      // Si la lista no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró la lista con el id ' + lista_id,
      });
    }

    // Valido que la especie exista en la base de datos
    const especie = await Especie.findByPk(especie_id);
    if (!especie) {
      // Si la especie no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró la especie con el id ' + especie_id,
      });
    }

    // Valido que la lista no tenga ya la especie que se quiere añadir
    const hasEspecie = await lista.hasEspecy(especie); // Uso el método hasEspecie para comprobar si la lista tiene la especie
    if (hasEspecie) {
      // Si la lista tiene la especie, envío una respuesta con el código 400 y un mensaje de error
      return res.status(400).json({
        message:
          'La lista ' +
          lista.nombre +
          ' ya tiene la especie ' +
          especie.nombreComun,
      });
    }

    // Si la lista y la especie existen y la lista no tiene la especie, uso el método addEspecie del modelo Lista para asociar la especie a la lista
    await lista.addEspecy(especie);

    // Envío una respuesta con el código 200 y un mensaje de éxito
    return res.status(200).json({
      message:
        'Se ha añadido la especie ' +
        especie.nombreComun +
        ' a la lista ' +
        lista.nombre,
    });
  } catch (error) {
    console.log(error);
    // Enviar una respuesta con el código 500 y el error
    return res.status(500).json({
      message: 'Error al añadir la especie a la lista',
      error,
    });
  }
};

// Función para eliminar una lista
export const deleteList = async (req, res) => {
  try {
    // Obtengo el id de la lista del parámetro de la ruta
    const { listaId } = req.params;

    // Busco y elimino la lista con el modelo Lista
    const lista = await Lista.destroy({
      where: {
        id: listaId,
      },
    });

    // Si la lista no se encuentra, envío una respuesta con el código 404 y un mensaje de error
    if (!lista) {
      return res.status(404).json({
        message: 'No se encontró la lista con el id ' + listaId,
      });
    }

    // Si la lista se encuentra y se elimina, envío una respuesta con el código 200 y un mensaje de éxito
    return res.status(200).json({
      message: 'La lista se ha eliminado correctamente',
    });
  } catch (error) {
    // Si ocurre un error, envío una respuesta con el código 500 y un mensaje de error
    return res.status(500).json({
      message: 'Error al eliminar la lista',
      error,
    });
  }
};

// Creo una función para actualizar una lista por su id
export const updateList = async (req, res) => {
  try {
    // Obtengo el id de la lista de los parámetros de la ruta
    const { lista_id } = req.params;

    // Obtengo los datos del cuerpo de la petición
    const { nombre, descripcion } = req.body;

    // Valido que la lista exista en la base de datos
    const lista = await Lista.findByPk(lista_id);
    if (!lista) {
      // Si la lista no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró la lista con el id ' + lista_id,
      });
    }

    // Si la lista existe, uso el método update del modelo Lista para actualizar la lista con los nuevos valores
    const listaActualizada = await lista.update({
      nombre,
      descripcion,
    });

    // Envío una respuesta con el código 200 y la lista actualizada
    return res.status(200).json({
      message: 'La lista se ha actualizado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar la lista',
      error,
    });
  }
};

// Creo una función para eliminar una especie de una lista
export const deleteSpecieFromList = async (req, res) => {
  try {
    // Obtengo los parámetros de la ruta
    const { lista_id, especie_id } = req.params;

    // Valido que la lista exista en la base de datos
    const lista = await Lista.findByPk(lista_id, {
      include: {
        model: Especie,
        as: 'especies',
      },
    });
    if (!lista) {
      // Si la lista no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró la lista con el id ' + lista_id,
      });
    }

    // Valido que la especie exista en la base de datos
    const especie = await Especie.findByPk(especie_id);
    if (!especie) {
      // Si la especie no existe, envío una respuesta con el código 404 y un mensaje de error
      return res.status(404).json({
        message: 'No se encontró la especie con el id ' + especie_id,
      });
    }

    // Valido que la lista tenga la especie que se quiere eliminar
    const hasEspecie = await lista.hasEspecy(especie); // Uso el método hasEspecie para comprobar si la lista tiene la especie
    if (!hasEspecie) {
      // Si la lista no tiene la especie, envío una respuesta con el código 400 y un mensaje de error
      return res.status(400).json({
        message:
          'La lista ' +
          lista.nombre +
          ' no tiene la especie ' +
          especie.nombreComun,
      });
    }

    // Si la lista y la especie existen y la lista tiene la especie, uso el método removeEspecie del modelo Lista para desasociar la especie de la lista
    await lista.removeEspecy(especie);

    // Envío una respuesta con el código 200 y un mensaje de éxito
    return res.status(200).json({
      message:
        'Se ha eliminado la especie ' +
        especie.nombreComun +
        ' de la lista ' +
        lista.nombre,
    });
  } catch (error) {
    console.log(error);
    // Enviar una respuesta con el código 500 y el error
    return res.status(500).json({
      message: 'Error al eliminar la especie de la lista',
      error,
    });
  }
};
