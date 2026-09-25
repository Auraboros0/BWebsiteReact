import { generateTeamData } from "./TeamData/generateTeamData.ts";
import { generateTourneyData } from "./PlayerData/generatePlayerData.ts";

generateTeamData(true);
generateTeamData(false);
generateTourneyData(true);
generateTourneyData(false);