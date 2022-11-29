const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

let transactionArr = [];

//routes
app.use(require("./routes/index"));

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    type: "*/*",
  })
);

app.use(cors());

// Post en localhost:3000/pruebaget
app.get("/pruebaget", (req, res) => {
  res.send("hola funciona get");
});

// Post en localhost:3000/pruebapost
app.post("/pruebapost", (req, res) => {
  let transaction = req.body;
  transactionArr.push(transaction);
  console.log(req.body);
  // res.send("hola funciona post");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
