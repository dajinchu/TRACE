FROM node:11-alpine

# Create a work directory and copy over our dependency manifest files.
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY /course /app/course
COPY /search /app/search
COPY /server.js /app/server.js
COPY /auth.js /app/auth.js

RUN yarn install --production

EXPOSE 3001
CMD [ "yarn", "run", "start" ]