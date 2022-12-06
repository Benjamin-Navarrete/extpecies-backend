const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "a",
  database: "extpeciesDB",
});

// Obtener usuarios
const getUsers = async (req, res) => {
  const response = await pool.query("select * from usuarios");
  console.log(response.rows);
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("select * from usuarios where id = $1", [
    id,
  ]);
  res.json(response.rows);
};

// Crear usuarios
const createUser = async (req, res) => {
  const response = await pool.query(
    "insert into usuarios (rol, nombres, apellidos, correo, telefono, password) values($1, $2, $3, $4, $5, $6)",
    [
      req.body.rol,
      req.body.nombres,
      req.body.apellidos,
      req.body.correo,
      req.body.telefono,
      req.body.password,
    ]
  );

  console.log(response);

  res.json({
    message: "Usuario agregado correctamemte",
    body: {
      usuario: req.body,
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { rol, nombres, apellidos, correo, telefono, password } = req.body;
  const response = await pool.query(
    "update usuarios set rol = $1, nombres = $2, apellidos = $3, correo = $4, telefono = $5, password = $6 where id = $7",
    [rol, nombres, apellidos, correo, telefono, password, id]
  );
  console.log(response);
  res.json("Usuario actualizado correctamente");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("delete from usuarios where id = $1", [id]);
  console.log(response);
  res.json(`Usuario ${id} eliminado correctamemte`);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
