import { Module } from '@nestjs/common';
import { EcologicalActionService } from './service/ecological-action.service';
import { EcologicalActionController } from './controller/ecological-action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcologicalAction } from './entities/ecological-action.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EcologicalAction]),
  ],
  controllers: [EcologicalActionController],
  providers: [EcologicalActionService],
})
export class EcologicalActionModule { }
