FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

# Multi-stage
FROM node:18-slim AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start"]