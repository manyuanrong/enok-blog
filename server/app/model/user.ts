import {Application} from 'egg';

export default (app: Application) => {
    const schema = app.model.define('user', {
        id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: app.Sequelize.STRING,
        avatar: app.Sequelize.STRING,
        gender: app.Sequelize.STRING(2),
        password: app.Sequelize.STRING,
        nick_name: app.Sequelize.STRING,
        github_id: app.Sequelize.INTEGER.UNSIGNED,
        github_info: app.Sequelize.TEXT,
        qq_openid: app.Sequelize.STRING(100),
        qq_info: app.Sequelize.TEXT,
        is_writer: app.Sequelize.BOOLEAN, // 是否可以发表文章
    });
    return schema;
};
