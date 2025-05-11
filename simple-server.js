import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Обслуживаем ваши собранные файлы из правильной директории
app.use(express.static(path.join(__dirname, 'dist/public')));

// API-маршруты
app.use(express.json());
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Для клиентского роутинга - всегда возвращаем index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
