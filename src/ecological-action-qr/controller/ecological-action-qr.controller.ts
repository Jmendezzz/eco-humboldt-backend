import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EcologicalActionQrService } from '../service/ecological-action-qr.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ECOLOGICAL_ACTION_QR_API_ENTRY_POINT } from '../constant/ecological-action-qr.constant';
import { GenerateQrRequestDto } from '../dtos/generate-qr-request.dto';

@Controller(ECOLOGICAL_ACTION_QR_API_ENTRY_POINT.BASE)
export class EcologicalActionQrController {
    constructor(private readonly qrService: EcologicalActionQrService) { }

    @Post(ECOLOGICAL_ACTION_QR_API_ENTRY_POINT.GENERATE)
    @UseGuards(JwtAuthGuard)
    async generate(@Body() request: GenerateQrRequestDto) {
        return this.qrService.generateQr(request);
    }
}
