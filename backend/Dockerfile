FROM node:18-alpine AS builder
WORKDIR /docker_project
COPY . ./
RUN npm install --only=production
RUN npm install pg
RUN npm install cors

###########################################

FROM node:18-alpine AS stage2
WORKDIR /docker_project
COPY --from=builder /docker_project/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
