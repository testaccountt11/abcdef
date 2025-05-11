import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting custom build process...');

// Проверяем существование директорий
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Устанавливаем esbuild, если нужно
  console.log('Making sure esbuild is installed...');
  execSync('npm install esbuild --no-save', { stdio: 'inherit' });
  
  // Сборка серверной части
  console.log('Building server...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Создаем простую статическую страницу
  console.log('Creating simple client static page...');
  const clientDistDir = path.join(process.cwd(), 'dist', 'public');
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
        <p>The application is up and running.</p>
      </body>
    </html>
  `);
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
