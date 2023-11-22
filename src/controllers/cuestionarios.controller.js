// Archivo src/controllers/cuestionarios.controller.js
import { Cuestionario } from '../models/Cuestionario';
import { Usuario } from '../models/Usuario';

const handleSuccess = (res, data, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res, message, status = 500) => {
  res.status(status).json({ error: message });
};

const NOT_FOUND_MESSAGE = 'Usuario no encontrado.';
const ERROR_MESSAGES = {
  crear: 'Ocurrió un error al crear el cuestionario.',
};

// Crear este nuevo controlador para crear un nuevo registro de cuestionario que ha respondido el usuario
export const crearCuestionario = async (req, res) => {
  try {
    const { score, percentage, numQuestions, usuario_id } = req.body;
    console.log(req.body);

    const usuario = await Usuario.findByPk(usuario_id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    const cuestionario = await Cuestionario.create({
      score,
      percentage,
      num_questions: numQuestions,
      usuario_id,
    });

    handleSuccess(res, cuestionario, 201);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.crear);
  }
};

// Crear este nuevo controlador para obtener todos los cuestionarios respondidos por el id de un usuario
export const obtenerCuestionariosPorUsuarioId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    const cuestionarios = await Cuestionario.findAll({
      where: { usuario_id: id },
    });

    if (!cuestionarios || cuestionarios.length === 0) {
      return res.status(404).json({ error: NOT_FOUND_MESSAGE });
    }

    handleSuccess(res, cuestionarios);
  } catch (error) {
    handleError(res, ERROR_MESSAGES.obtener);
  }
};
