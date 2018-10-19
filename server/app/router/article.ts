import {Application} from 'egg';
import {checkLogin} from '../common/UtilMiddlewares';

export default (app: Application) => {
    const {controller} = app;
    const router = app.router.namespace('/article');

    router.get('/list', controller.article.list);
    router.get('/detail', controller.article.detail);
    router.get('/all', controller.article.articles);
    router.get('/tag/list', controller.article.tagArticles);
    router.get('/date/list', controller.article.dateArticles);

    router.post('/add', checkLogin, controller.article.add);
    router.post('/save', checkLogin, controller.article.save);
    router.delete('/:id', checkLogin, controller.article.delete);
};
