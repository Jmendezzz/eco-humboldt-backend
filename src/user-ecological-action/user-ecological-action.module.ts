import { Module } from '@nestjs/common';
import { UserEcologicalActionController } from './controller/user-ecological-action.controller';
import { UserEcologicalActionService } from './service/user-ecological-action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEcologicalAction } from './entities/user-ecological-action.entity';
import { EcologicalActionQr } from 'src/ecological-action-qr/entities/ecological-action-qr.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcologicalActionQr, UserEcologicalAction]),
  ],
  controllers: [UserEcologicalActionController],
  providers: [UserEcologicalActionService]
})
export class UserEcologicalActionModule {}
