export interface UserEcologicalActionResponseDto {
    success: boolean;
    message: string;
    earnedPoints: number;
    action:{
        id: number;
        name: string;
        description: string;
    };
    timestamp: Date;
}
