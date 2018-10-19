import {EggPlugin} from 'egg';

const plugin: EggPlugin = {
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    oss: {
        enable: true,
        package: 'egg-oss',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    routerPlus: {
        enable: true,
        package: 'egg-router-plus',
    },
    sessionRedis: {
        enable: true,
        package: 'egg-session-redis',
    },
};

export default plugin;
