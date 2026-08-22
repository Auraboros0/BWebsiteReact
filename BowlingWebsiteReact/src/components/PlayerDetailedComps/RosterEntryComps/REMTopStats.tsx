import { Suspense, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router"
import type { resultsInterface } from "../../../Interfaces/resultsInterface";
import { Table } from "react-bootstrap";
import REMEntry from "./REMEntry";
import Loading from "./Loading";

async function getInfo(gender: string, id: string) {
    const data = await fetch(`/api/detailed/${gender}/${id}`);
    const status: number = data.status;
    const toReturn = await data.json();
    return {status, toReturn};
}


function REMTopStats({ ref, onDataLoad }) {
    const [playerAvg, setPlayerAvg] = useState<number>(0);
    const [playerTotalGames, setPlayerTotal] = useState<number>(0);
    const [playerResults, setPlayerResults] = useState<resultsInterface[]>([]);
    const [responseStatus, logResponseStatus] = useState<number>(0);
    const { gender, id } = useParams();

    // Every 5 seconds, attempt to read player data. If data is read, no more attempts will be made.
    useEffect(() => {
        logResponseStatus(0);
        let count = 0;
        const interval = setInterval(() => {
            const retrieve = async () => {
                try {
                    // Get data from response and tell container that data has been loaded so it can re-render
                    const returned = await getInfo(gender!, id!);
                    const data = await returned.toReturn;
                    const status = await returned.status;
                    setPlayerResults(data.results);
                    setPlayerAvg(data.average);
                    setPlayerTotal(data.gamesBowled)
                    logResponseStatus(status);
                    onDataLoad();
                    if (returned) { clearInterval(interval); }
                }
                catch (error) {
                    if (count >= 3) { clearInterval(interval) }
                    count += 1;
                    console.error("Failed to retrieve data");
                }
            }
            retrieve();
        }, 5000);

        return () => clearInterval(interval);
    }, [id])

    return (
        <div ref={ref} className='REMTopStats'>
            <div style={{position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: '1'}}>
                <h2>Stats: {id}</h2>
                {responseStatus === 0 && <Loading text={"Loading Data"}/>}
                {/* <div style={{border: '4px solid white', height: '100%'}}></div> */}
                {responseStatus === 404 && <h2>Stats have not been established</h2>}
                {responseStatus === 200 && <div>
                    <div style={{border: '0px solid white'}}>
                    <Table className='REMTable' style={{marginBottom: '100px'}}>
                        <thead>
                            <tr>
                                <th>Tournament</th>
                                <th style={{marginLeft: 'auto'}}># Games</th>
                                <th>Total</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                    {playerResults.map((item) => {
                        return (
                           <REMEntry {...item} />
                        )
                    })}
                    </tbody>
                    </Table>
                    </div>
                    <div style={{position: 'absolute', display: 'flex', justifyContent:'flex-start', bottom: '0px', left: '180px', whiteSpace: 'pre-wrap'}}>
                        <h2 style={{width:'fit-content', textAlign: 'center'}}>Average: {playerAvg} </h2>
                        <h2> | </h2>
                        <h2 style={{width:'fit-content', textAlign: 'center'}}>Events Bowled: {playerResults.length} </h2>
                        <h2> | </h2>
                        <h2 style={{width:'fit-content', textAlign: 'center'}}>Games Bowled: {playerTotalGames}</h2>
                    </div>
                    </div>
                }
                {/* {playerResults.length != 0 && <h2>Average: {playerAvg}</h2>}
                {playerResults.length == 0 && <Loading />} */}
            </div>
        </div>
    )
}

export default REMTopStats