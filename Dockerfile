FROM node:14.5-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY src ./src
RUN npm install
RUN npm run build