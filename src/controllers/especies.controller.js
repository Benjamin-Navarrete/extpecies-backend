// Archivo src\controllers\especies.controller.js
import { Especie } from '../models/Especie';

const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res, message, status = 500) => {
  res.status(status).json({ error: message });
};

export const especieController = {
  getAllSpecies: async (req, res) => {
    try {
      // Usar el método attributes para especificar los campos que quieres obtener
      const especies = await Especie.findAll({
        attributes: [
          'id',
          'latitud',
          'longitud',
          'imagen',
          'nombreComun',
          'estadoConservacion',
        ],
      });
      handleSuccess(res, especies);
    } catch (error) {
      handleError(res, error.message);
    }
  },

  getSpeciesById: async (req, res) => {
    try {
      // Obtener el id de la especie desde el parámetro de la ruta
      const { id } = req.params;
      // Buscar la especie por id
      const especie = await Especie.findByPk(id);
      // Verificar si la especie existe
      if (especie) {
        // Devolver los datos de la especie
        handleSuccess(res, especie);
      } else {
        // Devolver un mensaje de error si la especie no existe
        handleError(res, 'La especie no existe', 404);
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },

  createSpecies: async (req, res) => {
    try {
      const especie = await Especie.create(req.body);
      handleSuccess(res, especie, 201);
    } catch (error) {
      handleError(res, error.message);
    }
  },

  updateSpecies: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Especie.update(req.body, { where: { id: id } });
      if (updated) {
        const updatedEspecie = await Especie.findByPk(id);
        handleSuccess(res, updatedEspecie);
      } else {
        handleError(res, `Especie con id ${id} no encontrada`, 404);
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },

  deleteSpecies: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Especie.destroy({ where: { id: id } });
      if (deleted) {
        handleSuccess(res, { message: `Especie con id ${id} eliminada` }, 204);
      } else {
        handleError(res, `Especie con id ${id} no encontrada`, 404);
      }
    } catch (error) {
      handleError(res, error.message);
    }
  },
};
