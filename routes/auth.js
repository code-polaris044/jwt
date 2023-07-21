import express from "express";
const router = express.Router();
import { User } from "../db/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const user = User.find((user) => user.email === email);
    if (user) {
      return res.status(400).json([
        {
          message: "すでにそのユーザーは存在しています。",
        },
      ]);
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    User.push({
      email,
      password: hashedPassword,
    });

    // Tokenを作成して送信
    const token = await jwt.sign(
      {
        email,
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token: token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json([
      {
        message: "そのユーザーは存在しません",
      },
    ]);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json([
      {
        message: "パスワードが異なります",
      },
    ]);
  }

  // Tokenを作成して送信
  const token = await jwt.sign(
    {
      email,
    },
    "SECRET_KEY",
    {
      expiresIn: "24h",
    }
  );

  return res.json({
    token: token,
  });
});

router.get("/allUsers", (req, res) => {
  return res.json(User);
});

export default router;
