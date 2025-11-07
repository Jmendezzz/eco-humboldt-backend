import { BaseHttpException } from "src/common/exceptions/base-http.exception";
import { USER_ECOLOGICAL_ACTION_EXCEPTION } from "../constant/user-ecological-action.constant";
import { HttpStatus } from "@nestjs/common";

export class RecentUserEcologicalActionInvalidException extends BaseHttpException{
    constructor() {
        super(
            USER_ECOLOGICAL_ACTION_EXCEPTION.RECENT_INVALID.CODE,
            USER_ECOLOGICAL_ACTION_EXCEPTION.RECENT_INVALID.MESSAGE,
            HttpStatus.BAD_REQUEST,
        );
    }
}