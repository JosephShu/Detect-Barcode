FROM node:16.14.2

WORKDIR /front-end

ADD . .

RUN npm install