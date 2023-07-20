import express from "express";
const router = express.Router();
import { User } from "../db/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

router.get("/", (req, res) => {
  res.send("hell router");
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
          massage: "すでにそのユーザーは存在しています。",
        },
      ]);
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    User.push({
      email,
      password: hashedPassword,
    });
  }
);

export default router;
