FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV production

CMD [ "yarn","preview" ]

