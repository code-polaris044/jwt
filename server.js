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

//全てのユーザーを取得
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

//特定のユーザーを取得
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows);
  });
});

//ユーザー追加
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  // ユーザーがすでに存在しているかどうか確認
  pool.query(
    "SELECT s FROM users s WHERE s.email = $1",
    [email],
    (error, results) => {
      if (results.rows.length) {
        return res.send("すでにユーザーが存在しています");
      }

      pool.query(
        "INSERT INTO users(name, email, age) values($1, $2, $3)",
        [name, email, age],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("ユーザー作成成功しました");
        }
      );
    }
  );
});

//ユーザー削除
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    const isUser = results.rows.length;

    if (!isUser) {
      return res.send("ユーザーが存在しません");
    }

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
      if (error) throw error;
      return res.status(200).send("削除に成功しました。");
    });
  });
});

//ユーザー更新
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    const isUserExised = results.rows.length;
    if (!isUserExised) {
      return res.send("ユーザーが存在しません");
    }

    pool.query(
      "UPDATE users SET name = $1 WHERE id = $2",
      [name, id],
      (error, results) => {
        if (error) throw error;
        return res.status(200).send("更新に成功しました");
      }
    );
  });
});

app.listen(PORT, () => {
  console.log("サーバー起動中");
});
