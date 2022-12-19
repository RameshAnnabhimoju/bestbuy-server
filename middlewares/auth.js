import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      jwt.verify(
        authorization,
        process.env.ACCESS_TOKEN_SECRET,
        (error, client) => {
          if (error) res.status(403);
          req.client = client;
          next();
        }
      );
    } else {
      return res.status(401).json({ msg: "Not authorized to access this api" });
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }
}
