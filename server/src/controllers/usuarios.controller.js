import { Usuario } from "../models/Usuario";

// Obtener usuario por id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findOne({
      where: {
        id: id,
      },
    });

    if (!usuario) return res.status(404).json({ message: "Usuario not found" });

    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener usuarios
export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    console.log(usuarios);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear usuarios
export const createUser = async (req, res) => {
  const { rol, nombres, apellidos, correo, telefono, password } = req.body;

  try {
    const newUsuario = await Usuario.create({
      rol,
      nombres,
      apellidos,
      correo,
      telefono,
      password,
    });
    console.log(newUsuario);
    res.status(201).json({ newUsuario });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario por id
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { rol, nombres, apellidos, correo, telefono, password } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    usuario.rol = rol;
    usuario.nombres = nombres;
    usuario.apellidos = apellidos;
    usuario.correo = correo;
    usuario.telefono = telefono;
    usuario.password = password;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar usuario por id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.destroy({
      where: {
        id,
      },
    });
    res.json(`Usuario ${id} eliminado correctamemte`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
