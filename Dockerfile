FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY index.js ./
COPY server/ ./
COPY creds.json ./

RUN yarn

RUN npm install -g forever

EXPOSE 8081

CMD [ "forever", "start", "index.js" ]
