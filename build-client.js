import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building frontend application...');

try {
  // Run Vite build
  console.log('Running Vite build...');
  execSync('npx vite build', {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Frontend build failed:', error);
  process.exit(1);
}
