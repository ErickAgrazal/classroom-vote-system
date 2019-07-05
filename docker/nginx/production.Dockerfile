FROM nginx:latest
ADD ./docker/nginx/conf/certbot/production.conf /etc/nginx/conf.d/default.conf

RUN mkdir /staticfiles
RUN mkdir /logs
RUN touch /logs/web.access.log
RUN touch /logs/web.error.log