import { IsString } from "class-validator";

export class ValidateUserEcologicalActionRequestDto {
    @IsString()
    token: string;
}