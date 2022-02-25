FROM node:latest

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM node:latest

# WORKDIR /app

# COPY package.json yarn.lock ./

# RUN yarn install --only=production

# COPY --from=build /app/dist  ./dist

EXPOSE 80

USER node

CMD ["npm", "run", "start:dev"]
