# pull official base image
FROM node:14.5.0 as build-deps
MAINTAINER Sobchenyuk A.V. <ablehands@ukr.net>

# set working directory
WORKDIR /app

ADD build ./build

## Install serve command for yarn package manager
#RUN yarn global add serve
# add `/app/node_modules/.bin` to $PATH
ENV CI=false
ENV PATH /app/node_modules/.bin:$PATH

#COPY package.json yarn.lock ./

# Run yarn install
#RUN yarn install

#RUN yarn build
RUN npm install -g serve

EXPOSE 8080
# Запуск сервера в директории build на порту 8080
CMD ["serve", "-s", "build", "-p", "8080"]
#CMD [ "node", "server.js" ]
