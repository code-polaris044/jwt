// auth.js

import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db.js"; // db.jsからpoolをimport

router.get("/", (req, res) => {
  res.send("hello router");
});

// ユーザー新規登録のAPI
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      const user = userResult.rows[0];
      if (user) {
        return res.status(400).json([
          {
            message: "すでにそのユーザーは存在しています。",
          },
        ]);
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      const insertResult = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );
      const newUser = insertResult.rows[0];

      const token = await jwt.sign(
        {
          email: newUser.email,
        },
        "SECRET_KEY",
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        token: token,
      });
    } catch (error) {
      console.error("Error while registering user:", error);
      return res.status(500).json([
        {
          message: "ユーザーの登録に失敗しました。",
        },
      ]);
    }
  }
);

// ... その他のルーターの定義

export default router;
