import Sequelize from "sequelize";

export const sequelize = new Sequelize("extpeciesDB", "postgres", "a", {
  host: "localhost",
  dialect: "postgres",
});
