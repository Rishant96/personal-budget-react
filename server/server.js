// Budget API

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3200;

app.use(cors());

app.get("/budget", (req, res) => {
  const budget = require("./budget.json");
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
