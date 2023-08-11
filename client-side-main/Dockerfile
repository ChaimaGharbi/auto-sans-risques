FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY . .

ENV NODE_ENV production

RUN yarn global add vite

EXPOSE 3000

CMD [ "yarn", "dev" ]

