export interface perGameInterface {
    Tournament: string;
    Opponent: string;
    Win: boolean | number;
    PlayerScores?: Record<string, number>
}