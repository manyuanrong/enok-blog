export class ErrorResult extends Error {
    code: number = 100;

    constructor(msg: string, code: number = 100) {
        super(msg);
        this.code = code;
    }
}

interface JsonResultAdapter {
    data?: any;
    success: boolean;
    msg?: string;
    code?: number;
}

export class JsonResult {
    data?: any = true;
    success?: boolean = true;
    msg?: string = 'success';
    code?: number = 200;

    constructor(param: JsonResultAdapter) {
        this.data = param.data;
        this.code = param.code;
        this.msg = param.msg;
        this.success = param.success;
    }
}