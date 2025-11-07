import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyInUseException } from '../exceptions/email-alredy-in-use.exception';
import { InvalidEmailDomainException } from '../exceptions/invalid-email-domain.exception';
import { AUTH_CONSTRAINT } from '../constant/auth.constant';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { MeResponseDto } from '../dto/me-response.dto';
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    public async register(request: RegisterRequestDto): Promise<RegisterResponseDto> {
        this.validateEmailDomain(request.email);

        const existing = await this.userRepository.findOne({
            where: { email: request.email },
        });
        if (existing) {
            throw new EmailAlreadyInUseException({ email: request.email });
        }

        const hashedPassword = await bcrypt.hash(request.password, 10);

        const user = this.userRepository.create({
            ...request,
            password: hashedPassword,
        });

        const saved = await this.userRepository.save(user);
        const { password, ...result } = saved;
        return result;
    }


    public async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = request;


        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken,
        };
    }

    public async me(userId: number): Promise<MeResponseDto> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new InvalidCredentialsException();
        }

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    }

    private validateEmailDomain(email: string): void {
        const domain = email.split('@')[1]?.toLowerCase();
        const isAllowed = AUTH_CONSTRAINT.ALLOWED_EMAIL_DOMAINS.includes(domain);

        if (!isAllowed) {
            throw new InvalidEmailDomainException(domain);
        }
    }
}