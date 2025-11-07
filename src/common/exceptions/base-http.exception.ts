import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseHttpException extends HttpException {
    readonly code: string;
    readonly details?: any;

    constructor(
        code: string,
        message: string,
        status: HttpStatus,
        details?: any,
    ) {
        super({ code, message, details }, status);
        this.code = code;
        this.details = details;
    }
}