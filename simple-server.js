const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Создаем директорию public, если её нет
const fs = require('fs');
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

// Базовый маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API маршрут для проверки
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API is working' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
