// db.js
import pkg from "pg";
const { Pool } = pkg; // ここでpgモジュールからPoolを取り出す

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "shunya916",
  port: 5432,
});

export default pool; // デフォルトエクスポートとしてpoolを提供する
