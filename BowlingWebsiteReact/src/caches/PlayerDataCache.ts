import type { resultsInterface } from "../Interfaces/resultsInterface";

export interface playerResultsCacheEntry {
    avg: number,
    gamesBowled: number,
    results: resultsInterface[]
}
// Example entry, <Joaquin Herrera, [158, 30, resultsInterface[]]>
export const resultsCache:Record<string, playerResultsCacheEntry> = {} ;

export const playerVideoURLCache:Record<string, string[]> = {} ;