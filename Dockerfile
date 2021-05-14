FROM node:16-alpine

COPY . /app

WORKDIR /app

CMD [ "node","init.js" ]