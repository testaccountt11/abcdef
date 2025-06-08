export interface User {
  id: number;
  email: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
    }
  }
} 