# EnokBlog Mac桌面仿真博客系统
[![Build Status](https://www.travis-ci.org/manyuanrong/enok-blog.svg?branch=master)](https://www.travis-ci.org/manyuanrong/enok-blog)

#### 项目介绍

EnokBlog 博客系统是一款仿真Mac电脑桌面的多窗口博客系统。

效果参考我的网站 https://www.manyuanrong.cn/

#### 技术选型

* 前后端均使用 TypeScript
* 服务端使用 Node.js + Egg.js 构建
* 前端使用 Webpack + React.js 构建
* 数据库使用 MySQL
* 缓存使用 Redis

#### 目录说明

```shell
├── Dockerfile // Docker镜像构建文件
├── LICENSE
├── README.md // 说明文件
├── server // 服务端目录(Egg.js项目结构)
│   ├── README.md
│   ├── app
│   ├── app.ts 服务端启动文件
│   ├── appveyor.yml
│   ├── config
│   ├── coverage
│   ├── node_modules
│   ├── package.json
│   ├── test
│   ├── tsconfig.json
│   ├── tslint.json
│   ├── typings
└── web // WEB端目录
    ├── README.md
    ├── build // WEB静态文件打包输出目录
    ├── config-overrides.js // Webpack配置
    ├── images.d.ts
    ├── node_modules
    ├── package.json
    ├── public
    ├── src // WEB端源代码目录
    ├── tsconfig.json
    ├── tsconfig.prod.json
    ├── tsconfig.test.json
    ├── tslint.json
    ├── typings
    └── yarn.lock
```

## 安装教程

#### Docker

```shell
docker run -d --name enok-blog \
	-e DB_HOST=数据库地址 \
    -e DB_USER=数据库用户名 \
    -e DB_PASS=数据库密码 \
    -e DB_NAME=数据库名 \
	-e OSS_BUCKET=OssBucket名 \
    -e OSS_ENDPOINT=OssEndpoint \
    -e OSS_SECRET=OssSecret \
    -e OSS_KEY=OssKey \
	-e REDIS_HOST=Redis服务器地址 \
    -e REDIS_PORT=Redis端口默认6379 \
    -e REDIS_PASS=Redis密码 \
	-e GITHUB_ID=GithubClientId \
    -e GITHUB_SECRET=GithubClientSecret \
	-e QQ_REDIRECT_URI=你的域名/api/user/login/qq \
    -e QQ_ID=QQ互联应用ID \
    -e QQ_SECRET=QQ互联应用Secret \
    -p 80:80 fengmu456/enok-blog
```

** -e ** 用于设置环境变量，具体环境变量参考如下

| 环境变量名 | 说明 |
| ---- | ---- |
| DB_HOST | 数据库地址 |
| DB_USER | 数据库用户名 |
| DB_PASS | 数据库密码 |
| DB_PORT | 数据库端口，默认3306 |
| DB_NAME | 数据库名 |
| OSS_BUCKET | Oss Bucket名 |
| OSS_ENDPOINT | Oss Endpoint |
| OSS_SECRET | Oss Secret |
| OSS_KEY | Oss Key |
| REDIS_HOST | Redis服务器地址 |
| REDIS_PORT | Redis端口默认6379 |
| REDIS_PASS | Redis密码 |
| GITHUB_ID | Github ClientId |
| GITHUB_SECRET | Github ClientSecret |
| QQ_REDIRECT_URI | QQ登录回调，格式为 http(s)://你的域名/api/user/login/qq |
| QQ_ID | QQ互联应用ID |
| QQ_SECRET | QQ互联应用Secret |

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
