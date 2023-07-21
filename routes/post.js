import express from "express";
const router = express.Router();
import { publicPosts, privatePosts } from "../db/Post.js";
import jwt from "jsonwebtoken";

export default router;
