#!/bin/bash

set -eu

for VARIABLE in ${VARIABLES//,/ }; do
  export VITE_$VARIABLE="\$VITE_$VARIABLE"
done

exec "$@"