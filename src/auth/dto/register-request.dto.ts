import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AUTH_CONSTRAINT } from '../constant/auth.constant';

export class RegisterRequestDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @MinLength(AUTH_CONSTRAINT.PASSWORD.MIN_LENGTH)
    password: string;
}
