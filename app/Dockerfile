FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# TODO replace above command with these...
# Auth0 creds don't load properly when building for prod
# so leaving as dev for now

# RUN npm run build
# CMD [ "npm", "run", "start" ]
