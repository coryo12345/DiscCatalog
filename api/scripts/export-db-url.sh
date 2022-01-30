#!/bin/sh

# THIS MUST BE RUN WITH SOURCE
# source ./export-db-url.sh

if [ -f ../../.env ] 
then
  export $(echo $(cat ../../.env | sed 's/#.*//g' | sed 's/\r//g' | xargs) | envsubst)
fi

DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:5432/${POSTGRES_DB}?schema=disc"
export DATABASE_URL
