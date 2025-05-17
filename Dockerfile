
# Stage 1: Build the Vite React app
FROM node:20.19.0-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

COPY  .env ./


# Install production dependencies
RUN npm install

# Copy source code
COPY . /usr/src/app/

# Build the app
RUN npm run build

# Stage 2: Serve the built app using nginx
FROM nginx:alpine-slim

LABEL maintainer="@aapurva"
LABEL description="Nginx server for serving static files"
LABEL version="1.0"


#ARG ARTIFACT_PATH
#ARG NGINX_CONF_DIR

#ENV ARTIFACT_PATH=${ARTIFACT_PATH}
#ENV NGINX_CONF_DIR=${NGINX_CONF_DIR}

WORKDIR /usr/src/app

#RUN apk add --update tcpdump

RUN rm -rf /etc/nginx/conf.d/*

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


RUN touch /var/run/nginx.pid

RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

COPY --from=builder /usr/src/app/dist/  /usr/share/nginx/html/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl -f http://localhost:3000/" ]

CMD ["nginx", "-g", "daemon off;"]