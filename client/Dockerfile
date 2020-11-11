FROM node:14.15.0-alpine3.10

# creating the client directory
RUN mkdir /home/node/app
RUN mkdir /home/node/app/client
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app/client

# change user to node
USER node

# copy package.json and yarn lock and install dependancies
COPY package.json yarn.lock ./

RUN yarn install

# copy rest of the files
COPY --chown=node:node ./ ./


# build project
RUN yarn run build

EXPOSE 3000


# start project
CMD ["yarn", "run", "start"]
