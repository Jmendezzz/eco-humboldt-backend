import { Injectable, NotFoundException } from '@nestjs/common';
import { GenerateQrRequestDto } from '../dtos/generate-qr-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcologicalActionQr } from '../entities/ecological-action-qr.entity';
import { EcologicalAction } from 'src/ecological-action/entities/ecological-action.entity';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from "uuid";
import * as QRCode from "qrcode";
import { GenerateQrResponseDto } from '../dtos/generate-qr-response.dto';

@Injectable()
export class EcologicalActionQrService {
    constructor(
        @InjectRepository(EcologicalActionQr)
        private readonly qrRepo: Repository<EcologicalActionQr>,

        @InjectRepository(EcologicalAction)
        private readonly actionRepo: Repository<EcologicalAction>,

        private readonly configService: ConfigService,
    ) { }

    async generateQr(request: GenerateQrRequestDto): Promise<GenerateQrResponseDto> {
        const { actionId } = request;

        const action = await this.actionRepo.findOne({ where: { id: actionId } });
        if (!action) {
            throw new NotFoundException(`Acción ecológica con id ${actionId} no encontrada`);
        }


        const token = uuid();
        const baseUrl = this.configService.getOrThrow<string>("FRONTEND_URL");
        const qrUrl = `${baseUrl}/qr/validate/${token}`;

        const qrImage = await QRCode.toDataURL(qrUrl, {
            errorCorrectionLevel: "H",
            width: 300,
            color: {
                dark: "#2faa5eff",
                light: "#FFFFFF",
            },
        });

        const qr = this.qrRepo.create({ token, action });
        const saved = await this.qrRepo.save(qr);

        return {
            token: saved.token,
            qrImage,
            actionId: action.id,
            createdAt: saved.createdAt,
        };
    }
}