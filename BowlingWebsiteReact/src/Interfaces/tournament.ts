import type { address } from "./address";
export interface tournament {
    tournamentID: number;
    gender: number; // 0 = mens, 1 = womens, 2 = both
    name: string;
    time: [Date, Date];
    hostSlug: string;
    city: address[];
    center: string[];
    teamIDs: number[] // Will be a list of teamIDs in SQL
}