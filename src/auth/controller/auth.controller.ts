import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { AuthService } from '../service/auth.service';
import { AUTH_API_ENTRY_POINT } from '../constant/auth.constant';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MeResponseDto } from '../dto/me-response.dto';


@Controller(AUTH_API_ENTRY_POINT.BASE)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AUTH_API_ENTRY_POINT.REGISTER)
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: RegisterRequestDto): Promise<RegisterResponseDto> {
        return this.authService.register(dto);
    }

    @Post(AUTH_API_ENTRY_POINT.LOGIN)
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(AUTH_API_ENTRY_POINT.ME)
    getProfile(@CurrentUser("userId") userId): Promise<MeResponseDto> {
        return this.authService.me(userId)
    }
}