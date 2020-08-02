FROM debian
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get update -y && apt-get -y upgrade
RUN apt-get install nodejs -y
RUN npm install telegraf --save
VOLUME /node/
COPY entrypoint.sh /
COPY bot.js /node/

ENTRYPOINT "./entrypoint.sh"