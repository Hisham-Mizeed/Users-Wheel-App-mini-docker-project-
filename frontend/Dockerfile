FROM node:18-alpine AS builder
WORKDIR /docker_project
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#####################

FROM nginx:alpine AS stage2
WORKDIR /docker_project
COPY --from=builder /docker_project/build /usr/share/nginx/html
EXPOSE 80