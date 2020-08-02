ARG ARCH=
FROM ${ARCH}debian:buster-slim

RUN apt-get update && \
    apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt-get update -y && \
    apt-get install nodejs -y

RUN npm install telegraf --save

ENV	UID=1000 \
    GID=1000

VOLUME /node/
COPY entrypoint.sh /
COPY bot.js /node/

ENTRYPOINT "./entrypoint.sh"