import { Request, Response, NextFunction } from "express";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

export const isMentor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && (req.user?.role === 'mentor' || req.user?.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}; 