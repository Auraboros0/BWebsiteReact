import { useParams, useLocation, useNavigate } from "react-router"
import { useEffect, useState, useRef } from "react";
import type { teamResultsInterface } from "../../Interfaces/teamResultsInterface";
import useConditionalRender from "../../Scripts/useConditionalRender";
import { Table } from "react-bootstrap";
import BackButton from "../UniversalUIComps/BackButton";
import Loading from "../PlayerDetailedComps/RosterEntryComps/Loading";
import { scroll } from "../../Scripts/scroll";

async function getData(gender: string | undefined, id: string | undefined) {
    const data = await fetch(`/api/home/${gender}/${id}`);
    const dataJSON = await data.json();
    const response = await data.status;
    return { dataJSON, response }
}

function getNextAndLast(idx: number, entries: [string, [number, string]][], gender: number) {

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
        <tr style={{ position: 'relative', color: `${ourTeam ? '#FF0059' : '#FFFFFF'}` }}>
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
        <div className='teamResults' ref={bgRef}>
            <div style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'space-between' }}>
                <BackButton />
                <h1 style={{ marginLeft: '45px' }}>{props.name} ({props.male ? 'Men' : 'Women'})</h1>
                {props.nextAndLast}
            </div>
            <div style={{}}>
                <Table className='REMTable team' style={{}}>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>University</th>
                            {isMd && <th style={{ marginLeft: 'auto' }}>Day 1 Ind.</th>}
                            {isMd && <th>Day 2 Baker</th>}
                            <th>Avg</th>
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
                </Table>
            </div>
        </div>
    )
}

function NextAndLastButtons(props: { entries: [string, [number, string]][], idx: number, male: boolean, next: [string, number], prev: [string, number] }) {
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

                    {props.prev[1] != -1 && <button className='resultsButton' style={{ display: 'flex', alignItems: 'center', top: '0', left: '-125px', position: 'absolute' }}
                        onClick={() => prevNav()}>
                        {isMd && <h2 className="resultsKey">A</h2>}
                        <h1 className="resultsArrow">&#x25C0;</h1>
                        <h1 className="resultsHeadText">Prev</h1>
                    </button>}

                    {/* Next Button */}

                    {props.next[1] != -1 && <button className='resultsButton' style={{ display: 'flex', alignItems: 'center', top: '0', left: '0', position: 'absolute' }}
                        onClick={() => nextNav()}>
                        <h1 className="resultsHeadText">Next</h1>
                        {isMd && <h2 className="resultsKey" style={{left: 'unset', right: '22.5px'}}>D</h2>}
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
    const { entries } = useLocation().state;
    const location = useLocation();

    const [tourney, setTourney] = useState<teamResultsInterface[]>([]);
    const [response, logResponse] = useState<number>(400);
    const [loading, setLoading] = useState(true);

    const [nextObj, setNext] = useState<[string, number]>(['', -1])
    const [prevObj, setPrev] = useState<[string, number]>(['', -1])

    let male: boolean = false;
    let genderNumber = 1;
    if (gender == 'mens') { male = true; genderNumber = 0 }



    useEffect(() => {
        const load = async () => {
            const data = await getData(gender, id);
            setTourney(data.dataJSON);
            logResponse(data.response);
            const { next, prev, nextIdx, prevIdx } = getNextAndLast(+idx!, entries, genderNumber);
            setNext([next, nextIdx]);
            setPrev([prev, prevIdx]);
        }
        setLoading(true);
        load();
        setLoading(false);
        console.log("REROUTE")
    }, [location.pathname])


    return (
        <div className='resultsPage'>
            {response == 200 && !loading && <ResultsTable {...{
                male: male, name: id!, results: tourney,
                nextAndLast: <NextAndLastButtons {...{ entries: entries, idx: +idx!, male: male, next: nextObj, prev: prevObj }} />
            }} />}
            {response >= 400 && <Loading text={"Loading"} />}
            {response == 200 && loading && <Loading text={"Loading"} />}
        </div>
    )
}

export default Results;

