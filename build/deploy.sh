#!/bin/bash
cd ~
rm -rf ~/secure-text-transfer-frontend
git clone git@github.com:sasuw/secure-text-transfer-frontend.git
cp -R ~/secure-text-transfer-frontend/dist/* /usr/local/nginx/sttme.net/
chown -R www-data /usr/local/nginx/sttme.net/
chgrp -R www-data /usr/local/nginx/sttme.net/