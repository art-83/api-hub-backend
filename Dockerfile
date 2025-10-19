FROM node:20.11.1
RUN npm install pm2 -g
WORKDIR /code
COPY package.json .
COPY package-lock.json .

RUN npm install
COPY ./dist .

CMD ["pm2-runtime", "dist/shared/infra/http/server.js"]