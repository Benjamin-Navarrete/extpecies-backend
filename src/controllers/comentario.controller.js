// Archivo src\controllers\comentario.controller.js
import { Comentario } from '../models/Comentario';
import { Usuario } from '../models/Usuario';

export const crearComentario = async (req, res) => {
  try {
    const { contenido, especie_id, usuario_id } = req.body;
    const comentario = await Comentario.create({
      contenido,
      usuario_id,
      especie_id,
    });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerComentarios = async (req, res) => {
  try {
    const { especie_id, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const comentarios = await Comentario.findAndCountAll({
      where: { especie_id },
      include: [{ model: Usuario, attributes: ['nombres', 'apellidos'] }],
      order: [['fecha', 'DESC']],
      offset,
      limit,
    });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const actualizarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido, usuario_id } = req.body;
    const comentario = await Comentario.findOne({ where: { id, usuario_id } });
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    comentario.contenido = contenido;
    await comentario.save();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.body.usuario_id;

    const comentario = await Comentario.findOne({ where: { id, usuario_id } });
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    await comentario.destroy();
    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
