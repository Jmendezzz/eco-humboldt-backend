import { HttpStatus } from '@nestjs/common';
import { BaseHttpException } from 'src/common/exceptions/base-http.exception';
import { ECOLOGICAL_ACTION_EXCEPTION } from '../constant/ecological-action.constant';

export class EcologicalActionNotFoundException extends BaseHttpException {
    constructor() {
        super(
            ECOLOGICAL_ACTION_EXCEPTION.NOT_FOUND.CODE,
            ECOLOGICAL_ACTION_EXCEPTION.NOT_FOUND.MESSAGE,
            HttpStatus.NOT_FOUND,
        );
    }
}
