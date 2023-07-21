import jwt from "jsonwebtoken";

export const checkJWT = async (req, res, next) => {
  // リクエストヘッダの中を確認
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json([
      {
        message: "権限がありません",
      },
    ]);
  } else {
    try {
      const user = await jwt.verify(token, "SECRET_KEY");
      console.log(user);
      req.user = user.email;
      next();
    } catch (error) {
      return res.status(400).json([
        {
          message: "トークンが一致しません",
        },
      ]);
    }
  }
};
