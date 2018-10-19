FROM node:8

WORKDIR /app-root
COPY ./server /app-root
COPY ./web/build/ /app-root/app/public/

CMD [ "yarn", "start" ]
