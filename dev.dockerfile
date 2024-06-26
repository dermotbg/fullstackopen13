FROM node

WORKDIR /usr/src/app

COPY . . 

RUN npm install

CMD ["node", "index.js"]