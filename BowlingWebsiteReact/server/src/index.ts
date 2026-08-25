import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAverageAndTotal, getPlayerResults, generateTourneyData, identifyNewData } from "../data/generatePlayerData.ts";
import { generateTeamData,
     identifyNewTeamData,
      getRecentTourneyData,
       getTourneyData,
        getCombinedTLists } from "../data/generateTeamData.ts";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
});


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

let combinedTList = await getCombinedTLists(MensTeamTList, WomensTeamTList);

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
    } else {
        WomensTeamResults = data.teamDataSorted;
        WomensTeamTList = data.arrayFromTournamentSet;
    }
    combinedTList = await getCombinedTLists(MensTeamTList, WomensTeamTList);
    console.log("GENERATING TEAM DATA")
}

app.use(express.json());
app.use(
    "/public",
    express.static(path.join(dirname, "public"))
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
    const mData = await getRecentTourneyData(true, MensTeamResults);
    const wData = await getRecentTourneyData(true, WomensTeamResults);
    if (!mData.outOf && !wData.outOf) {
        res.status(404).json({ displayString: "Waiting for results!"})
    }
    else {
        res.status(200).json({ mData: mData, wData: wData })
    }

})

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

app.get("/api/home/:male/:tournament", async (req, res) => {
    if (await identifyNewTeamData(true, MensTeamTList)) {
        regenerateDataTeam(true);
    }
    if (await identifyNewTeamData(false, WomensTeamTList)) {
        regenerateDataTeam(false);
    }
    let male = true;
    let tournamentObject = MensTeamResults;
    if (req.params.male != 'mens') {male = false; tournamentObject = WomensTeamResults}
    const data = await getTourneyData(male, req.params.tournament, tournamentObject);
    res.status(200).json(data)
})

// app.get("/api/instagram/posts", async (req, res) => {
//     const token = process.env.INSTAGRAM_ACCESS_TOKEN;
//     console.log(token);
//      try {
//         const response = await fetch(
//             `https://graph.instagram.com/me/media` +
//             `?fields=id,caption,media_type,media_url,permalink,timestamp` +
//             `&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
//         );

//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Instagram request failed" });
//     }
// })

app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello from the backend!" });
});

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