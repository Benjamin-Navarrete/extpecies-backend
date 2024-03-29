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

// Función para obtener el like que el usuario ha dado a una especie por sus ids
export const getLikeByUserAndEspecie = async (req, res) => {
  try {
    // Obtener los ids del usuario y la especie de los parámetros de la ruta
    const { id_usuario, id_especie } = req.params;

    // Buscar el like que coincida con los ids recibidos
    const like = await Likes.findOne({
      where: {
        id_usuario,
        id_especie,
      },
    });

    // Si no se encuentra el like, devolver un mensaje de error con código 404
    if (!like) {
      handleError(res, NOT_FOUND_MESSAGE, 404);
      return;
    }

    // Si se encuentra el like, devolverlo con código 200
    handleSuccess(res, like);
  } catch (error) {
    console.log(error);
    // Si ocurre algún error en la búsqueda, devolver un mensaje de error con código 500
    handleError(res, ERROR_MESSAGES.obtener);
  }
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
      },
    });

    handleSuccess(res, likes);
  } catch (error) {
    console.log(error);
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

export const getLikesCountByEspecie = async (req, res) => {
  try {
    const { id } = req.params;

    const likesCount = await Likes.count({
      where: {
        id_especie: id,
      },
    });

    handleSuccess(res, likesCount);
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

    if (req.logro) {
      like.setDataValue('logro', req.logro);
      console.log(
        ' LOGRO OBTENIDO ------------------------------------------------------ ',
        req.logro,
      );
    }

    handleSuccess(res, like, 201);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.crear);
  }
};

export const eliminarLike = async (req, res) => {
  try {
    const { id_usuario, id_especie } = req.body;

    const like = await Likes.findOne({
      where: {
        id_usuario,
        id_especie,
      },
    });

    if (!like) {
      handleError(res, NOT_FOUND_MESSAGE, 404);
      return;
    }

    await like.destroy();

    handleSuccess(res, like);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.eliminar);
  }
};
