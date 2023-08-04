# Stage 1: Build the project
FROM node:16 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Create the production image
FROM node:16 AS production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist

RUN yarn install --production --frozen-lockfile && yarn cache clean

EXPOSE 3000

CMD ["vite", "preview"]
