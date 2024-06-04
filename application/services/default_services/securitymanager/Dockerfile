FROM node:20.2-alpine
COPY . /securitymanager
WORKDIR /securitymanager
RUN npm i -g ts-node
RUN npm install
CMD npm run prod
