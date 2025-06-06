import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const requiredEnvVars = ['GEMINI_API_KEY'];

// Check for required environment variables
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export interface Config {
  gemini: {
    apiKey: string;
  };
}

export const config: Config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY as string,
  },
}; 