import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting custom build process...');

// Проверяем существование директорий
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Создаем простой серверный файл без зависимостей от rollup
  console.log('Creating server wrapper...');
  fs.copyFileSync(
    path.join(__dirname, 'server-wrapper.js'),
    path.join(__dirname, 'dist', 'index.js')
  );
  
  // Создаем простую статическую страницу
  console.log('Creating simple client static page...');
  const clientDistDir = path.join(__dirname, 'dist', 'public');
  if (!fs.existsSync(clientDistDir)) {
    fs.mkdirSync(clientDistDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(clientDistDir, 'index.html'), `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Application Running</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Server is running!</h1>
        <p>The application is currently in maintenance mode.</p>
        <p>Full functionality will be restored soon.</p>
      </body>
    </html>
  `);
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
