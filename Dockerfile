FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run swagger-autogen

EXPOSE 3000

CMD ["node", "app.js"]