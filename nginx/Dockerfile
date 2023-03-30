FROM nginx:1.21.3


COPY ./dist /usr/share/nginx/html/dist

COPY ./images /usr/share/nginx/html/assets

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html/index.html

RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/