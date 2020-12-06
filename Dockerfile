FROM node:14.15.1

WORKDIR /usr/src/app/backend

COPY backend/package.json backend/yarn.lock ./

RUN yarn

COPY ./backend .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
