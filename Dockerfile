FROM node:18-alpine

WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Минимальная сборка только серверной части
RUN npm run build:minimal

# Запуск только серверной части
CMD ["node", "dist/index.js"]
