FROM node:11-alpine

# Create a work directory and copy over our dependency manifest files.
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY /course /usr/src/app/course
COPY /search /usr/src/app/search
COPY /server.js /usr/src/app/server.js
COPY /auth.js /usr/src/app/auth.js

RUN npm install
RUN npm install -g nodemon

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3001
CMD [ "npm", "run", "dev" ]