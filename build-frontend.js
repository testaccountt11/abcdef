import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building frontend application...');

try {
  // Make sure the client's package.json dependencies are installed
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run the Vite build process
  console.log('Running Vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Frontend built successfully!');
} catch (error) {
  console.error('Frontend build failed:', error);
  process.exit(1);
} 