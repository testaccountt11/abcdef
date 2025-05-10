#!/usr/bin/env node

// Этот скрипт запускается перед сборкой на Vercel
console.log('Подготовка окружения для сборки...');

const fs = require('fs');
const path = require('path');

// Проверяем наличие next.config.js
if (fs.existsSync('next.config.js')) {
  console.log('Найден next.config.js, преобразую в next.config.cjs...');
  
  // Читаем содержимое
  const configContent = fs.readFileSync('next.config.js', 'utf8');
  
  // Записываем как .cjs файл
  fs.writeFileSync('next.config.cjs', configContent, 'utf8');
  
  // Удаляем .js версию
  fs.unlinkSync('next.config.js');
  
  console.log('Преобразование завершено.');
}

// Проверяем package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('Проверка package.json...');
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Временно удаляем "type": "module" для сборки Next.js
  if (packageJson.type === 'module') {
    console.log('Временно удаляю "type": "module" для сборки Next.js...');
    
    // Сохраняем оригинальную версию
    fs.writeFileSync('package.json.bak', JSON.stringify(packageJson, null, 2), 'utf8');
    
    // Удаляем type: module
    delete packageJson.type;
    
    // Записываем изменённый package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    
    console.log('package.json обновлен для сборки.');
  }
}

console.log('Подготовка окружения завершена.');
