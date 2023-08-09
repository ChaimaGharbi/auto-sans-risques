FROM node:16 AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/build ./build

CMD ["yarn", "serve"]
