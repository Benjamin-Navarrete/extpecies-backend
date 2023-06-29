// Archivo src\controllers\historial.controller.js
import { Historial } from '../models/Historial';

// Función para crear un registro de historial
export const createHistorial = async (req, res) => {
  try {
    // Obtener los datos del usuario y de la búsqueda desde el cuerpo de la petición
    const { usuarioId, fecha, hora, especie, informacion } = req.body;

    // Crear el registro en la base de datos usando el modelo Historial
    const newHistorial = await Historial.create(
      {
        usuarioId,
        fecha,
        hora,
        especie,
        informacion,
      },
      {
        fields: ['usuarioId', 'fecha', 'hora', 'especie', 'informacion'],
      },
    );

    // Devolver una respuesta exitosa con el registro creado
    res.status(201).json({
      message: 'Registro de historial creado exitosamente',
      data: newHistorial,
    });
  } catch (error) {
    console.log(error);
    // Devolver una respuesta de error con el mensaje del error
    res.status(500).json({
      message: 'Error al crear el registro de historial',
      error,
    });
  }
};

// Función para leer los registros de historial de un usuario
export const getHistorialByUsuario = async (req, res) => {
  try {
    // Obtener el id del usuario desde los parámetros de la ruta
    const { usuarioId } = req.params;

    // Buscar todos los registros de historial que coincidan con el id del usuario, ordenados por fecha y hora
    const historial = await Historial.findAll({
      where: {
        usuarioId,
      },
      order: [
        ['fecha', 'DESC'],
        ['hora', 'DESC'],
      ],
    });

    // Devolver una respuesta exitosa con los registros encontrados
    res.status(200).json({
      message: 'Registros de historial obtenidos exitosamente',
      data: historial,
    });
  } catch (error) {
    // Devolver una respuesta de error con el mensaje del error
    res.status(500).json({
      message: 'Error al obtener los registros de historial',
      error,
    });
  }
};

// Función para actualizar un registro de historial
export const updateHistorial = async (req, res) => {
  try {
    // Obtener el id del registro desde los parámetros de la ruta
    const { id } = req.params;

    // Obtener los datos a actualizar desde el cuerpo de la petición
    const { informacion } = req.body;

    // Buscar el registro en la base de datos por el id
    const historial = await Historial.findOne({
      where: {
        id,
      },
    });

    // Verificar si el registro existe
    if (historial) {
      // Actualizar el registro con los datos recibidos
      await historial.update({
        informacion,
      });

      // Devolver una respuesta exitosa con el registro actualizado
      res.status(200).json({
        message: 'Registro de historial actualizado exitosamente',
        data: historial,
      });
    } else {
      // Devolver una respuesta de error si el registro no existe
      res.status(404).json({
        message:
          'No se encontró el registro de historial con el id especificado',
      });
    }
  } catch (error) {
    // Devolver una respuesta de error con el mensaje del error
    res.status(500).json({
      message: 'Error al actualizar el registro de historial',
      error,
    });
  }
};

// Función para eliminar un registro de historial
export const deleteHistorial = async (req, res) => {
  try {
    // Obtener el id del registro desde los parámetros de la ruta
    const { id } = req.params;
    // Buscar el registro en la base de datos por el id
    const historial = await Historial.findOne({
      where: {
        id,
      },
    });

    // Verificar si el registro existe
    if (historial) {
      // Eliminar el registro de la base de datos
      await historial.destroy();

      // Devolver una respuesta exitosa con el registro eliminado
      res.status(200).json({
        message: 'Registro de historial eliminado exitosamente',
        data: historial,
      });
    } else {
      // Devolver una respuesta de error si el registro no existe
      res.status(404).json({
        message:
          'No se encontró el registro de historial con el id especificado',
      });
    }
  } catch (error) {
    // Devolver una respuesta de error con el mensaje del error
    res
      .status(500)
      .json({ message: 'Error al eliminar el registro de historial', error });
  }
};

// Función para eliminar todos los registros de historial de un usuario
export const deleteHistorialByUsuario = async (req, res) => {
  try {
    // Obtener el id del usuario desde los parámetros de la ruta
    const { usuarioId } = req.params;
    // Eliminar todos los registros de historial que coincidan con el id del usuario
    const deletedRows = await Historial.destroy({
      where: {
        usuarioId,
      },
    });

    // Devolver una respuesta exitosa con el número de registros eliminados
    res.status(200).json({
      message: 'Registros de historial eliminados exitosamente',
      data: deletedRows,
    });
  } catch (error) {
    // Devolver una respuesta de error con el mensaje del error
    res
      .status(500)
      .json({ message: 'Error al eliminar los registros de historial', error });
  }
};
