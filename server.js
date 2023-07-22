import express from "express";
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import pool from "./db/db.js";
const app = express();
const PORT = 3010;

app.use(express.json());

app.use(express.json());
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.get("/auth", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

app.listen(PORT, () => {
  console.log("サーバー起動中");
});
