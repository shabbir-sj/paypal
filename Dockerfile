FROM nginx:1.14.1-alpine
VOLUME /var/cache/nginx
COPY dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
