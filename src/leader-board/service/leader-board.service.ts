import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEcologicalAction } from 'src/user-ecological-action/entities/user-ecological-action.entity';
import { LeaderBoardEntryDto, LeaderBoardResponseDto } from '../dto/leader-board-response.dto';
import { LeaderBoardSummaryResponseDto } from '../dto/leader-board-summary-response.dto';

@Injectable()
export class LeaderBoardService {
    constructor(
        @InjectRepository(UserEcologicalAction)
        private readonly userEcologicalActionRepository: Repository<UserEcologicalAction>,
    ) { }

    async getTop(limit = 10): Promise<LeaderBoardResponseDto> {
        const normalizedLimit = Number.isFinite(limit) ? limit : 10;
        const sanitizedLimit = Math.min(Math.max(normalizedLimit, 1), 50);
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const startOfNextMonth = new Date(startOfMonth);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const rawLeaders = await this.userEcologicalActionRepository
            .createQueryBuilder('userEcologicalAction')
            .leftJoin('userEcologicalAction.user', 'user')
            .select('user.id', 'userId')
            .addSelect('user.firstName', 'firstName')
            .addSelect('user.lastName', 'lastName')
            .addSelect('SUM(userEcologicalAction.earnedPoints)', 'totalPoints')
            .addSelect('COUNT(userEcologicalAction.id)', 'actionsCompleted')
            .where('userEcologicalAction.createdAt >= :startOfMonth', { startOfMonth })
            .andWhere('userEcologicalAction.createdAt < :startOfNextMonth', { startOfNextMonth })
            .groupBy('user.id')
            .addGroupBy('user.firstName')
            .addGroupBy('user.lastName')
            .orderBy('totalPoints', 'DESC')
            .addOrderBy('actionsCompleted', 'DESC')
            .limit(sanitizedLimit)
            .getRawMany();

        const leaders: LeaderBoardEntryDto[] = rawLeaders.map((leader, index) => ({
            position: index + 1,
            userId: Number(leader.userId),
            firstName: leader.firstName,
            lastName: leader.lastName,
            totalPoints: Number(leader.totalPoints),
            actionsCompleted: Number(leader.actionsCompleted),
        }));

        return { leaders };
    }

    async getUserMonthlySummary(userId: number): Promise<LeaderBoardSummaryResponseDto> {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const startOfNextMonth = new Date(startOfMonth);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);

        const rawSummary = await this.userEcologicalActionRepository
            .createQueryBuilder('userEcologicalAction')
            .select('COALESCE(SUM(userEcologicalAction.earnedPoints), 0)', 'totalPointsThisMonth')
            .addSelect('COUNT(userEcologicalAction.id)', 'actionsCompletedThisMonth')
            .where('userEcologicalAction.userId = :userId', { userId })
            .andWhere('userEcologicalAction.createdAt >= :startOfMonth', { startOfMonth })
            .andWhere('userEcologicalAction.createdAt < :startOfNextMonth', { startOfNextMonth })
            .getRawOne();

        return {
            totalPointsThisMonth: Number(rawSummary?.totalPointsThisMonth ?? 0),
            actionsCompletedThisMonth: Number(rawSummary?.actionsCompletedThisMonth ?? 0),
        };
    }
}
