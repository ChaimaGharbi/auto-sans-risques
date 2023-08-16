# Use an official Node.js runtime as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy app source code
COPY . .

# Build the app
RUN yarn build

# Use a lightweight Nginx image to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx document root
COPY --from=build /app/dist /usr/share/nginx/html

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]