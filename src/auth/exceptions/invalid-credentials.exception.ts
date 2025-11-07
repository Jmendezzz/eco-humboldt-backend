import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/common/exceptions/base-http.exception';
import { AUTH_EXCEPTION } from '../constant/auth.constant';

export class InvalidCredentialsException extends BaseHttpException {
    constructor() {
        super(
            AUTH_EXCEPTION.INVALID_CREDENTIALS.CODE,
            AUTH_EXCEPTION.INVALID_CREDENTIALS.MESSAGE,
            HttpStatus.UNAUTHORIZED,
        );
    }
}
