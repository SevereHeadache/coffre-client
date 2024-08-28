FROM node:22-alpine

ADD entrypoint.sh /etc/entrypoint.sh
RUN ["chmod", "+x", "/etc/entrypoint.sh"]

WORKDIR /var/www/html

ENTRYPOINT [ "/etc/entrypoint.sh" ]
