FROM node:6.9.5

RUN git clone https://TG_SANDIP@bitbucket.org/TG_SANDIP/project_ses.git /var/www \
    && cd /var/www \
    && npm install --global rimraf \
    && npm run clean \
    && npm install --global webpack webpack-dev-server typescript@2.1.5 \
    && npm install \
    && npm run build:prod:aot

EXPOSE 4200

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "start:prod"]
