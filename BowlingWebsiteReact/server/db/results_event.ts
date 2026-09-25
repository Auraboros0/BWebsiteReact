import { db } from "./connection.ts";
import { getUserByName } from "./users.ts";
import { createPlayer, getAllPlayers, getPlayerByName } from "./players.ts";
import { generateSeasonNumbers, getSeasonDirect, getSeasonIndirect } from "./seasons.ts";

import type { teamResultsInterface } from "../Interfaces/teamResultsInterface.ts";
import { execFile } from "node:child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import type { SQLTeamResultsInterface } from "../Interfaces/SQLTeamResultsInterface.ts";
import { getTournamentList } from "./tournament_set.ts";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const pythonScript = path.resolve(dirname, "../data/TeamData/teamResultsParser.py");

const mFolder = path.resolve(dirname, "../data/Mens_Results_Team");
const wFolder = path.resolve(dirname, "../data/Womens_Results_Team");

let mensCSVs = (await readdir(mFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(mFolder, file));

let womensCSVs = (await readdir(wFolder)).filter(file => file.endsWith(".csv"))
    .map(file => path.join(wFolder, file));

export async function parseCommand(tournamentPath: string | undefined) {
    if (typeof tournamentPath === 'undefined') { return }
    const { stdout, stderr } = await execFileAsync(
        "python",
        [pythonScript, `${tournamentPath}`]
    );

    if (stderr) {
    }

    const result = JSON.parse(stdout) as teamResultsInterface[];
    return result
}

export async function generateTeamEventRecord(
    male: boolean,
    season?: string
) {
    const tournaments = await getTournamentList(male, season);
    const dataSorted: Record<string, SQLTeamResultsInterface[]> = {}
    const season_obj = await getSeasonDirect(season);
    const season_id = season_obj.id;
    for (const t of tournaments) {
        const result = await db.query(
            `
            SELECT tr.*
            FROM team_results tr
            JOIN seasons s ON tr.season_id = s.id
            WHERE tr.Tournament_name = $1
            AND s.years = $2
            AND tr.male = $3
            `,
            [t.Tournament_Name, season, male]
        )
        if (!result) { continue; }
        for (const r of result.rows) {
            if (dataSorted[t.Tournament_Name]) {
                dataSorted[t.Tournament_Name]?.push(r);
            } else { // If the record doesn't contain the player, initialize their entry with a blank array and push their data to it
                dataSorted[t.Tournament_Name] = [];
                dataSorted[t.Tournament_Name]?.push(r)
            }
        }
    }

    return dataSorted;
}

export async function getEventFromDB(
    name: string,
    male: boolean,
    season?: string
) {
    if (!season) {
        season = await generateSeasonNumbers().seasonString;
    }
    const result = await db.query(
       `
        SELECT tr.*
        FROM team_results tr
        JOIN seasons s ON tr.season_id = s.id
        WHERE tr.Tournament_Name = $1
        AND tr.male = $2
        AND s.years = $3
        `,
        [name, male, season]
    )
    return result.rows;
}

export async function addEventTeam(
    filename: string,
    male: boolean
) {
    let folder: string[];
    if (male) { folder = mensCSVs; }
    else { folder = womensCSVs; }
    const entry = folder.find(tourney => tourney.split(/[\\.]/).at(-2) === filename.split(/[\\.]/).at(-2));
    const results = await parseCommand(entry);
    if (typeof results === 'undefined') { return; }

    const tourneyName = filename.split(/[\\.]/).at(-2);
    const date = filename.split(/[\\.]/).at(-3);
    console.log(date);
    const season_obj = await generateSeasonNumbers(date);
    const season = season_obj.seasonString

    for (const row of results) {
        const SQLEntry: SQLTeamResultsInterface = {
            ...row,
            male: male,
            season: season
        }
        const result = await db.query(
            `
        INSERT INTO team_results (
        "Tournament_Name",
        "No", 
        "Team_Name", 
        "Team", 
        "Baker", 
        "Games", 
        "Avg", 
        "Diff",
        male, 
        season_id
        )
        SELECT
            $1, 
            $2, 
            $3, 
            $4, 
            $5, 
            $6, 
            $7, 
            $8, 
            $9, 
            s.id
        FROM seasons s
        WHERE s.years = $10
        ON CONFLICT DO NOTHING
        `,
            [
                SQLEntry.No,
                SQLEntry.Tournament_Name,
                SQLEntry.Team_Name,
                SQLEntry.Team,
                SQLEntry.Baker,
                SQLEntry.Games,
                SQLEntry.Avg,
                SQLEntry.Diff,
                SQLEntry.male,
                season
            ]
        );
    }
}