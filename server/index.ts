import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import fs from "fs";
import cors from 'cors';
import chatRouter from './routes/chat';
import session, { SessionOptions } from 'express-session';
import SessionStore from 'connect-pg-simple';
import { pool } from './db';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
const certificatesDir = path.join(uploadsDir, 'certificates');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

const app = express();

// Basic middleware
app.use(cors({
  origin: true, // This allows requests from any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const isDevelopment = process.env.NODE_ENV !== 'production';

// Use memory store in development, PostgreSQL in production
const sessionConfig: SessionOptions = {
  secret: process.env.SESSION_SECRET || "your-secret-key",
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: !isDevelopment,
    httpOnly: true,
    sameSite: isDevelopment ? 'lax' : 'none',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
    domain: process.env.COOKIE_DOMAIN || undefined
  },
  rolling: true // Reset maxAge on every response
};

// Only add PostgreSQL session store in production
if (!isDevelopment) {
  const pgSession = SessionStore(session);
  const sessionStore = new pgSession({
    pool,
    tableName: 'sessions',
    createTableIfMissing: true,
    pruneSessionInterval: 60 * 15 // Prune expired sessions every 15 minutes
  });

  sessionStore.on('error', (error) => {
    console.error('Session store error:', error);
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      console.log('Attempting to reconnect to session store...');
    }
  });

  sessionConfig.store = sessionStore;
}

app.use(session(sessionConfig));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Global error handler:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ response: message, error: true });
});

(async () => {
  try {
    const server = await registerRoutes(app);

    // API routes - Register BEFORE Vite middleware
    app.use('/api/chat', chatRouter);

    // Development setup with Vite
    if (isDevelopment) {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start server
    const port = process.env.PORT || 3000;
    server.listen({
      port,
      host: "0.0.0.0"
    }, () => {
      log(`Server running on port ${port} in ${isDevelopment ? 'development' : 'production'} mode`);
      if (isDevelopment) {
        log('Using in-memory session store');
      } else {
        log('Using PostgreSQL session store');
      }
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
})();
