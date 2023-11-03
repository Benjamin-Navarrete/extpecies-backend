// Archivo src\controllers\historial.controller.js
import { Historial } from '../models/Historial';

const handleSuccess = (res, message, data = null, status = 200) => {
  res.status(status).json({ message, data });
};

const handleError = (res, message, error, status = 500) => {
  console.log(error);
  res.status(status).json({ message, error });
};

const NOT_FOUND_MESSAGE =
  'No se encontró el registro de historial con el id especificado';

const deleteHistorialById = async (id, res) => {
  try {
    const historial = await Historial.findOne({ where: { id } });
    if (!historial) {
      handleNotFound(res, NOT_FOUND_MESSAGE);
      return;
    }

    await historial.destroy();
    handleSuccess(
      res,
      'Registro de historial eliminado exitosamente',
      historial,
    );
  } catch (error) {
    handleError(res, 'Error al eliminar el registro de historial', error);
  }
};

const handleNotFound = (res, message) => {
  res.status(404).json({ message });
};

export const createHistorial = async (req, res) => {
  try {
    const { usuario_id, fecha, hora, especie, informacion } = req.body;
    const newHistorial = await Historial.create(
      {
        usuario_id,
        fecha,
        hora,
        especie,
        informacion,
      },
      {
        fields: ['usuario_id', 'fecha', 'hora', 'especie', 'informacion'],
      },
    );
    handleSuccess(
      res,
      'Registro de historial creado exitosamente',
      newHistorial,
      201,
    );
  } catch (error) {
    handleError(res, 'Error al crear el registro de historial', error);
  }
};

export const getHistorialByUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const historial = await Historial.findAll({
      where: {
        usuario_id,
      },
      order: [
        ['fecha', 'DESC'],
        ['hora', 'DESC'],
      ],
    });
    handleSuccess(
      res,
      'Registros de historial obtenidos exitosamente',
      historial,
    );
  } catch (error) {
    handleError(res, 'Error al obtener los registros de historial', error);
  }
};

export const updateHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { informacion } = req.body;
    const historial = await Historial.findOne({ where: { id } });
    if (!historial) {
      handleNotFound(res, NOT_FOUND_MESSAGE);
      return;
    }
    await historial.update({ informacion });
    handleSuccess(
      res,
      'Registro de historial actualizado exitosamente',
      historial,
    );
  } catch (error) {
    handleError(res, 'Error al actualizar el registro de historial', error);
  }
};

export const deleteHistorial = async (req, res) => {
  const { id } = req.params;
  await deleteHistorialById(id, res);
};

export const deleteHistorialByUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const deletedRows = await Historial.destroy({
      where: {
        usuario_id,
      },
    });
    handleSuccess(
      res,
      'Registros de historial eliminados exitosamente',
      deletedRows,
    );
  } catch (error) {
    handleError(res, 'Error al eliminar los registros de historial', error);
  }
};
