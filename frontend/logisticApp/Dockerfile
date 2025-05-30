FROM nginx:alpine

# Удаляем дефолтную конфигурацию
RUN rm -rf /etc/nginx/conf.d

# Копируем свою конфигурацию
COPY nginx.conf /etc/nginx/

# Копируем собранный фронтенд
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]