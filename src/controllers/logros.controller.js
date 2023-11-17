// Archivo src\controllers\logros.controller.js
import { UsuarioLogro } from '../models/UsuarioLogro';
import { Logro } from '../models/Logro';

// Funcion para obtener todos los logros y saber cuáles ha desbloqueado el usuario por su id
export const getAllAchievementsWithUserStatus = async (req, res) => {
  const { id } = req.params;
  try {
    // Primera consulta: obtener todos los logros
    const allAchievements = await Logro.findAll();
    // Segunda consulta: obtener los logros del usuario
    const userAchievements = await UsuarioLogro.findAll({
      where: { id_usuario: id },
      include: { model: Logro, as: 'logros' },
    });
    // Crear un arreglo para guardar los ids de los logros del usuario
    const userAchievementsIds = [];
    // Recorrer el arreglo de userAchievements y guardar los ids en el arreglo
    for (let userAchievement of userAchievements) {
      userAchievementsIds.push(userAchievement.id_logro);
    }
    // Recorrer el arreglo de allAchievements y agregar el atributo unlocked
    for (let achievement of allAchievements) {
      // Si el id del logro está en el arreglo de userAchievementsIds, entonces el usuario lo ha desbloqueado
      if (userAchievementsIds.includes(achievement.id)) {
        achievement.unlocked = true;
      } else {
        // Si no, entonces el usuario no lo ha desbloqueado
        achievement.unlocked = false;
      }
    }
    // Enviar la respuesta con el arreglo de allAchievements modificado
    res.json({
      status: 200,
      message: 'Logros obtenidos correctamente',
      data: allAchievements,
    });
  } catch (error) {
    console.log('Error en getAllAchievementsWithUserStatus: ', error);
    res.json({
      status: 500,
      message: 'Error al obtener los logros',
      data: error,
    });
  }
};
