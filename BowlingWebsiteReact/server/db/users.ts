import { db } from "./connection.ts";
import bcrypt from "bcrypt";

export async function createUser(
    username: string,
    real_name: string,
    email: string,
    password: string,
) {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await db.query(
        `
        INSERT INTO users (username, real_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        `,
        [username, real_name, email, passwordHash]
    );
}

export async function getUserByUsername(
    username: string
) {
    const user = await db.query(
        `
        SELECT * FROM users WHERE username = $1
        `,
        [username]
    )
    if (!user) {
        return undefined;
    }
    return user.rows[0];
}

export async function getUserByName(
    name: string
) {
    const user = await db.query(
        `
        SELECT * FROM users WHERE real_name = $1
        `,
        [name]
    )
    if (!user) {
        return undefined;
    }
    return user.rows[0];
}

export async function loginUser(
    username: string,
    password: string
) {
    const user = await getUserByUsername(username);

    if (!user) {
        return;
    }

    const correct = await bcrypt.compare(
        password,
        user.password_hash
    )
    if (!correct) {
        return null
    }
    return user;
}