# Скачиваем необходимый образ Node
FROM node:18-alpine AS build

# Рабочий каталог
WORKDIR /app

# Копируем файлы из package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы в рабочий каталог
COPY . .

# Осуществляем сборку для prodiction-версии
RUN npm run build

# build собран, теперь берем образ Nginx
FROM nginx:alpine

# Копируем содержимое на build в директорию сервера
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфиг в рабочий каталог конфига
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для доступа
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]