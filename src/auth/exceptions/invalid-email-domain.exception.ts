import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/common/exceptions/base-http.exception';
import { AUTH_EXCEPTION } from '../constant/auth.constant';

export class InvalidEmailDomainException extends BaseHttpException {
    constructor(details?: any) {
        super(
            AUTH_EXCEPTION.INVALID_EMAIL_DOMAIN.CODE,
            AUTH_EXCEPTION.INVALID_EMAIL_DOMAIN.MESSAGE,
            HttpStatus.CONFLICT,
            details,
        );
    }
}
