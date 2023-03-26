import { Ubicacion } from "../models/Ubicacion";

// Obtener ubicaciones
export const getUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.findAll();
    console.log(ubicaciones);
    res.status(200).json(ubicaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear ubicaciones
export const createUbicacion = async (req, res) => {
  const { latitud, longitud, especie_id } = req.body;

  try {
    const newUbicacion = await Ubicacion.create({
      latitud,
      longitud,
      especie_id,
    });
    console.log(newUbicacion);
    res.status(201).json({ newUbicacion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener ubicacion por id
export const getUbicacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const ubicacion = await Ubicacion.findOne({
      where: {
        id: id,
      },
    });

    if (!ubicacion)
      return res.status(404).json({ message: "Ubicacion not found" });

    res.json(ubicacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar ubicacion por id
export const updateUbicacion = async (req, res) => {
  const id = req.params.id;
  const { latitud, longitud, especie_id } = req.body;

  try {
    const ubicacion = await Ubicacion.findByPk(id);

    ubicacion.latitud = latitud;
    ubicacion.longitud = longitud;

    await ubicacion.save();
    res.json(ubicacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar ubicacion por id
export const deleteUbicacion = async (req, res) => {
  const { id } = req.params;
  try {
    await Ubicacion.destroy({
      where: {
        id,
      },
    });
    res.json(`Ubicacion ${id} eliminado correctamemte`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
