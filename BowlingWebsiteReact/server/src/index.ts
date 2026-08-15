import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAverageAndTotal, getPlayerResults, generateTourneyData, identifyNewData } from "../data/generatePlayerData.ts";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
});


const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const app = express();
const mensData = await import('../data/mensResultsObject.ts');
const womensData = await import('../data/womensResultsObject.ts');

let workingMensResults = mensData.mensResultsObject;
let workingWomensResults = womensData.womensResultsObject;
let workingMensTList = mensData.tournamentSet;
let workingWomensTList = womensData.tournamentSet;

app.use(express.json());
app.use(express.static('public'));
app.use(
    "/media",
    express.static(path.join(dirname, "media"))
);

/*
Return JSON or TS with player results
*/
app.get("/api/detailed/:gender/:id", async (req, res) => {
    // Call get playerResults() and JSONify it, then send as the response
    let male: boolean;
    if (req.params.gender === 'mens') { male = true }
    else { male = false; }
    if (await identifyNewData(male, male ? workingMensTList : workingWomensTList)) {
        const data = await generateTourneyData(male)
        if (male) {
            workingMensResults = data.mensDataSorted;
            workingMensTList = data.arrayFromTournamentSet;
        } else {
            workingWomensResults = data.mensDataSorted;
            workingWomensTList = data.arrayFromTournamentSet;
        }
        console.log("GENERATING DATA")
    }

    const results = await getPlayerResults(male, req.params.id, male ? workingMensResults : workingWomensResults);
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

app.get("/api/home/recap", async (req, res) => {
    // Get high game & high series of recent competition
    res.json()
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