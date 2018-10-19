import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    config.keys = appInfo.name + '_1537772862603_2420';

    config.middleware = ['jsonerror'];

    config.sequelize = {
        dialect: 'mysql',
        database: process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        username: process.env.DB_USER!,
        password: process.env.DB_PASS!,
        timezone: '+08:00',
    };

    config.oss = {
        client: {
            accessKeyId: process.env.OSS_KEY!,
            accessKeySecret: process.env.OSS_SECRET!,
            bucket: process.env.OSS_BUCKET!,
            endpoint: process.env.OSS_ENDPOINT!,
            timeout: '60s',
        },
    };

    config.redis = {
        client: {
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
            host: process.env.REDIS_HOST!,
            password: process.env.REDIS_PASS!,
            db: 0,
        },
    };

    config.security = {
        csrf: false,
    };

    config.github = {
        client_id: process.env.GITHUB_ID!,
        client_secret: process.env.GITHUB_SECRET!,
        scope: 'user',
    };

    config.qq = {
        client_id: process.env.QQ_ID!,
        client_secret: process.env.QQ_SECRET!,
        redirect_uri: process.env.QQ_REDIRECT_URI!,
    };

    return config;
};
