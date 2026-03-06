FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

ARG BUILD_MODE=production
RUN npm run build -- --mode ${BUILD_MODE}
#Production Stage
FROM nginx:alpine AS production-stage

COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
