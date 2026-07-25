export interface tournament {
    tournamentID: number;
    gender: number;
    name: string;
    time: [Date, Date];
    hostID: number;
    city: [string, string][];
    center: string[];
    teamIDs: number[] // Will be a list of teamIDs in SQL
}