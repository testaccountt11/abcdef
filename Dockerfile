FROM node:18-alpine AS base

# Установка зависимостей
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Сборка только с Vite и esbuild, без Next.js
RUN npm run build:custom

# Рабочий образ
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Копируем необходимые файлы
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/client/dist ./client/dist

# Запускаем приложение
CMD ["node", "dist/index.js"]
