import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/index.js";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as User;
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}; 