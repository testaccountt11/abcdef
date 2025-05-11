import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут API для проверки работы
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Обработка других маршрутов API
app.get('/api/*', (req, res) => {
  res.status(503).json({ 
    status: 'error', 
    message: 'API temporarily unavailable during maintenance' 
  });
});

// Все остальные маршруты отдают статический index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
