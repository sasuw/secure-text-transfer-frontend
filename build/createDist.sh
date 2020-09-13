#!/bin/bash

DIR="$(dirname "${BASH_SOURCE[0]}")"
DIR="$(realpath "${DIR}")"

cd $DIR
cd ../i18n-site

qutem index.html
qutem js/main.js
qutem js/overlay.js

rm -rf ../dist
mv dist ../
cp ../index.html ../dist/