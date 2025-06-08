import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Создаем директорию для файлов сайта, если её нет
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  
  // Создаем временную HTML страницу
  fs.writeFileSync(path.join(publicDir, 'index.html'), `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfol.io</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 { color: #0070f3; }
        .container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 20px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <h1>Portfol.io</h1>
      <div class="container">
        <h2>Ваш сайт скоро будет готов!</h2>
        <p>Мы работаем над его настройкой.</p>
      </div>
    </body>
    </html>
  `);
}

// Middleware
app.use(express.json());

// Статические файлы
app.use(express.static(publicDir));

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

// Все остальные маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
