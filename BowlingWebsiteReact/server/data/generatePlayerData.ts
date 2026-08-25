import type { resultsInterface } from "../Interfaces/resultsInterface.ts";
import { mensResultsObject } from "./mensResultsObject.ts";
import { womensResultsObject } from "./womensResultsObject.ts";
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
const pythonScript = path.resolve(dirname, "./resultsParser.py");

const mFolder = path.resolve(dirname, "./Mens_Results_Individual");
const wFolder = path.resolve(dirname, "./Womens_Results_Individual");

let mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(mFolder, file));

let womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(wFolder, file));
/* 
Lets break down some stuff
execFile: Executes a file via command
execFileAsync: execFile but promise based. The promise being that the file is executed
readdir: Read directory
path.resolve: Creates a path.

Why use await for the CSVs consts? Because we are searching for files in our system that may not exist.
Note: JSON.parse() is picky asf. Cannot use single quotes
*/

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
    const result = JSON.parse(stdout) as resultsInterface[];
    return result
    console.log("YEAHH")
}

/* 
This function creates the mensResultsObject.ts and womensResultsObject.ts files by
parsing the CSVs located within Mens_Results_Individual and Results_Women_Individual.
*/
export async function generateTourneyData(male: boolean) {
    let objectName;
    let folder: string[];
    if (male) { objectName = "mensResultsObject"; folder = mensCSVs; }
    else { objectName = "womensResultsObject"; folder = womensCSVs; }
    const objectPath: string = path.resolve(dirname, `./${objectName}.ts`)
    const mensDataSorted: Record<string, resultsInterface[]> = {}
    const allMensData: resultsInterface[] = []
    const tournamentNames = new Map<string, string>();
    for (const tournament of folder) { // Iterating through every CSV
        const results = await parseCommand(tournament);
        if (typeof results === 'undefined') { continue; } // Iterating through the results of a CSV
        for (const row of results) {
            const tourneyName = tournament.split(/[\\.]/).at(-2);
            const tourneyDate: string = `${tournament.split(/[\\.]/).at(-3)!}T12:00:00`
            row.tournamentName = tourneyName!;
            tournamentNames.set(tourneyName!, tourneyDate!);
            // If the record already contains data for a player, push their corresponding data to their entry.
            if (mensDataSorted[row.Name]) {
                mensDataSorted[row.Name]?.push(row);
            } else { // If the record doesn't contain the player, initialize their entry with a blank array and push their data to it
                mensDataSorted[row.Name] = [];
                mensDataSorted[row.Name]?.push(row)
            }
        }
    }
    // console.log(mensDataSorted["Jake Kilander"])
    const arrayFromTournamentSet = Array.from(tournamentNames);
    const objectContents = `import type { resultsInterface } from "../Interfaces/resultsInterface.ts";
    export const ${objectName}: Record<string, resultsInterface[]> = ${JSON.stringify(mensDataSorted, null, 4)}
    export const tournamentSet: [string, string][] = ${JSON.stringify(arrayFromTournamentSet)}`;
    fs.writeFileSync(objectPath, objectContents);
    return { mensDataSorted, arrayFromTournamentSet };
}

/* 
This function is used to recognize when new results have been added to my results folders but
they have not yet been parsed.
*/
export async function identifyNewData(male: boolean, memoryTList?: [string, string][]) {
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
            playersObject = await import('./mensResultsObject.ts');
            tList = playersObject.tournamentSet.map(item => item[0]);
            mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
                .map(file => path.join(mFolder, file));
            folder = mensCSVs;
        }
        else {
            playersObject = await import('./womensResultsObject.ts');
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

/*
This function gets a specific player's results from one of my results objects.
*/
export async function getPlayerResults(male: boolean, name: string, dataFromMemory?: Record<string, resultsInterface[]>) {
    let results: Record<string, resultsInterface[]>;
    if (dataFromMemory !== undefined) {
        results = dataFromMemory;
    } else {
        if (male) {
            const { mensResultsObject } = await import('./mensResultsObject.ts');
            results = mensResultsObject;
        } else {
            const { womensResultsObject } = await import('./womensResultsObject.ts');
            results = womensResultsObject;
        }
    }

    const toReturn = results[name];
    if (!toReturn) { return [] };
    return toReturn;
}

/* 
This function simply calculates the average and total of a given player's records.
*/
export function getAverageAndTotal(results: resultsInterface[]) {
    if (results.length == 0) { return { avg: 0, gamesBowled: 0 }; }
    let total = 0;
    let gamesBowled = 0;
    for (const result of results) {
        total += result.Total;
        gamesBowled += result.Gm;
    }

    const avg = total / gamesBowled;
    return { avg, gamesBowled };
}

export function getWeeklyResults() {

}