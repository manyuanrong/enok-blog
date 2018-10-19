# EnokBlog Mac桌面仿真博客系统
[![Build Status](https://www.travis-ci.org/manyuanrong/enok-blog.svg?branch=master)](https://www.travis-ci.org/manyuanrong/enok-blog)

#### 项目介绍
EnokBlog 博客系统是一款仿真Mac电脑桌面的多窗口博客系统。
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

#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)