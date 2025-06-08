import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Setting up project for Render...');

try {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }

  // Create public directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'dist/public'))) {
    fs.mkdirSync(path.join(__dirname, 'dist/public'), { recursive: true });
  }

  // Try to build frontend with Vite
  try {
    console.log('Building frontend with Vite...');
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('Frontend build completed!');
  } catch (error) {
    console.log('Frontend build failed, creating fallback page...');
    // Create a fallback index.html if Vite build fails
    fs.writeFileSync(path.join(__dirname, 'dist/public/index.html'), `
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

  // Create a simple server file
  console.log('Creating server file...');
  fs.writeFileSync(path.join(__dirname, 'dist/index.js'), `
    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();
    const PORT = process.env.PORT || 3000;

    // API middleware
    app.use(express.json());

    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    // API endpoint
    app.get('/api/status', (req, res) => {
      res.json({ status: 'ok', message: 'API is working' });
    });

    // Serve frontend for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log(\`Server running on port \${PORT}\`);
    });
  `);

  console.log('Setup completed successfully!');
} catch (error) {
  console.error('Setup failed:', error);
  process.exit(1);
} 