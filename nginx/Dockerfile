FROM nginx:1.21.3


COPY ./dist /usr/share/nginx/html/dist

COPY ./assets /usr/share/nginx/html/assets

COPY ./styles /usr/share/nginx/html/styles

RUN rm /usr/share/nginx/html/index.html

RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/