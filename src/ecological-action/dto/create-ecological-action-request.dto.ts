import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateEcologicalActionRequestDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    points: number;
}
