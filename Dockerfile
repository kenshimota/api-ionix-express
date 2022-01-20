FROM node:17.1.0-alpine
RUN npm install -g nodemon

# work direction
WORKDIR /app
COPY ./package*.json ./

# access to work dir
RUN cd /app/

# install packages
RUN npm install

# command execute when init container
CMD ["npm", "run", "dev"]