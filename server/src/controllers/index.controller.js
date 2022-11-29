const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "a",
  database: "extpeciesDB",
});

const getUsers = async (req, res) => {
  const response = await pool.query("select * from usuarios");
  console.log(response.rows);
  res.status(200).json(response.rows);
};

module.exports = {
  getUsers,
};
