FROM node:8

RUN env $DB_HOST

ENV DB_HOST $DB_HOST
ENV DB_PORT $DB_PORT
ENV DB_USER $DB_USER
ENV DB_PASS $DB_PASS
ENV REDIS_HOST $REDIS_HOST
ENV REDIS_PORT $REIDS_PORT
ENV REDIS_PASS $REIDS_PASS

RUN env

WORKDIR /app-root
COPY ./server /app-root
#COPY ./web/build/ /app-root/app/public/
RUN yarn
RUN yarn ci

CMD [ "yarn", "start" ]
