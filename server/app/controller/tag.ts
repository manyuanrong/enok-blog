import {Controller} from 'egg';
import {JsonResult} from '../common/ErrorResult';

export default class extends Controller {
    public async list() {
        const {ctx} = this;
        const tags = await this.ctx.model.Tag.findAll();
        ctx.body = new JsonResult({
            data: tags,
            success: true,
        });
    }
}
