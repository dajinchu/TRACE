FROM node:11-alpine

# Create a work directory and copy over our dependency manifest files.
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN yarn

COPY /course /usr/src/app/course
COPY /search /usr/src/app/search
COPY /server.js /usr/src/app/server.js
COPY /auth.js /usr/src/app/auth.js

EXPOSE 3001
CMD [ "yarn", "start" ]