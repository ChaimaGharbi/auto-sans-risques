FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
