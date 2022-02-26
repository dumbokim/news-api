FROM node:latest

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80


CMD ["npm", "run", "start:dev"]

# COPY --from=development /usr/app/dist ./dist

# CMD ["node", "dist/main"]
