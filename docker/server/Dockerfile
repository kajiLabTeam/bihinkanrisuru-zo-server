FROM node:22.14.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma generate

CMD ["yarn", "dev"]
