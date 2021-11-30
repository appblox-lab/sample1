#!/bin/bash


rm -rf src/store
cd src
git clone https://github.com/appblox-lab/accounts-store.git
mv accounts-store ./store
cd ..
if ! grep -q src/store .gitignore; then
  echo src/store >> .gitignore
fi
