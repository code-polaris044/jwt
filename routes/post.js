import express from "express";
const router = express.Router();
import { publicPosts, privatePosts } from "../db/Post.js";
import { checkJWT } from "../middleware/checkJWT.js";

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

router.get("/private", checkJWT, (req, res) => {
  res.json(privatePosts);
});

export default router;
