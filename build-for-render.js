import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Подготовка к деплою на Render...');

// Проверяем наличие директорий
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
}

console.log('Подготовка завершена успешно!');

try {
  // Компилируем React-приложение с помощью Vite
  console.log('Компиляция клиентского приложения...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Сборка успешно завершена!');
} catch (error) {
  console.error('Ошибка сборки:', error);
  process.exit(1);
}
