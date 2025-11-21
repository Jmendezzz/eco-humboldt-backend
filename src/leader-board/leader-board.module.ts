import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderBoardController } from './controller/leader-board.controller';
import { LeaderBoardService } from './service/leader-board.service';
import { UserEcologicalAction } from 'src/user-ecological-action/entities/user-ecological-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEcologicalAction])],
  controllers: [LeaderBoardController],
  providers: [LeaderBoardService],
})
export class LeaderBoardModule { }
