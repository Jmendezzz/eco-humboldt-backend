export interface LeaderBoardEntryDto {
    position: number;
    userId: number;
    firstName: string;
    lastName: string;
    totalPoints: number;
    actionsCompleted: number;
}

export interface LeaderBoardResponseDto {
    leaders: LeaderBoardEntryDto[];
}
