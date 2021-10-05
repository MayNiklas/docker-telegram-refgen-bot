#!/bin/bash

# Set groups and permissions
groupadd bot -g ${GID:-1000}
useradd -u ${UID:-1000} -g ${GID:-1000} bot
chown -R bot:bot /node

sed -i "s/API-KEY/$key/g" /node/bot.js
sed -i "s/REF-ID/$id/g" /node/bot.js


su bot << EOF
/usr/bin/node /node/bot.js
EOF
