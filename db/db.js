// db.js
import pg from "pg";

const pool = new pg.Pool({
  user: "sugawarashunya",
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

    // データベースのテーブルの情報を取得するクエリ
    const query = "SELECT * FROM users";

    // クエリを実行
    client.query(query, (err, result) => {
      done(); // クエリの完了を示すために必ず done() を呼び出す

      if (err) {
        console.error("クエリエラー：", err);
      } else {
        console.log("テーブルの情報：", result.rows);
      }
    });
  }
});

export default pool;
