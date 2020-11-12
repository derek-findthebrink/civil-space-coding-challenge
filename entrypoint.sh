#!/bin/sh

set -e

rm -f /app/tmp/pids/server.pid

npm rebuild node-sass && bin/webpack && bin/rails db:setup && bin/rails s -p 3000 -b '0.0.0.0'
