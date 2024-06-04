FROM node:20.2-alpine
COPY . /proxymanager
WORKDIR /proxymanager
RUN npm i -g ts-node
RUN npm install
CMD npm run prod