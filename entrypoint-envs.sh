#!/bin/sh

set -eu

cd /usr/share/nginx/

if [ -f created ]; then
  echo "skip JS envsubst"
  exit;
fi

VARIABLES=$(printenv | grep -o '^VITE_[^=]\+' | sed 's/^/$/' | tr '\n' ':')

cp -a orig/* html

cd html

find ./ -type f \( \
  -name '*.js' \
  -o -name '*.js.map' \
  -o -name '*.json' \
  -o -name '*.html' \
  -o -name '*.css' \
  \) \
  -exec sh -c "envsubst '${VARIABLES%?}' < '../orig/{}' > '{}'" \;

cd -
touch created