FROM node:latest

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . . 

ENV PORT 3050

EXPOSE ${PORT}

CMD ["npx", "nodemon", "server/app"]