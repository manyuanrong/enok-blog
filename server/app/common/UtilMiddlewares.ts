import {ErrorResult} from './ErrorResult';

export async function checkLogin(ctx, next) {
    if (!ctx.session.user) {
        throw new ErrorResult('用户未登录', 101);
    }
    await next();
}
