import { db } from "./connection.ts";
import bcrypt from "bcrypt";

// Log user ID when using this function
export async function getVideo(
    user: number,
) {

}

export async function getWide(

) {

}

export async function getLong(

) {
    
}

export async function addVideo(
    filename: string,
    user: number,
    wide: boolean,
) {
    const path = `/Player_Uploads/${filename}` 
    const result = await db.query(
        `
        INSERT INTO videos (user_id, filename, path, wide)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username
        `,
        [user, filename, path, wide]
    );
}

export async function deleteVideo(

) {

}