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
  const response = await pool.query("select * from users where id = $1", [id]);
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
