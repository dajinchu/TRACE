FROM node:8.11-alpine

# Create a work directory and copy over our dependency manifest files.
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY /src /usr/src/app/src


RUN yarn

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000
