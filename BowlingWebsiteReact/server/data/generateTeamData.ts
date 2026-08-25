/* 
Unlike generatePlayerData.ts, this collection of functions targets overall team results pdfs rather than
the standings of individual players.
*/

import type { teamResultsInterface } from "../Interfaces/teamResultsInterface.ts";
import { execFile } from "node:child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
import fs from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import { dir } from "node:console";
import { data } from "react-router-dom";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const pythonScript = path.resolve(dirname, "./teamResultsParser.py");

const mFolder = path.resolve(dirname, "./Mens_Results_Team");
const wFolder = path.resolve(dirname, "./Womens_Results_team");

let mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(mFolder, file));

let womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(wFolder, file));

export async function parseCommand(tournamentPath: string | undefined) {
    // return `python resultsParser.py ${tournamentPath}`
    if (typeof tournamentPath === 'undefined') { return }
    const { stdout, stderr } = await execFileAsync(
        "python",
        [pythonScript, `${tournamentPath}`]
    );

    if (stderr) {
        // console.error(stderr);
    }

    // console.log(stdout)
    const result = JSON.parse(stdout) as teamResultsInterface[];
    return result
    console.log("YEAHH")
}

/* Creates the mens/womensTeamResults object and the accompanying tournamentSet */
export async function generateTeamData(male: boolean) {
    let objectName;
    let folder: string[];
    if (male) { objectName = "mensTeamResultsObject"; folder = mensCSVs; }
    else { objectName = "womensTeamResultsObject"; folder = womensCSVs; }
    const objectPath: string = path.resolve(dirname, `./${objectName}.ts`)
    const teamDataSorted: Record<string, teamResultsInterface[]> = {}
    const tournamentNames = new Map<string, string>();
    for (const tournament of folder) { // Iterating through every CSV
        const results = await parseCommand(tournament);
        if (typeof results === 'undefined') { continue; } // Iterating through the results of a CSV
        for (const row of results) {
            const tourneyName = tournament.split(/[\\.]/).at(-2);
            const tourneyDate: string = `${tournament.split(/[\\.]/).at(-3)!}T12:00:00`
            row.tournamentName = tourneyName!;
            tournamentNames.set(tourneyName!, tourneyDate!);
            if (teamDataSorted[tourneyName!]) {
                teamDataSorted[tourneyName!]?.push(row);
            } else {
                teamDataSorted[tourneyName!] = [];
                teamDataSorted[tourneyName!]?.push(row);
            }
        }
    }
    const arrayFromTournamentSet = Array.from(tournamentNames);
    const objectContents = `import type { teamResultsInterface } from "../Interfaces/teamResultsInterface.ts";
    export const ${objectName}: Record<string, teamResultsInterface[]> = ${JSON.stringify(teamDataSorted, null, 4)}
    export const tournamentSet: [string, string][] = ${JSON.stringify(arrayFromTournamentSet)}`;
    fs.writeFileSync(objectPath, objectContents);
    return { teamDataSorted, arrayFromTournamentSet };
}

/* Identifies new CSV files by comparing the tournament set to the CSV folder */
export async function identifyNewTeamData(male: boolean, memoryTList?: [string ,string][]) {
    let folder: string[];
    let playersObject;
    let tList: string[];

    if (typeof memoryTList !== "undefined") {
        if (male) {
            mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
                .map(file => path.join(mFolder, file));
            folder = mensCSVs;
        }
        else {
            womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
                .map(file => path.join(wFolder, file))
            folder = womensCSVs;
        }

        if (memoryTList.length === folder.length && memoryTList.every(([first], index) => first === folder[index]!.split(/[\\.]/).at(-2))) {
            // console.log(folder[0]!.split(/[\\.]/).at(-2));
            return false // No new data
        } else {
            return true // There is new data
        }
    }
    // If I do not pass in a list of tournaments...
    else {
        if (male) {
            playersObject = await import('./mensTeamResultsObject.ts');
            tList = playersObject.tournamentSet.map(item => item[0]);
            mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
                .map(file => path.join(mFolder, file));
            folder = mensCSVs;
        }
        else {
            playersObject = await import('./womensTeamResultsObject.ts');
            tList = playersObject.tournamentSet.map(item => item[0]);
            womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
                .map(file => path.join(wFolder, file))
            folder = womensCSVs;
        }

        if (tList.length === folder.length && tList.every((val, index) => val === folder[index]!.split(/[\\.]/).at(-2))) {
            // console.log(folder[0]!.split(/[\\.]/).at(-2));
            return false // No new data
        } else {
            return true // There is new data
        }
    }
}

/* Gets the info of one tournament via name and gender */
export async function getTourneyData(male: boolean, name: string, dataFromMemory?: Record<string, teamResultsInterface[]>) {
    if (typeof dataFromMemory !== 'undefined') {
        const toReturn = dataFromMemory[name];
        return toReturn;
    } else {
        let tourneyData;
        let toReturn;
        if (male) {
            tourneyData = await import('./mensTeamResultsObject.ts');
            toReturn = tourneyData.mensTeamResultsObject[name];
        } else {
            tourneyData = await import('./womensTeamResultsObject.ts');
            toReturn = tourneyData.womensTeamResultsObject[name];
        }
        return toReturn;
    }
}

/* Gets results of the most recent tournament for one team */
export async function getRecentTourneyData(male: boolean, dataFromMemory?: Record<string, teamResultsInterface[]>) {
    if (typeof dataFromMemory !== 'undefined') {
        const tourney = dataFromMemory[Object.keys(dataFromMemory).at(-1)!]
        if (typeof tourney === 'undefined') { return { placement: 0, outOf: 0, name: "" } }
        let ourEntry: teamResultsInterface | undefined;
        for (const entry of tourney!) {
            if (entry.Team_Name == "Wisc.-Madison") {
                ourEntry = entry;
                break;
            }
        }
        if (!ourEntry) { return { placement: 0, outOf: 0, name: "" } }
        const placement: number = ourEntry.No;
        const outOf: number = Object.keys(tourney).length;
        const name: string = ourEntry.tournamentName;
        return { placement, outOf, name };
    } // If data was not passed in from server memory...
    else {
        let tObject;
        let tData;
        if (male) {
            tObject = await import('./mensTeamResultsObject.ts');
            tData = tObject.mensTeamResultsObject;
        } else {
            tObject = await import('./womensTeamResultsObject.ts');
            tData = tObject.womensTeamResultsObject;
        }
        const tourney = tData[Object.keys(tData).at(-1)!]
        if (typeof tourney === 'undefined') { return { placement: 0, outOf: 0, name: "" } }
        let ourEntry;
        for (const entry of tourney!) {
            if (entry.Team_Name == "Wisc.-Madison") {
                ourEntry = entry;
                break;
            }
        }
        if (!ourEntry) { return { placement: 0, outOf: 0, name: "" } }
        const placement: number = ourEntry?.No!;
        const outOf: number = Object.keys(tourney!).length;
        const name: string = ourEntry?.tournamentName!;
        return { placement, outOf, name };
    }
}

/* Returns a combined tournament list with an integer that specifies which team(s) competed
   This function does not return tournament results but is used to aid in accessing them */
export async function getCombinedTLists(memoryM: [string, string][], memoryF: [string,string][]) {
    // string[0] = gender. string[1] = chronological index.
    const tListReturned: Record<string, [number, string]> = {};
    let iteratorM: number = 0;
    let iteratorF: number = 0;

    for (const m of memoryM) {
        tListReturned[m[0]] = [0, m[1]];
        iteratorM++;
    }

    for (const f of memoryF) {
        if (tListReturned[f[0]]) {
            tListReturned[f[0]]![0] = 2;
            tListReturned
        } else {
            tListReturned[f[0]] = [1, f[1]];
            iteratorF++;
        }
    }

    return tListReturned;

}