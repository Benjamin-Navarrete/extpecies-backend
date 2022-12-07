import { Especie } from "../models/Especie";

// Obtener especie por id
export const getEspecieById = async (req, res) => {
  try {
    const id = req.params.id;
    const especie = await Especie.findOne({
      where: {
        id: id,
      },
    });

    if (!especie) return res.status(404).json({ message: "Especie not found" });

    res.json(especie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener especies
export const getEspecies = async (req, res) => {
  try {
    const especies = await Especie.findAll();
    console.log(especies);
    res.status(200).json(especies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear especie
export const createEspecie = async (req, res) => {
  const {
    nombreComun,
    nombreCientifico,
    categoriaConservacion,
    rangoGeografico,
  } = req.body;

  try {
    const newEspecie = await Especie.create({
      nombre_comun: nombreComun,
      nombre_cientifico: nombreCientifico,
      categoria_conservacion: categoriaConservacion,
      rango_geografico: rangoGeografico,
    });
    console.log(newEspecie);
    res.status(201).json({ newEspecie });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar especie por id
export const updateEspecie = async (req, res) => {
  const id = req.params.id;
  const {
    nombreComun,
    nombreCientifico,
    categoriaConservacion,
    rangoGeografico,
  } = req.body;

  try {
    const especie = await Especie.findByPk(id);

    especie.nombre_comun = nombreComun;
    especie.nombre_cientifico = nombreCientifico;
    especie.categoria_conservacion = categoriaConservacion;
    especie.rango_geografico = rangoGeografico;

    await especie.save();
    res.json(especie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar especie por id
export const deleteEspecie = async (req, res) => {
  const { id } = req.params;
  try {
    await Especie.destroy({
      where: {
        id,
      },
    });
    res.json(`Especie ${id} eliminada correctamemte`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
