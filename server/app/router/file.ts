import {Application} from 'egg';

export default (app: Application) => {
    const {controller} = app;
    const router = app.router.namespace('/file');

    router.post('/upload', controller.file.upload);
};
