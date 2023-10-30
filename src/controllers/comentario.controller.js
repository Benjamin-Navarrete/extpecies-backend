// Archivo src\controllers\comentario.controller.js
import { Comentario } from '../models/Comentario';

export const crearComentario = async (req, res) => {
  try {
    const { contenido, especieId } = req.body;
    const usuarioId = req.usuario.id;
    const comentario = await Comentario.create({
      contenido,
      usuarioId,
      especieId,
    });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerComentarios = async (req, res) => {
  try {
    const { especieId, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const comentarios = await Comentario.findAndCountAll({
      where: { especieId },
      include: [{ model: Usuario, attributes: ['nombre', 'email'] }],
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
    const { contenido } = req.body;
    const usuarioId = req.usuario.id;
    const comentario = await Comentario.findOne({ where: { id, usuarioId } });
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
    const usuarioId = req.usuario.id;
    const comentario = await Comentario.findOne({ where: { id, usuarioId } });
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    await comentario.destroy();
    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
