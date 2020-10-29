FROM node:10.16.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts -g

CMD ["npm", "start"]