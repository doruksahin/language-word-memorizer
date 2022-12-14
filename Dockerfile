# pull official base image
FROM node:16-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
# add app
COPY . ./

RUN yarn global add env-cmd
RUN yarn install --pure-lockfile

EXPOSE 8080

# start app
CMD ["yarn", "serve", "--host"]