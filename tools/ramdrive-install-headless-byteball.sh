#!/usr/bin/env bash

# only tested on ubuntu 16.4LTS with 32GB RAM
# don't forget to chmod a+x this file

sudo mkdir -p /media/ramdrive
mkdir -p ~/headless
sudo mount -t tmpfs -o size=31G tmpfs /media/ramdrive/
cd /media/ramdrive
mkdir /media/ramdrive/app_storage

rm -rf ./headless
git clone https://github.com/dragonbtm/headless.git
cd headless
yarn

rm -rf ~/.config/headless
ln -s /media/ramdrive/app_storage ~/.config/headless

echo "exports.LOG_FILENAME = '/dev/null';" >> conf.js

node start.js

function finish {
  rsync -rue --info=progress2 /media/ramdrive ~/headless
}

trap finish EXIT
