import express from "express";
const app = express();

const PORT = 3100;

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(PORT, () => {
  console.log("サーバー起動中");
});
