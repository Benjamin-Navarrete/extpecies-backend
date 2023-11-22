// Archivo src\controllers\logros.controller.js
import { Usuario } from '../models/Usuario';
import { Logro } from '../models/Logro';

// Funcion para obtener todos los logros y saber cuáles ha desbloqueado el usuario por su id
export const getAllAchievementsByUserId = async (req, res) => {
  try {
    // Obtener el id del usuario de los parámetros de la solicitud
    const { id } = req.params;

    // Usar el modelo Usuario para encontrar al usuario por su id, incluyendo la asociación con el modelo Logro
    const usuario = await Usuario.findByPk(id, {
      include: { model: Logro, as: 'logros' },
    });

    // Usar el modelo Logro para obtener todos los logros existentes
    const logros = await Logro.findAll();

    // Comparar los logros del usuario con los logros existentes y crear un arreglo de objetos con el nombre, la descripción y el estado de cada logro (desbloqueado o no)
    const logrosUsuario = logros.map((logro) => {
      const desbloqueado = usuario.logros.some((l) => l.id === logro.id);
      return {
        nombre: logro.nombre,
        descripcion: logro.descripcion,
        desbloqueado,
        nombre_imagen: logro.nombre_imagen,
      };
    });

    // Enviar el arreglo como respuesta en formato JSON, con un código de estado 200 si todo salió bien
    res.status(200).json(logrosUsuario);
  } catch (error) {
    // Enviar un código de error y un mensaje si hubo algún problema
    res.status(500).json({ message: error.message });
  }
};
