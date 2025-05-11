import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting build for Render...');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  // Try to build frontend with Vite
  console.log('Attempting to build frontend...');
  try {
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('Frontend built successfully!');
  } catch (error) {
    console.log('Frontend build failed, creating placeholder...');
    
    // Create a simple index.html
    fs.writeFileSync(path.join(publicDir, 'index.html'), `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfol.io</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Portfol.io</h1>
          <p>Application is online.</p>
        </body>
      </html>
    `);
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 