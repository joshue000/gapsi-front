# Stage 1: Build
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build -- --configuration=production

# Stage 2: Production
FROM nginx:alpine

COPY --from=build /app/dist/gapsi-front/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
