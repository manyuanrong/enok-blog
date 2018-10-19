import {Application} from 'egg';

export default (app: Application) => {
    const schema = app.model.define('tag', {
        id: {
            type: app.Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: app.Sequelize.STRING,
        icon: app.Sequelize.STRING,
    });
    return schema;
};
