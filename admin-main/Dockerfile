FROM node:16 AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

RUN yarn global add serve

CMD ["yarn", "serve"]
