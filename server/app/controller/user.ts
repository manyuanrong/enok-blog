import {Controller} from 'egg';
import {ErrorResult, JsonResult} from '../common/ErrorResult';

export default class extends Controller {
    public async login() {
        const {ctx} = this;
        const {username, password} = ctx.request.body;
        const user = await this.ctx.model.User.find({
            where: {
                name: username,
                password,
            },
        });
        if (!user) {
            throw new ErrorResult('用户不存在或者密码错误');
        }
        this.ctx.session.user = user;
        ctx.body = new JsonResult({
            data: '登录成功',
            success: true,
        });
    }

    public async info() {
        this.ctx.body = new JsonResult({
            success: true,
            data: this.ctx.session.user,
        });
    }

    public async githubLogin() {
        const code = this.ctx.request.query.code;
        const {client_id, scope, client_secret} = this.config.github;
        if (!code) {
            const state = Date.now();
            const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&state=${state}`;
            this.ctx.redirect(url);
        } else {
            let url = `https://github.com/login/oauth/access_token`;
            const result = await this.ctx.curl(url, {
                method: 'POST',
                contentType: 'application/json',
                timeout: 10000,
                dataType: 'text',
                data: {
                    client_id,
                    client_secret,
                    code,
                },
            });
            const args = result.data.split('&');
            const arg: [] = args[0].split('=');
            const accessToken = arg[1];
            url = `https://api.github.com/user?access_token=${accessToken}`;
            const info = (await this.ctx.curl(url, {dataType: 'json'})).data;
            let user = await this.ctx.model.User.findOne({where: {github_id: info.id}});
            if (user) {
                await this.ctx.model.User.update({github_info: JSON.stringify(info)}, {where: {github_id: info.id}});
            } else {
                const data: any = {
                    name: info.login,
                    nick_name: info.name,
                    avatar: info.avatar_url,
                    github_id: info.id,
                    github_info: JSON.stringify(info),
                };
                user = await this.ctx.model.User.create(data);
            }
            this.ctx.session.user = user;
            this.ctx.body = `<script>window.close();</script>`;
        }
    }

    async qqLogin() {
        const {code} = this.ctx.request.query;
        const {client_id, redirect_uri, client_secret} = this.config.qq;
        if (!code) {
            const url = `https://graph.qq.com/oauth2.0/authorize?` +
                `response_type=code&client_id=${client_id}&redirect_uri=${encodeURI(redirect_uri)}&state=${Date.now()}`;
            this.ctx.redirect(url);
        } else {
            let url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}` +
                `&client_secret=${client_secret}&code=${code}&redirect_uri=${encodeURI(redirect_uri)}`;
            let result = await this.ctx.curl(url, {
                dataType: 'text',
                contentType: 'application/json',
            });
            const args = result.data.split('&');
            const arg: [] = args[0].split('=');
            const accessToken = arg[1];

            url = `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`;
            result = await this.ctx.curl(url, {dataType: 'text'});
            const openId = JSON.parse(result.data.substr(10, result.data.length - 13)).openid;

            url = `https://graph.qq.com/user/get_user_info` +
                `?access_token=${accessToken}&oauth_consumer_key=${client_id}&openid=${openId}`;
            const info = (await this.ctx.curl(url, {dataType: 'json'})).data;

            let user = await this.ctx.model.User.findOne({where: {qq_openid: openId}});
            if (user) {
                await this.ctx.model.User.update({qq_info: JSON.stringify(info)}, {where: {qq_openid: openId}});
            } else {
                const data: any = {
                    nick_name: info.nickname,
                    avatar: info.figureurl_qq_2 || info.figureurl_2,
                    qq_openid: openId,
                    gender: info.gender,
                    qq_info: JSON.stringify(info),
                };
                user = await this.ctx.model.User.create(data);
            }
            this.ctx.session.user = user;
            this.ctx.body = `<script>window.close();</script>`;
        }
    }

    async logout() {
        this.ctx.session.user = null;
        this.ctx.body = new JsonResult({
            data: '退出成功',
            success: true,
        });
    }
}
