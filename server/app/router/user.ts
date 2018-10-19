import {Application} from 'egg';

export default (app: Application) => {
    const {controller} = app;
    const router = app.router.namespace('/user');

    router.post('/login', controller.user.login);
    router.get('/logout', controller.user.logout);
    router.get('/info', controller.user.info);
    router.get('/login/github', controller.user.githubLogin);
    router.get('/login/qq', controller.user.qqLogin);
};
