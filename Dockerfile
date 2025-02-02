FROM node:21-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

FROM node:21-alpine
WORKDIR /app
COPY --from=build ./app/package*.json .
COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/dist ./dist
COPY --from=build ./app/prisma ./prisma
EXPOSE 3000

CMD ["npm", "run", "start"]
