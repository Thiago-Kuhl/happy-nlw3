import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const secret = process.env.AUTH_TOKEN;
    const data = jwt.verify(token, secret);
    console.log(data)
    const { id } = data as TokenPayload;

    req.userID = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
