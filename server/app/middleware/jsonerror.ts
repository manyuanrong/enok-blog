import {Context} from 'egg';
import {ErrorResult, JsonResult} from '../common/ErrorResult';

export default () => {
    return async (ctx: Context, next: any) => {
        try {
            await next();
        } catch (e) {
            if (e instanceof ErrorResult) {
                ctx.body = new JsonResult({
                    data: null,
                    success: false,
                    code: e.code,
                    msg: e.message,
                });
            } else {
                ctx.logger.error(e);
                if (ctx.app.config.env === 'prod') {
                    ctx.body = {
                        message: e.message,
                        data: e,
                        success: false,
                    };
                } else {
                    throw e;
                }
            }
            ctx.status = 200;
        }
    };
};
