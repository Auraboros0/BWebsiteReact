import { useEffect, useState, useRef } from "react"
import { scroll } from "../../Scripts/scroll"
import type { animatedBarRef } from "../DivisionTitle"
import DivisionTitle from "../DivisionTitle"
import HomeGallery from "../HomeGallery"
import SocialsHeader from "../HomePageComps/SocialsHeader"
import useConditionalRender from "../../Scripts/useConditionalRender"
import Loading from "../PlayerDetailedComps/RosterEntryComps/Loading"
import { useEntries } from "../ResultsDataContext"
async function getTournamentNames() {
    const data = await fetch("/api/home/tournamentnames");
    const dataJSON = await data.json();
    const response = await data.status;
    return { dataJSON, response };
}

/* This whole nest of components is kinda convoluted
   ResultsBoxContainer: Fetches the tournament set object. It is of type Record<string, [number, string]>
   It is used as follows: Record[tournamentName] => [genderNumber, Date]. It is passed to...
   
   HomeGallery: Takes the Record and converts it to an array of type [string,[number,string][]. Refer to this type as tournamentSetType
   This array is sorted by date and then an object array is created from it. This object is structured...
   {entry: TournamentSetType, prev: [string, string], next: [string, string]}[] 
   prev/next[0] is the name of the prev/next Mens result. prev/next[1] is the name of the prev/next Womens result.
   This array is mapped over to create multiple instances of...
   
   ResultsBox: Takes the tournamentSetType & prev/next to create a comp with a link to the Results page with parameters tournamentName & gender
   For example: <ResultsBox {...{name: GLBC II, gender: 2, prev: [GLBC I, GLBC I], next: [GLBC III, GLBC III]}} /> 
   holds links to both /results/:mens/:GLBC II and /results/:womens/:GLBC II.
   These links will render Results.tsx which will be able to access prev & next.
   
   Results: Gets parameters from URL and fetches data based on it.
   For example: If URL = '/results/mens/GLBC II' Results will fetch '/api/home/mens/GLBC II'
   Results will then display the parsed CSV for GLBC II (Men) and will have prev & next links to GLBC I (Men) & GLBC III (Men)*/

function ResultsBoxContainer() {
    const [tournamentEntries, setTournamentEntries] = useState<Record<string, [number, string]>>();
    const [resStatus, setResStatus] = useState<number>(400);
    const topRef = useRef<animatedBarRef>(null);
    const bottomRef = useRef<animatedBarRef>(null);
    const { isMd } = useConditionalRender();
    const startScroll = () => {
        topRef.current?.scrollLeft(0.7);
        bottomRef.current?.scrollRight(0.7);
    }
    const endScroll = () => {
        topRef.current?.scrollLeft(0.2);
        bottomRef.current?.scrollRight(0.2);
    }

    useEffect(() => {
        endScroll();
    }, [])
    useEffect(() => {
        let count = 0;
        const getData = async () => {
            const data = await getTournamentNames();
            const tData = await data.dataJSON;
            const res = await data.response
            setTournamentEntries(tData);
            setResStatus(res)
        }
        try {
            getData();
        }
        catch {
            const interval = setInterval(() => {
                try {
                    getData();
                    clearInterval(interval);
                }
                catch {
                    count++;
                    if (count >= 5) {
                        setResStatus(404);
                        clearInterval(interval)
                    }
                }
            }, 5000)
        }
    }, [resStatus])
    return (
        <div onMouseEnter={() => { startScroll() }} onMouseLeave={() => { endScroll() }}>
            <DivisionTitle title={"RESULTS"} red={true} filename={"stateAccent.png"} ref={topRef} />

            {resStatus == 200 && <HomeGallery {...{ list: tournamentEntries }} />}

            {resStatus == 400 && <div style={{ width: '100%', height: '200px', textAlign: 'center', backgroundColor: 'black', color: 'white', alignContent: 'center', borderBottom: '8px solid white' }}>
                <Loading text={"Awaiting Results"} />
            </div>}

            {resStatus == 404 && <div style={{ width: '100%', height: '200px', textAlign: 'center', backgroundColor: 'black', color: 'white', alignContent: 'center', borderBottom: '8px solid white' }}>
                <h1 style={{ marginTop: '0', fontFamily: 'Iosevka' }}>Results Coming Later</h1>
            </div>}

            <div className='socialsHeader' style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '100%' }}>
                    <DivisionTitle title={"SOCIALS"} red={true} filename={'stateAccent.png'} ref={bottomRef} />
                </div>
                {isMd && <div className='socialLink' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', gap: '10px' }}>
                    <a href="https://www.instagram.com/uwbowlingteam/"><h2>INSTAGRAM</h2></a>
                    <a href="https://www.facebook.com/BowlUW/"><h2>FACEBOOK</h2></a>
                </div>}
            </div>
        </div>
    )
}

export default ResultsBoxContainer