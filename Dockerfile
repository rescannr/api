FROM node:lts-alpine

ARG EXPRESS_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run swagger-autogen

EXPOSE ${EXPRESS_PORT}

CMD ["node", "app.js"]