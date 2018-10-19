import {Application} from 'egg';

export default (app: Application) => {
    const schema = app.model.define('comment', {
        id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: app.Sequelize.STRING,
        content: app.Sequelize.TEXT,
    });
    schema.associate = () => {
        app.model.Comment.belongsTo(app.model.Article);
        app.model.Comment.belongsTo(app.model.Comment);
        app.model.Comment.belongsTo(app.model.User);
    };
    return schema;
};
