import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LEADER_BOARD_API_ENTRY_POINT } from '../constant/leader-board.constant';
import { LeaderBoardService } from '../service/leader-board.service';
import { LeaderBoardResponseDto } from '../dto/leader-board-response.dto';
import { LeaderBoardSummaryResponseDto } from '../dto/leader-board-summary-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller(LEADER_BOARD_API_ENTRY_POINT.BASE)
export class LeaderBoardController {
    constructor(
        private readonly leaderBoardService: LeaderBoardService,
    ) { }

    @Get(LEADER_BOARD_API_ENTRY_POINT.TOP)
    async getTop(@Query('limit') limit?: string): Promise<LeaderBoardResponseDto> {
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;
        return this.leaderBoardService.getTop(parsedLimit);
    }

    @UseGuards(JwtAuthGuard)
    @Get(LEADER_BOARD_API_ENTRY_POINT.MY_SUMMARY)
    async getMySummary(@CurrentUser('userId') userId: number): Promise<LeaderBoardSummaryResponseDto> {
        return this.leaderBoardService.getUserMonthlySummary(userId);
    }
}
