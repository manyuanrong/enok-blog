import {Application} from 'egg';

export default (app: Application) => {
    const schema = app.model.define('article_tag', {
        article_id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        tag_id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
        },
    });
    schema.associate = () => {
        app.model.ArticleTag.belongsTo(app.model.Tag);
        app.model.ArticleTag.belongsTo(app.model.Article);
    };
    return schema;
};
