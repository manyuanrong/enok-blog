import {Application} from 'egg';

export default (app: Application) => {
    const schema = app.model.define('article', {
        id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: app.Sequelize.STRING,
        banner: app.Sequelize.STRING,
        summary: app.Sequelize.TEXT,
        content: app.Sequelize.TEXT,
    });
    schema.associate = () => {
        app.model.Article.belongsTo(app.model.User);
        app.model.Article.hasMany(app.model.ArticleTag);
    };
    return schema;
};
