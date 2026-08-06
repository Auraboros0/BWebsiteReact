import type { resultsInterface } from "../Interfaces/resultsInterface.ts";
import { execFile } from "node:child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
import fs from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const pythonScript = path.resolve(dirname, "./resultsParser.py");

const mFolder = path.resolve(dirname, "./resultsMen");
const wFolder = path.resolve(dirname, "./resultsWomen");

const mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(mFolder, file));

const womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(wFolder, file));

console.log(mensCSVs)

/* 
Lets break down all the bullshit
execFile: Executes a file via command
execFileAsync: execFile but promise based. The promise being that the file is executed
readdir: Read directory
path.resolve: Creates a path.

Why use await for the CSVs consts? Because we are searching for files in our system that may not exist.
NOTE!!! JSON.parse is SUPER FUCKING PICKY
*/

async function parseCommand(tournamentPath: string | undefined) {
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

export async function generateTourneyData(folder: string[]) {
    const mensDataSorted: Record<string,resultsInterface[]> = {}
    const allMensData: resultsInterface[] = []
    for (const tournament of folder) { // Iterating through every CSV
        const results = await parseCommand(tournament);
        if (typeof results === 'undefined') { continue; } // Iterating through the results of a CSV
            for (const row of results) {
                const rowToPush = row;
                const tourneyName = tournament.split(/[\\.]/).at(-2);
                row.tournamentName = tourneyName!;
                if (mensDataSorted[row.Name]) {
                    mensDataSorted[row.Name]?.push(rowToPush);
                } else {
                    mensDataSorted[row.Name] = [];
                    mensDataSorted[row.Name]?.push(rowToPush)
                }
            }
    }
    // console.log(mensDataSorted["Jake Kilander"])
    return mensDataSorted;
}

export async function getPlayerResults(male: boolean, name: string) {
    let folder: string[];
    if (male) { folder = mensCSVs }
    else { folder = womensCSVs }
    const results = await generateTourneyData(folder);
    const toReturn = results[name];
    return toReturn
}

export function transformToJSON() {

}

// const all = await generateTourneyData(mensCSVs);
// console.log(all);
const results = await getPlayerResults(true, "Joaquin Herrera")
// console.log(results);
// parseCommand(mensCSVs[0])