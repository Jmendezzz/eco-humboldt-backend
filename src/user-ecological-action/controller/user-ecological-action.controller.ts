import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { USER_ECOLOGICAL_ACTION_API_ENTRY_POINT } from '../constant/user-ecological-action.constant';
import { UserEcologicalActionService } from '../service/user-ecological-action.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEcologicalActionResponseDto } from '../dto/user-ecological-action-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ValidateUserEcologicalActionRequestDto } from '../dto/validate-user-ecological-action-request.dto';
import { UserEcologicalActionTodayResponseDto } from '../dto/user-ecological-action-today-response.dto';

@Controller(USER_ECOLOGICAL_ACTION_API_ENTRY_POINT.BASE)
export class UserEcologicalActionController {
    constructor (
        private readonly userEcologicalActionService: UserEcologicalActionService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(USER_ECOLOGICAL_ACTION_API_ENTRY_POINT.VALIDATE)
    async validateAction(@Body() request: ValidateUserEcologicalActionRequestDto, @CurrentUser("userId") userId: number): Promise<UserEcologicalActionResponseDto> {
        return this.userEcologicalActionService.validateAction(request, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(USER_ECOLOGICAL_ACTION_API_ENTRY_POINT.GET_BY_USER_TODAY)
    async getByUserToday(@CurrentUser("userId") userId: number): Promise<UserEcologicalActionTodayResponseDto> {
        return this.userEcologicalActionService.getByUserToday(userId);
    }
}
