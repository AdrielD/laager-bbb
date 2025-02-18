FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY server.js ./

RUN npm install

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm", "run", "serve"]
