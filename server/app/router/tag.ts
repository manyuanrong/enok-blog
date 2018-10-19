import {Application} from 'egg';

export default (app: Application) => {
    const {controller} = app;
    const router = app.router.namespace('/tag');

    router.get('/list', controller.tag.list);
};
