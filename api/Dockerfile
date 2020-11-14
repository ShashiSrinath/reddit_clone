FROM node:14.15.0-alpine3.10

# creating the api directory
RUN mkdir /home/node/app
RUN mkdir /home/node/app/api
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app/api

# change user to node
USER node

# copy package.json and yarn lock and install dependancies
COPY package.json yarn.lock ./

RUN yarn install

# generating prisma client
COPY --chown=node:node prisma ./
RUN DATABASE_URL=${DATABASE_URL} npx prisma migrate save --name  "" --experimental
RUN DATABASE_URL=${DATABASE_URL} npx prisma migrate up  --experimental
RUN DATABASE_URL=${DATABASE_URL} npx prisma generate

# copy rest of the files
COPY --chown=node:node ./ ./

# build project
RUN yarn run build

EXPOSE 4000

# start project
CMD ["yarn", "run", "start"]
