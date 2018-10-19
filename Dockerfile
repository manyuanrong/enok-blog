FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:3.11.0

WORKDIR /app-root
COPY ./server /app-root
COPY ./web/build/ /app-root/app/public/
RUN yarn
RUN yarn ci

CMD [ "yarn", "start" ]
