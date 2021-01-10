FROM node:14.15.1-alpine

RUN mkdir -p /home/app/code && mkdir -p /home/app/shared && chown -R node:node /home/app

WORKDIR /home/app/code

COPY backend/package.json .

COPY backend/yarn.lock .

RUN yarn install

COPY shared ../shared

USER node

COPY --chown=node:node backend .

RUN chmod 755 ./entrypoint.sh


EXPOSE 4000
ENTRYPOINT ["sh", "./entrypoint.sh"]