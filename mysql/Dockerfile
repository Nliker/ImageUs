FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD test_mysql

RUN rm /etc/my.cnf

ADD ./config /etc/mysql

ADD ./mysql-init-files /docker-entrypoint-initdb.d

CMD ["mysqld"]
