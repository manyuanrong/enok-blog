import {Controller} from 'egg';
import * as mime from 'mime';
import {JsonResult} from '../common/ErrorResult';

export default class extends Controller {
    public async upload() {
        const {ctx} = this;
        const stream = await ctx.getFileStream();
        const prefix = mime.getExtension(stream.mimeType);
        const path = `upload/${Date.now()}.${prefix}`;
        const url = await this.ctx.oss.put(path, stream);
        ctx.body = new JsonResult({
            success: true,
            data: 'https://data.manyuanrong.cn/' + url.name,
        });
    }
}
