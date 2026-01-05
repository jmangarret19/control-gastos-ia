FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Root install to handle workspaces if needed, or specific
RUN npm install

COPY apps/api ./apps/api
COPY tsconfig* ./

WORKDIR /app/apps/api

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
