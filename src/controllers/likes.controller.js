// Archivo src\controllers\likes.controller.js
import { Likes } from '../models/Likes';
import { Usuario } from '../models/Usuario';
import { Especie } from '../models/Especie';

const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res, message, status = 500) => {
  res.status(status).json({ error: message });
};

const NOT_FOUND_MESSAGE = 'Like no encontrado.';
const ERROR_MESSAGES = {
  obtener: 'Ocurrió un error al obtener los likes.',
  crear: 'Ocurrió un error al crear el like.',
  eliminar: 'Ocurrió un error al eliminar el like.',
};

export const obtenerLikes = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
        },
        {
          model: Especie,
          as: 'especie',
        },
      ],
    });
    handleSuccess(res, likes);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};

export const getLikesByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const likes = await Likes.findAll({
      where: {
        id_usuario: id,
      },
      include: {
        model: Especie,
        as: 'especie',
      },
    });

    handleSuccess(res, likes);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};

export const getLikesByEspecie = async (req, res) => {
  try {
    const { id } = req.params;

    const likes = await Likes.findAll({
      where: {
        id_especie: id,
      },
      include: {
        model: Usuario,
        as: 'usuario',
      },
    });

    handleSuccess(res, likes);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};

export const crearLike = async (req, res) => {
  try {
    const { id_usuario, id_especie } = req.body;

    // Aquí puedes realizar la validación de los datos recibidos antes de crear el like

    const like = await Likes.create({
      id_usuario,
      id_especie,
    });

    handleSuccess(res, like, 201);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.crear);
  }
};

export const eliminarLike = async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Likes.findByPk(id);

    if (!like) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    await like.destroy();

    handleSuccess(res, { message: 'Like eliminado correctamente.' });
  } catch (error) {
    handleError(res, ERROR_MESSAGES.eliminar);
  }
};
