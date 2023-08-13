FROM node:18-alpine
WORKDIR /ng-weather-app
COPY package.json ./
RUN npm install pm2 -g
RUN npm install
COPY . .
CMD npm run doc:start:dev