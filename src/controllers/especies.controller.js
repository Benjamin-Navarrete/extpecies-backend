// Archivo src\controllers\especies.controller.js
import { Especie } from '../models/Especie';

export const especieController = {
  // Obtiene todas las especies
  getAll: async (req, res) => {
    try {
      const especies = await Especie.findAll();
      res.status(200).json(especies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtiene una especie por id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const especie = await Especie.findByPk(id);
      if (especie) {
        res.status(200).json(especie);
      } else {
        res.status(404).json({ message: `Especie con id ${id} no encontrada` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crea una nueva especie
  create: async (req, res) => {
    try {
      const especie = await Especie.create(req.body);
      res.status(201).json(especie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualiza una especie por id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Especie.update(req.body, { where: { id: id } });
      if (updated) {
        const updatedEspecie = await Especie.findByPk(id);
        res.status(200).json(updatedEspecie);
      } else {
        res.status(404).json({ message: `Especie con id ${id} no encontrada` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Elimina una especie por id
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Especie.destroy({ where: { id: id } });
      if (deleted) {
        res.status(204).json({ message: `Especie con id ${id} eliminada` });
      } else {
        res.status(404).json({ message: `Especie con id ${id} no encontrada` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
