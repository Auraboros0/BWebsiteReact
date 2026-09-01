import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { getAverageAndTotal, getPlayerResults, generateTourneyData, identifyNewData } from "../data/generatePlayerData.ts";
import {
    generateTeamData,
    identifyNewTeamData,
    getRecentTourneyData,
    getTourneyData,
    getCombinedTLists
} from "../data/generateTeamData.ts";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config({
    path: ".env"
});

import type { InstaObject } from "../Interfaces/instaObject.ts";
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const app = express();
const mensData = await import('../data/mensResultsObject.ts');
const womensData = await import('../data/womensResultsObject.ts');
const mensTeamData = await import('../data/mensTeamResultsObject.ts');
const womensTeamData = await import('../data/womensTeamResultsObject.ts');

let MensResults = mensData.mensResultsObject;
let WomensResults = womensData.womensResultsObject;
let MensTList = mensData.tournamentSet;
let WomensTList = womensData.tournamentSet;

let MensTeamResults = mensTeamData.mensTeamResultsObject;
let WomensTeamResults = womensTeamData.womensTeamResultsObject;
let MensTeamTList = mensTeamData.tournamentSet;
let WomensTeamTList = womensTeamData.tournamentSet;

let recentTourneysM = getRecentTourneyData(true, MensTeamResults, MensTeamTList);
let recentTourneysW = getRecentTourneyData(false, WomensTeamResults, WomensTeamTList);

let combinedTList = await getCombinedTLists(MensTeamTList, WomensTeamTList);
let instaData: InstaObject[] | null = null;

setInstaData();

cron.schedule("0 * * * *", async () => {
    console.log("Fetching New Posts");
    await setInstaData();
});


async function setInstaData() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media` +
            `?fields=id,username,profile_picture_url,caption,media_type,media_url,permalink,timestamp` +
            `&limit=15` +
            `&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
        );
        const data = await response.json();
        instaData = await data.data;
        return await data;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function regenerateDataPlayer(male: boolean) {
    const data = await generateTourneyData(male)
    if (male) {
        MensResults = data.mensDataSorted;
        MensTList = data.arrayFromTournamentSet;
    } else {
        WomensResults = data.mensDataSorted;
        WomensTList = data.arrayFromTournamentSet;
    }
    console.log("GENERATING PLAYER DATA")
}

async function regenerateDataTeam(male: boolean) {
    const data = await generateTeamData(male)
    if (male) {
        MensTeamResults = data.teamDataSorted;
        MensTeamTList = data.arrayFromTournamentSet;
        recentTourneysM = getRecentTourneyData(true, MensTeamResults);
    } else {
        WomensTeamResults = data.teamDataSorted;
        WomensTeamTList = data.arrayFromTournamentSet;
        recentTourneysW = getRecentTourneyData(false, WomensTeamResults);
    }
    combinedTList = await getCombinedTLists(MensTeamTList, WomensTeamTList);
    console.log("GENERATING TEAM DATA")
}

app.use(express.json());
app.use(
    "/public",
    express.static(path.join(dirname, "public"))
);
app.use(
    "/media",
    express.static(path.join(dirname, "../media"))
);

/*
Return JSON or TS with player results
*/
app.get("/api/detailed/:gender/:id", async (req, res) => {
    // Call get playerResults() and JSONify it, then send as the response
    let male: boolean;
    if (req.params.gender === 'mens') { male = true }
    else { male = false; }
    if (await identifyNewData(male, male ? MensTList : WomensTList)) {
        regenerateDataPlayer(male);
    }

    const results = await getPlayerResults(male, req.params.id, male ? MensResults : WomensResults);
    let avg;
    let total;

    if (results.length != 0) {
        const output = getAverageAndTotal(results);
        avg = output.avg.toFixed(3);
        total = output.gamesBowled;
    }
    else { avg = "Unestablished"; total = 0; }
    if (results.length != 0) {
        res.status(200).json({ average: avg, gamesBowled: total, results });
    } else {
        res.status(404).json({ average: "Undefined", gamesBowled: 0, results: [] })
    }
})

/* Gets the results of the most recent tournament */
app.get("/api/home/recap", async (req, res) => {
    // Get high game & high series of recent competition
    if (await identifyNewTeamData(true, MensTeamTList)) {
        regenerateDataTeam(true);
    }
    if (await identifyNewTeamData(false, WomensTeamTList)) {
        regenerateDataTeam(false);
    }
    const mData = await recentTourneysM
    const wData = await recentTourneysW;
    if (!mData.outOf && !wData.outOf) {
        res.status(404).json({ displayString: "Waiting for results!" })
    }
    else {
        res.status(200).json({ mData: mData, wData: wData })
    }

})

/* Gets the names of every tournament and the teams that participated */
app.get("/api/home/tournamentnames", async (req, res) => {
    if (await identifyNewTeamData(true, MensTeamTList)) {
        regenerateDataTeam(true);
    }
    if (await identifyNewTeamData(false, WomensTeamTList)) {
        regenerateDataTeam(false);
    }
    if (Object.keys(combinedTList).length == 0) {
        res.status(404).json(combinedTList);
    }
    res.status(200).json(combinedTList);
})

/* Gets the results of a particular tournament */
app.get("/api/home/:male/:tournament", async (req, res) => {
    if (await identifyNewTeamData(true, MensTeamTList)) {
        regenerateDataTeam(true);
    }
    if (await identifyNewTeamData(false, WomensTeamTList)) {
        regenerateDataTeam(false);
    }
    let male = true;
    let tournamentObject = MensTeamResults;
    if (req.params.male != 'mens') { male = false; tournamentObject = WomensTeamResults }
    const data = await getTourneyData(male, req.params.tournament, tournamentObject);
    res.status(200).json(data)
})

/* Returns three instagram posts based on a "cursor" */
app.get("/api/instagram/posts/:cursor", async (req, res) => {
    if (instaData === null) {
        res.status(400).json({ message: "Could not load instagram posts" })
    } else {
        const cursorNumber = parseFloat(req.params.cursor);
        let idx = 0
        let last = false;
        if (cursorNumber != -1) {
            idx = instaData.findIndex(post => post.id == cursorNumber)
        }
        if (idx + 3 >= instaData.length) { last = true }
        res.status(200).json({ data: instaData.slice(idx, idx + 3), last: last });
    }
})

app.get("/api/gallery", async (req, res) => {
    try {
        const imagePath = path.join(dirname, "../media/image");
        const videoPath = path.join(dirname, "../media/video");

        const filesImage = await fs.readdir(imagePath);
        const filesVideo = await fs.readdir(videoPath);

        res.json({images: filesImage, videos: filesVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to read folder" });
    }
})

/*
    Creates a dictionary of entries that are <name: string, scores: number[]>
    The request holds every bowler's name.
*/
app.post("/api/initializeScores", (_req, res) => {
    res.json({

    })
})

/*
    Updates the dictionary above with scores.
    The request holds instances of an interface {name: string, score: number}
*/
app.post("/api/updatescores", (_req, res) => {

})

app.listen(3001, () => {
    console.log("Server running on port 3001");
});