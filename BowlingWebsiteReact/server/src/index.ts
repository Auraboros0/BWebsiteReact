import express from "express";
import { getPlayerResults } from "../data/generatePlayerData.ts";
const app = express();


app.use(express.json());
app.use(express.static('public'));

/*
Return JSON or TS with player results
*/
app.get("/api/detailed/:gender/:id", async (req, res) => {
    // Call get playerResults() and JSONify it, then send as the response
    let male: boolean;
    if (req.params.gender === 'mens') {male = true}
    else {male = false;}
    const toReturn = await getPlayerResults(male, req.params.id);
    // const toReturn = {message: "hello", number: 1};
    console.log(toReturn);
    res.json({toReturn});
})

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