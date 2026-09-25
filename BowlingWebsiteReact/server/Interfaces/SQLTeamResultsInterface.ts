import type { teamResultsInterface } from "./teamResultsInterface.ts";

export interface SQLTeamResultsInterface extends teamResultsInterface{
    male: boolean;
    season: string;
}