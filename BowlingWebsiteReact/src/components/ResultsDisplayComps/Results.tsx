import { useParams, useLocation, useNavigate } from "react-router"
import { useEffect, useState, useRef, cache } from "react";
import type { teamResultsInterface } from "../../Interfaces/teamResultsInterface";
import useConditionalRender from "../../Scripts/useConditionalRender";
import { Table } from "react-bootstrap";
import BackButton from "../UniversalUIComps/BackButton";
import Loading from "../UniversalUIComps/Loading";
import { scroll } from "../../Scripts/scroll";
import type { tournamentEntry } from "./ResultsBoxContainer";
import { fetchWithRetry } from "../../Scripts/fetchWithRetry";

import { resultsCache } from "../../caches/TournamentCache";

function getTournamentFromCache(gender: string, id: string) {

}

async function getData(gender: string | undefined, id: string | undefined) {
    const data = await fetchWithRetry(
        () => fetch(`/api/home/${gender}/${id}`),
        10
    )

    if (!data.ok) {
        return {
            dataJSON: {},
            response: data.status
        }
    } else {
        const dataJSON = await data.json();
        const response = await data.status;
        return { dataJSON, response }
    }
}

function getNextAndLast(idx: number, entries: tournamentEntry[], gender: number) {

    let next: string = '';
    let prev: string = '';
    let nextIdx: number = -1;
    let prevIdx: number = -1;

    // Searching for the closest next tournament that matches the selected gender
    for (let i = idx + 1; i < entries.length; i++) {
        const nextEntryGender = entries[i][1][0];
        if (nextEntryGender == gender || nextEntryGender == 2) {
            next = entries[i][0];
            nextIdx = i;
            break;
        }
    };

    // Searching for the closest previous tournament that matches the selected gender
    for (let i = idx - 1; i > -1; i--) {
        const prevEntryGender = entries[i][1][0];
        if (prevEntryGender == gender || prevEntryGender == 2) {
            prev = entries[i][0];
            prevIdx = i;
            break;
        }
    };

    return { next, prev, nextIdx, prevIdx };
}

function ResultsTableEntry(props: { entry: teamResultsInterface }) {
    const entry = props.entry;
    const { isMd } = useConditionalRender();
    let ourTeam: boolean = false;
    if (entry.Team_Name == 'Wisc.-Madison') {
        ourTeam = true;
    }
    return (
        <tr style={{ position: 'relative',
         color: `${ourTeam ? '#FF0059' : '#FFFFFF'}`,
         filter: `${ourTeam ? 'drop-shadow(1px 1px 1px rgb(255, 0, 89))' : ''}` }}>
            <td>#{entry.No}</td>
            <td>{entry.Team_Name}</td>
            {isMd && <td>{entry.Team}</td>}
            {isMd && <td>{entry.Baker}</td>}
            <td>{(entry.Avg / 5).toFixed(1)}</td>
            <td>{entry.Diff}</td>
        </tr>
    )
}

function ResultsTable(props: { male: boolean, name: string, results: teamResultsInterface[], nextAndLast: React.ReactNode }) {
    const { isMd } = useConditionalRender();
    const bgRef = useRef<HTMLDivElement>(null);
    const animationId = useRef<number | null>(null);
    const position = useRef<number>(0)
    useEffect(() => {
        scroll(0.5, animationId, position, bgRef, { xAxis: false, reverse: false, layer: 0 })
    }, [])
    return (
        <div className='teamResults' style={{}} ref={bgRef}>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'space-between' }}>
                <BackButton />
                <h1 style={{ marginLeft: '45px' }}>{props.name} ({props.male ? 'Men' : 'Women'})</h1>
                {props.nextAndLast}
            </div>
            <div style={{ border: isMd ? '4px solid white': 'none', minHeight: '65vh', backgroundColor: 'black' }}>
                {props.results.length != 0 && <Table className='REMTable team' style={{}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style={{}}>University</th>
                            {isMd && <th style={{ marginLeft: 'auto' }}>Day 1 Ind.</th>}
                            {isMd && <th>Day 2 Baker</th>}
                            <th style={{paddingRight: '40px'}}>Avg</th>
                            <th>Diff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.results.map((item) => {
                            return (
                                <ResultsTableEntry {...{ entry: item }} />
                            )
                        })}
                    </tbody>
                </Table>}
                {props.results.length == 0 && <Loading text={`Loading results`} />}
            </div>
        </div>
    )
}

function NextAndLastButtons(props: { entries: tournamentEntry[], male: boolean, next: [string, number], prev: [string, number] }) {
    const { isMd } = useConditionalRender();
    const genderString = props.male ? 'mens' : 'womens';
    const navigate = useNavigate();
    const linkPrev = `/results/${genderString}/${props.prev[0]}/${props.prev[1]}`
    const linkNext = `/results/${genderString}/${props.next[0]}/${props.next[1]}`

    const statePrev = {
        entries: props.entries
    }
    const stateNext = {
        entries: props.entries
    }
    const nextNav = () => {
        navigate(linkNext, { replace: true, state: stateNext })
    }
    const prevNav = () => {
        navigate(linkPrev, { replace: true, state: statePrev })
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // A Press
            if (props.prev[1] != -1 && event.key.toUpperCase() == 'A') {
                prevNav();
            }
            // D Press
            if (props.next[1] != -1 && event.key.toUpperCase() == 'D') {
                nextNav();
            }
            // esc Press
            if (event.key == 'Escape') {
                navigate(-1);
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => { window.removeEventListener("keydown", handleKeyDown) }
    }, [linkPrev, linkNext])

    return (
        <div>
            {isMd &&
                <div style={{ position: 'relative', display: 'flex', marginRight: '100px', gap: '30px', fontFamily: 'Iosevka' }}>

                    {/* Previous Button */}

                    {props.prev[1] != -1 && <button title='Use me with A!' className='resultsButton' style={{ display: 'flex', alignItems: 'center', top: '0', left: '-125px', position: 'absolute' }}
                        onClick={() => prevNav()}>
                        {isMd && <h2 className="resultsKey">A</h2>}
                        <h1 className="resultsArrow">&#x25C0;</h1>
                        <h1 className="resultsHeadText">Prev</h1>
                    </button>}

                    {/* Next Button */}

                    {props.next[1] != -1 && <button title='Use me with D!' className='resultsButton' style={{ display: 'flex', alignItems: 'center', top: '0', left: '0', position: 'absolute' }}
                        onClick={() => nextNav()}>
                        <h1 className="resultsHeadText">Next</h1>
                        {isMd && <h2 className="resultsKey" style={{ left: 'unset', right: '22.5px' }}>D</h2>}
                        <h1 className="resultsArrow">&#x25B6;</h1>
                    </button>}
                </div>}
            {!isMd &&
                <div style={{ position: 'absolute', left: '0', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%', width: '100%' }}>
                        {props.prev[1] != -1 && <button className='resultsButton' style={{ marginRight: 'auto' }} onClick={() => prevNav()}><h1 className="resultsArrow">&#x25C0;</h1></button>}
                        {props.next[1] != -1 && <button className='resultsButton' style={{ marginLeft: 'auto' }} onClick={() => nextNav()}><h1 className="resultsArrow">&#x25B6;</h1></button>}
                    </div>
                </div>}
        </div>
    )
}

function Results() {

    const { gender, id, idx } = useParams();
    const idRef = useRef(id);
    const { entries } = useLocation().state;
    const location = useLocation();
    const firstLoad = useRef(true);

    const [tourney, setTourney] = useState<teamResultsInterface[]>([]);
    const [response, logResponse] = useState<number>(400);
    const [loading, setLoading] = useState<boolean>(false);

    let male: boolean = false;
    let genderNumber = 1;
    if (gender == 'mens') { male = true; genderNumber = 0 }
    const { next, prev, nextIdx, prevIdx } = getNextAndLast(+idx!, entries, genderNumber);

    useEffect(() => {

        // Wait for timer to resolve
        // Check if client still wants to display the fetched data by comparing id param from URL and fetched data
        // If so, set state (tourney) to the fetched data and add it to the cache
        // If not, do not set state but still add to cache
        idRef.current = id
        const cache_id = `${id}_${male ? "M" : "F"}`
        let firstFetch: boolean = false;
        const load = async () => {
            setTourney([]);
            if (!resultsCache.has(cache_id)) {
                try {
                    const results = await getData(gender, id);
                    resultsCache.set(cache_id, results.dataJSON);
                    firstFetch = true;
                }
                catch (error) {
                    console.error("Could not fetch results");
                }
            }

            const data = resultsCache.get(cache_id);
            if (data === undefined) {
                logResponse(502);
                return;
            }
            if (!firstLoad.current && firstFetch) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            if (idRef.current === data[0].Tournament_Name) {
                setTourney(data);
                logResponse(200);
            }
            firstLoad.current = false;
        }

        const run = async () => {
            try {
                // setLoading(true);
                load();
            }
            finally {
                setLoading(false)
            }
        }

        run();
        return () => setTourney([]);
    }, [location.pathname])


    return (
        <div className='resultsPage' style={{ position: 'relative' }}>
            {response == 200 && <>
                <ResultsTable {...{
                    male: male, name: id!, results: tourney,
                    nextAndLast: <NextAndLastButtons {...{ entries: entries, male: male, next: [next, nextIdx], prev: [prev, prevIdx] }} />
                }} />
                {loading == true && <div style={{ position: 'absolute', top: '0', right: '8px', fontFamily: 'Iosevka', backgroundColor: 'black' }}>
                    <Loading text={"Loading entry"} />
                </div>}
            </>
            }
            {response == 400 && <Loading text={"Loading"} />}
            {response == 502 && <h2 style={{ fontFamily: 'Iosevka' }}>Failed to load data.</h2>}
            {/* {response == 200 && loading && <Loading text={"Loading"} />} */}
        </div>
    )
}

export default Results;

