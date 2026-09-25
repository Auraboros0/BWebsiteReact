import { db } from "./connection.ts";
import { generateSeasonNumbers, getSeasonDirect } from "./seasons.ts";

export async function getTournamentList(
    male: boolean,
    season?: string
) {
    const season_obj = await getSeasonDirect(season);
    const season_id = await season_obj.id
    const result = await db.query(
        `
        SELECT * FROM tournament_set WHERE male = $1
        AND season_id = $2
        `,
        [male, season_id]
    )
    const tournaments = result.rows.map(row => ({
        Tournament_Name: row.Tournament_Name,
        date: row.date
    }));
    return tournaments;
}

export async function addTournament(
    name: string,
    male: boolean,
    date: string,
) {
    const season_string = await generateSeasonNumbers(date);
    const season_obj = await getSeasonDirect(season_string);
    const season_id = season_obj.id;
    const date_obj = new Date(date);
    const result = await db.query(
        `
        INSERT INTO tournament_set (name, male, season_id, date)
        VALUES ($1, $2, $3, $4)    
        `,
        [name, male, season_id, date_obj]
    )
}