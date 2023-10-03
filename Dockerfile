FROM node:20-bullseye

WORKDIR /app

RUN apt-get update && \
    apt-get install -y openssl  && \
    apt-get install -y ca-certificates  && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD npm run serve -- --host 0.0.0.0 --port 80
