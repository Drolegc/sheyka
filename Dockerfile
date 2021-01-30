
FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . /usr/src/app

RUN npm install

#RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0