import { Module } from '@nestjs/common';
import { EcologicalActionQrService } from './service/ecological-action-qr.service';
import { EcologicalActionQrController } from './controller/ecological-action-qr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcologicalActionQr } from './entities/ecological-action-qr.entity';
import { EcologicalAction } from 'src/ecological-action/entities/ecological-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcologicalActionQr, EcologicalAction])],
  providers: [EcologicalActionQrService],
  controllers: [EcologicalActionQrController]
})
export class EcologicalActionQrModule { }
