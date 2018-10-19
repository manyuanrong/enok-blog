import {Controller} from 'egg';
import {ErrorResult, JsonResult} from '../common/ErrorResult';

export default class extends Controller {
    public async list() {
        const {ctx} = this;
        const Sequelize = this.app.Sequelize;
        const tags = (await this.ctx.model.ArticleTag.findAll({
            group: 'tag_id',
            attributes: ['tag_id', [this.app.Sequelize.fn('count', this.app.Sequelize.col('tag_id')), 'count']],
            include: [{
                model: this.ctx.model.Tag,
                required: true,
            }],
        })).map((record: any) => {
            const json = record.toJSON();
            return {...json.tag, count: json.count};
        });

        const articles = await ctx.model.Article.findAll({
            group: 'date',
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y年%m月'), 'date'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
            ],
        });
        ctx.body = new JsonResult({
            data: {
                tag: tags,
                date: articles,
            },
            success: true,
        });
    }

    async articles() {
        const {ctx} = this;
        const {offset = '0'} = ctx.request.query;
        const articles = await ctx.model.Article.findAndCount({
            limit: 10,
            offset: parseInt(offset),
            attributes: {
                exclude: ['content'],
            },
        });
        ctx.body = new JsonResult({
            success: true,
            data: {...articles, offset: parseInt(offset)},
        });
    }

    async tagArticles() {
        const {ctx} = this;
        const {tag_id} = ctx.request.query;
        const articles = await ctx.model.ArticleTag.findAndCountAll({
            where: {tag_id},
            include: [
                {model: ctx.model.Article, attributes: {exclude: ['content']}},
                ctx.model.Tag,
            ],
        });
        ctx.body = new JsonResult({
            success: true,
            data: articles,
        });
    }

    async dateArticles() {
        const {ctx} = this;
        const {date} = ctx.request.query;
        const Sequelize = this.app.Sequelize;
        const articles = await ctx.model.Article.findAndCount({
            where: Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y年%m月'), date),
            attributes: {
                exclude: ['content'],
            },
        });
        ctx.body = new JsonResult({
            success: true,
            data: articles,
        });
    }

    async detail() {
        const {ctx} = this;
        const {id} = ctx.request.query;
        const article = await ctx.model.Article.findById(id, {
            include: [{
                model: ctx.model.ArticleTag,
                include: [ctx.model.Tag],
            }],
        });
        ctx.body = new JsonResult({
            success: true,
            data: article,
        });
    }

    async add() {
        const {title, summary, tags, banner, content} = this.ctx.request.body;
        const user = this.ctx.session.user;
        const article: any = await this.ctx.model.Article.create({
            title,
            summary,
            banner,
            content,
            user_id: user.id,
        } as any);
        const articleTags = await this.ctx.model.ArticleTag.bulkCreate(tags.map((tag) => ({
            article_id: article.id,
            tag_id: tag,
        })));
        this.ctx.body = new JsonResult({
            success: true,
            msg: '保存成功',
            data: {...article.toJSON(), article_tags: articleTags},
        });
    }

    async delete() {
        const {id} = this.ctx.params;
        const user = this.ctx.session.user;
        const article: any = await this.ctx.model.Article.findById(id);
        if (!article) throw new ErrorResult('文章不存在');
        if (article.user_id !== user.id) throw new ErrorResult('没有删除权限');
        await this.ctx.model.Article.destroy({where: {id}});
        this.ctx.body = new JsonResult({msg: '删除成功', success: true});
    }

    async save() {
        const {title, summary, tags, banner, content, id} = this.ctx.request.body;
        const user = this.ctx.session.user;
        const article: any = await this.ctx.model.Article.findById(id);
        if (!article) throw new ErrorResult('文章不存在');
        if (article.user_id !== user.id) throw new ErrorResult('没有权限修改');
        await this.ctx.model.Article.update({
            title,
            summary,
            banner,
            content,
        }, {where: {id}});
        await this.ctx.model.ArticleTag.destroy({where: {article_id: id}});
        await this.ctx.model.ArticleTag.bulkCreate(tags.map((tag) => ({
            article_id: article.id,
            tag_id: tag,
        })));
        this.ctx.body = new JsonResult({
            success: true,
            data: null,
        });
    }
}
