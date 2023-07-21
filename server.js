import express from "express";
import auth from "./routes/auth.js";
import post from "./routes/post.js";
const app = express();
const PORT = 3010;

app.use(express.json());
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(PORT, () => {
  console.log("サーバー起動中");
});
