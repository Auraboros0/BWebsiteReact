import { db } from "./connection.ts";

export function generateSeasonNumbers(dateString?: string) {
    let date = dateString ? new Date(dateString) : new Date();
    if (Number.isNaN(date.getTime())) {
        date = new Date();
    }
    let year1;
    let year2;
    if (date.getMonth() > 7) {
        year1 = date.getFullYear();
        year2 = year1 + 1;
    } else {
        year1 = date.getFullYear() - 1;
        year2 = year1 + 1;
    }
    return {seasonString: `${year1}-${year2}`, start_date: new Date(`${year1}-08-01`), end_date: new Date(`${year2}-07-31`)};
}

export function generateSeasonNumbersDirect(season: string) {
    let year1 = season.split("-").at(0);
    let year2 = season.split("-").at(1);
    return {seasonString: `${year1}-${year2}`, start_date: new Date(`${year1}-08-01`), end_date: new Date(`${year2}-07-31`)};
}

export async function createSeason(
    season: string
) {
    let season_info = await generateSeasonNumbersDirect(season);
    let date1 = season_info.start_date;
    let date2 = season_info.end_date;
    await db.query(
        `
        INSERT INTO seasons (years, start_date, end_date)
        VALUES($1, $2, $3)
        ON CONFLICT DO NOTHING;
        `,
        [season, date1, date2]
    )
}

export async function initializeSeasons() {
    const result = await db.query(
        `
        SELECT EXISTS (
            SELECT 1
            FROM seasons
        ) as has_seasons
        `
    );
    if (result.rows[0].has_seasons == false) {
        const season_info = generateSeasonNumbers();
        await db.query(
            `
            INSERT INTO seasons (years, current, start_date, end_date)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
            `,
            [season_info.seasonString, season_info.start_date, season_info.end_date, true]
        )
    }
}

// Valid string is YYYY-MM-DD
export async function getSeasonIndirect(
    date?: string
) {
    let season;
    if (typeof date === "undefined") {
        season = generateSeasonNumbers().seasonString;
    } else {
        season = generateSeasonNumbers(date).seasonString;
    }
    const result = await db.query(
        `
        SELECT * FROM seasons WHERE years = $1
        `,
        [season]
    )
    return result.rows[0];
}

// Valid string is YYYY-YYYY
export async function getSeasonDirect(
    season?: string
) {
    if (typeof season === "undefined") {
        season = generateSeasonNumbers().seasonString;
    }
    const result = await db.query(
        `
        SELECT * FROM seasons WHERE years = $1
        `,
        [season]
    )
    return result.rows[0];
}