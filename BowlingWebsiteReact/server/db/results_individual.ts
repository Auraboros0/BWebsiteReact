import { db } from "./connection.ts";
import { getUserByName } from "./users.ts";
import { createPlayer, getAllPlayers, getPlayerByName } from "./players.ts";
import { generateSeasonNumbers, getSeasonIndirect, getSeasonDirect } from "./seasons.ts";

import type { resultsInterface } from "../Interfaces/resultsInterface.ts";
import { execFile } from "node:child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
import fs from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import { dir } from "node:console";
import { data } from "react-router-dom";
import type { SQLResultsInterface } from "../Interfaces/SQLResultsInterface.ts";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const pythonScript = path.resolve(dirname, "../data/PlayerData/resultsParser.py");

const mFolder = path.resolve(dirname, "../data/Mens_Results_Individual");
const wFolder = path.resolve(dirname, "../data/Womens_Results_Individual");

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

    const result = JSON.parse(stdout) as resultsInterface[];
    return result
}

export async function createAllEntries() {
    for (const f of mensCSVs) {
        await addEventIndividual(f, true)
    }

    for (const f of womensCSVs) {
        await addEventIndividual(f, false);
    }
}

export async function deleteAllEntries() {
    await db.query(
        `
        TRUNCATE TABLE individual_results
        `
    )
}

export async function generateRecordForIndividuals(
    season?: string,
) {
    const players = await getAllPlayers();
    const dataSorted: Record<string, SQLResultsInterface[]> = {}
    for (const p of players) {
        const result = await getAllEventsIndividual(p.name, season);
        if (!result) { continue; }
        for (const r of result) {
            if (dataSorted[p.name]) {
                dataSorted[p.name]?.push(r);
            } else { // If the record doesn't contain the player, initialize their entry with a blank array and push their data to it
                dataSorted[p.name] = [];
                dataSorted[p.name]?.push(r)
            }
        }
    }

    return dataSorted;
}

export async function getAllEventsIndividual(
    name: string,
    season?: string,
    cache?: Record<string, SQLResultsInterface[]>
) {
    if (cache) {
        return cache[name];
    }

    let season_obj;
    if (!season) {
        season_obj = await generateSeasonNumbers();
        season = season_obj?.seasonString;
    }

    const result = await db.query(
        `
        SELECT r.*
        FROM individual_results r
        JOIN players p ON r.player_id = p.id
        JOIN seasons s ON r.season_id = s.id
        WHERE p.name = $1
        AND s.years = $2
        `,
        [name, season]
    )
    const returning: SQLResultsInterface[] = [];
    for (const r of result.rows) {
        const SQLEntry: SQLResultsInterface = {
            ...r,
            Name: name,
            male: r.male,
            season: season
        }
        returning.push(SQLEntry);
    }
    return returning;
}

export function getAverageAndTotalSQL(results: SQLResultsInterface[]) {
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

export async function addEventIndividual(
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
    const season_obj = await generateSeasonNumbers(date);
    const season = season_obj.seasonString;

    for (const row of results) {
        const SQLEntry: SQLResultsInterface = {
            ...row,
            Tournament_name: tourneyName!,
            male: male,
            season: season
        }
        let player = await getPlayerByName(row.Name);
        if (!player) {
            await createPlayer(row.Name, male);
            player = await getPlayerByName(row.Name)
        }

        const result = await db.query(
            `
            INSERT INTO individual_results (
                player_id,
                "No",
                "School",
                "Tm",
                "Total",
                "Gm",
                "Avg",
                "Tournament_name",
                season_id,
                male
            )
            SELECT
                p.id,
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                s.id,
                $8
            FROM players p
            CROSS JOIN seasons s
            WHERE p.name = $9
            AND s.years = $10
            ON CONFLICT DO NOTHING
            `,
            [
                SQLEntry.No,
                SQLEntry.School,
                SQLEntry.Tm,
                SQLEntry.Total,
                SQLEntry.Gm,
                SQLEntry.Avg,
                SQLEntry.Tournament_name,
                male,
                SQLEntry.Name,
                season
            ]
        );
    }
}