import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Подготовка к деплою на Render...');

// Создаем директории для файлов
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(distDir, 'public');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Создаем package.json для директории dist
fs.writeFileSync(path.join(distDir, 'package.json'), `{
  "name": "portfol-io-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2"
  }
}`);

// Устанавливаем зависимости
console.log('Установка зависимостей...');
execSync('npm install', { cwd: distDir, stdio: 'inherit' });

// Создаем HTML страницу
const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfol.io</title>
  <style>
    :root {
      --primary: #0070f3;
      --secondary: #6c757d;
      --background: #f8f9fa;
      --text: #212529;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text);
    }
    
    header {
      background: linear-gradient(135deg, var(--primary) 0%, #0098ff 100%);
      color: white;
      padding: 2rem 0;
      text-align: center;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.2rem;
      color: var(--secondary);
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .feature-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
    
    .feature-card h3 {
      color: var(--primary);
      margin-top: 0;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 0.5rem;
    }
    
    .cta {
      text-align: center;
      background: white;
      padding: 3rem 0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .button {
      display: inline-block;
      background-color: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .button:hover {
      background-color: #0051cc;
    }
    
    footer {
      background: #333;
      color: white;
      padding: 2rem 0;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Portfol.io</h1>
      <p>Управляйте своими инвестициями с умом</p>
    </div>
  </header>
  
  <div class="container">
    <section class="hero">
      <h1>Ваш портфель. Наша аналитика.</h1>
      <p>Современное решение для управления инвестиционным портфелем</p>
    </section>
    
    <section class="features">
      <div class="feature-card">
        <h3>Мониторинг портфеля</h3>
        <p>Отслеживайте все ваши инвестиции в одном месте с обновлениями в реальном времени.</p>
      </div>
      
      <div class="feature-card">
        <h3>Продвинутая аналитика</h3>
        <p>Получайте детальную информацию о производительности вашего портфеля с помощью современных инструментов визуализации.</p>
      </div>
      
      <div class="feature-card">
        <h3>Рекомендации по инвестициям</h3>
        <p>Персонализированные инвестиционные рекомендации на основе ваших целей и допустимого уровня риска.</p>
      </div>
    </section>
    
    <section class="cta">
      <h2>Начните управлять своими инвестициями уже сегодня</h2>
      <p>Присоединяйтесь к тысячам инвесторов, которые уже оптимизировали свои портфели</p>
      <a href="#" class="button">Создать аккаунт</a>
    </section>
  </div>
  
  <footer>
    <div class="container">
      <p>&copy; 2024 Portfol.io - Все права защищены</p>
    </div>
  </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);

// Создаем серверный файл для запуска
fs.writeFileSync(path.join(distDir, 'server.js'), `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

// Все остальные маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(\`Сервер запущен на порту \${PORT}\`);
});
`);

console.log('Подготовка завершена успешно!');
