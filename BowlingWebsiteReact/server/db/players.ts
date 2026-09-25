import { db } from "./connection.ts";
import bcrypt from "bcrypt";

export async function getAllPlayers(
) {
    const players = await db.query(
        `SELECT * FROM players`
    )
    return players.rows;
}

export async function getPlayerByName(
    name: string
) {
    const player = await db.query(
        `
        SELECT * FROM players WHERE name = $1
        `,
        [name]
    )
    if (!player) {
        return undefined;
    }
    return player.rows[0];
}

export async function createPlayer(
    name: string,
    male: boolean,
    user_id?: number
) {
    const result = await db.query(
        `
        INSERT INTO players (name, male, user_id)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
        `,
        [name, male, user_id ?? null]
    );
}

export async function connectUserId(
    
) {

}