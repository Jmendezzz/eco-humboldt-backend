import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEcologicalAction } from '../entities/user-ecological-action.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { UserEcologicalActionResponseDto } from '../dto/user-ecological-action-response.dto';
import { EcologicalActionQr } from 'src/ecological-action-qr/entities/ecological-action-qr.entity';
import { EcologicalActionNotFoundException } from 'src/ecological-action/exceptions/ecological-action-not-found.exception';
import { RecentUserEcologicalActionInvalidException } from '../exceptions/recent-user-ecological-action-invalid.exception';
import { ValidateUserEcologicalActionRequestDto } from '../dto/validate-user-ecological-action-request.dto';
import { UserEcologicalActionTodayResponseDto } from '../dto/user-ecological-action-today-response.dto';

@Injectable()
export class UserEcologicalActionService {
    constructor (
        @InjectRepository(UserEcologicalAction)
        private readonly userEcologicalActionRepository: Repository<UserEcologicalAction>,
        @InjectRepository(EcologicalActionQr)
        private readonly ecologicalActionQrRepository: Repository<EcologicalActionQr>,
    ){}
    async validateAction(request: ValidateUserEcologicalActionRequestDto, userId: number): Promise<UserEcologicalActionResponseDto> {
        const { token: token } = request;
        const ecologicalActionQr = await this.ecologicalActionQrRepository.findOne({
             where: { token },
             relations: ['action'], 
            });
        if (!ecologicalActionQr) throw new EcologicalActionNotFoundException();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const recentRecord = await this.userEcologicalActionRepository.findOne({
            where: {
                user: { id: userId },
                action: { id: ecologicalActionQr.action.id },
                createdAt: MoreThanOrEqual(startOfToday),
            }
        });
        if (recentRecord) throw new RecentUserEcologicalActionInvalidException();
        const userEcologicalAction = this.userEcologicalActionRepository.create({
            user: { id: userId },
            action: ecologicalActionQr.action,
            earnedPoints: ecologicalActionQr.action.points,
            validationToken: token,
        });
        await this.userEcologicalActionRepository.save(userEcologicalAction);
        return this.toDto(userEcologicalAction);
    }

    async getByUserToday(userId: number): Promise<UserEcologicalActionTodayResponseDto> {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const records = await this.userEcologicalActionRepository.find({
            where: {
                user: { id: userId },
                createdAt: MoreThanOrEqual(startOfToday),
            },
            relations: ['action'],
        });
        const ecologicalActionIds = records.map(record => record.action.id);
        return { ecologicalActionIds };
    }

    private toDto(userEcologicalAction: UserEcologicalAction): UserEcologicalActionResponseDto {
        return {
            success: true,
            message: 'Action validated successfully',
            earnedPoints: userEcologicalAction.earnedPoints,
            action: {
                id: userEcologicalAction.action.id,
                name: userEcologicalAction.action.name,
                description: userEcologicalAction.action.description,
            },
            timestamp: new Date(),
        };
    }
}
