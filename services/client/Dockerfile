FROM node:11.6-alpine as builder

WORKDIR /src/app

COPY "package.json" "yarn.lock" "/src/app/"
RUN yarn

COPY . /src/app/

RUN yarn build

FROM nginx:alpine

COPY --from=builder /src/app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
