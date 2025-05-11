import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Обслуживаем статические файлы из dist/public
app.use(express.static(path.join(__dirname, 'dist/public')));

// API маршруты
app.use(express.json());

// Создаем директорию public, если её нет
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
  fs.writeFileSync('public/index.html', `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Service Running</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Сервер работает!</h1>
        <p>Минимальная версия приложения запущена успешно.</p>
      </body>
    </html>
  `);
}

// Базовый API для проверки
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API is working' });
});

// Для клиентских маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
