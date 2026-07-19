export interface tournament {
    tournamentID: number;
    name: string;
    time: Date;
    host: string;
    city: string;
    center: string;
    teamIDs: number[] // Will be a list of teamIDs in SQL
    gTeams: [string, string] 
}