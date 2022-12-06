const express = require("express");

const app = express();
const port = 8080;

let transactionArr = [];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require("./routes/index"));

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
