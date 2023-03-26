import app from "./app";
import { sequelize } from "./database/database";

const port = 8080;

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`Server running on port ${port} `);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
