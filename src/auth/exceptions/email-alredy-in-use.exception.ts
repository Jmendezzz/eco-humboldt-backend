import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/common/exceptions/base-http.exception';
import { AUTH_EXCEPTION } from '../constant/auth.constant';

export class EmailAlreadyInUseException extends BaseHttpException {
    constructor(details?: any) {
        super(
            AUTH_EXCEPTION.EMAIL_ALREADY_IN_USE.CODE,
            AUTH_EXCEPTION.EMAIL_ALREADY_IN_USE.MESSAGE,
            HttpStatus.CONFLICT,
            details,
        );
    }
}
