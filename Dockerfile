FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache git

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD npm run start:prod
EXPOSE 3000