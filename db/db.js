// db.js
import pg from "pg";

const pool = new pg.Pool({
  user: "sugawara",
  host: "localhost",
  database: "users",
  password: "shunya916",
  port: 5432,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("接続エラー：", err);
  } else {
    console.log("接続しました！");
  }
});

export default pool;
