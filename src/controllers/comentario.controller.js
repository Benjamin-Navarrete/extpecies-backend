// Archivo src\controllers\comentario.controller.js
import { Comentario } from '../models/Comentario';
import { Usuario } from '../models/Usuario';

export const crearComentario = async (req, res) => {
  try {
    const { contenido, especie_id, usuario_id } = req.body;
    // Obtener el comentario del objeto req
    let comentario = req.comentario;

    // Si el comentario no existe, crearlo
    if (!comentario) {
      comentario = await Comentario.create({
        contenido,
        usuario_id,
        especie_id,
      });
    } else {
      // Si el comentario existe, crear uno nuevo con el mismo contenido y usuario, pero con un id diferente
      comentario = await Comentario.create({
        contenido,
        usuario_id,
        especie_id,
      });
    }

    // Si hay un logro, agregarlo al comentario
    if (req.logro) {
      comentario.setDataValue('logro', req.logro);
      console.log(
        ' LOGRO OBTENIDO ------------------------------------------------------ ',
        req.logro,
      );
    }

    res.status(201).json(comentario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerComentarios = async (req, res) => {
  try {
    const { especie_id, page, limit } = req.query;
    const offset = (page - 1) * limit;
    // Usar el scope activos del modelo de Usuario en la consulta de los comentarios
    const comentarios = await Comentario.findAndCountAll({
      where: { especie_id },
      include: [
        {
          // Usar la propiedad model con el valor Usuario.scope('activos') para aplicar el scope al modelo incluido
          model: Usuario.scope('activos'),
          attributes: ['nombres', 'apellidos'],
        },
      ],
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
