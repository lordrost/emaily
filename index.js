const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ bye: "buddy" });
});

app.get("/suka2", (req, res) => {
  res.send({ you: "suka" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
