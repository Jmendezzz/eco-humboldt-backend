import { IsInt, Min } from "class-validator";

export class GenerateQrRequestDto {
    @IsInt()
    @Min(1)
    actionId: number;
}
