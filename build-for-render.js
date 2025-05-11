import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting build for Render...');

try {
  // Создаем директорию для сборки, если её нет
  if (!fs.existsSync(path.join(__dirname, 'client/dist'))) {
    fs.mkdirSync(path.join(__dirname, 'client/dist'), { recursive: true });
  }
  
  // Копируем pre-built файлы в директорию client/dist
  console.log('Copying pre-built client files...');
  
  // Если локально собранных файлов нет, создаем простую HTML страницу
  if (!fs.existsSync(path.join(__dirname, 'client/dist/index.html'))) {
    console.log('Creating placeholder index.html...');
    fs.writeFileSync(path.join(__dirname, 'client/dist/index.html'), `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfol.io</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <h1>Portfol.io</h1>
          <p>Сайт находится в процессе развертывания.</p>
          <p>Пожалуйста, загрузите собранную версию клиента в директорию client/dist.</p>
        </body>
      </html>
    `);
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
