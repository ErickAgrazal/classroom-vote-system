FROM node:10.15.3-jessie
LABEL MAINTAINER="Erick Agrazal erick@agrazal.com"
RUN mkdir /code/

ADD ./client/package.json /code/package.json
RUN npm install -g nodemon
RUN npm install --verbose

ADD ./client/ /code/
WORKDIR /code/

# create unprivileged user
RUN adduser --disabled-password --gecos '' deploy