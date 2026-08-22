import { useEffect, useState, useRef } from "react"
import { scroll } from "../../Scripts/scroll"
import type { animatedBarRef } from "../DivisionTitle"
import DivisionTitle from "../DivisionTitle"
import HomeGallery from "../HomeGallery"
import SocialsHeader from "./SocialsHeader"
import useConditionalRender from "../../Scripts/useConditionalRender"
import Loading from "../PlayerDetailedComps/RosterEntryComps/Loading"
async function getTournamentNames() {
    const data = await fetch("/api/home/tournamentnames");
    const dataJSON = await data.json();
    const response = await data.status;
    const mData = dataJSON.MensTList;
    const wData = dataJSON.WomensTList;
    return { mData, wData, response };
}

function ResultsBoxContainer() {
    const [tournamentNames, setTournamentNames] = useState<[string[], string[]]>([[], []]);
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
        let count = 0;
        const getData = async () => {
                const data = await getTournamentNames();
                const mData = await data.mData;
                const wData = await data.wData;
                const res = await data.response
                setTournamentNames([mData, wData]);
                setResStatus(res)
            }
        const interval = setInterval(() => {
            try {
                getData();
                clearInterval(interval);
            }
            catch {
                count += 1;
                if (count >= 5) {clearInterval(interval)}
            }
        }, 5000)
    }, [])
    return (
        <div onMouseEnter={() => { startScroll() }} onMouseLeave={() => { endScroll() }}>
            <DivisionTitle title={"RESULTS"} red={true} filename={"stateAccent.png"} ref={topRef} />

            {resStatus == 200 && <HomeGallery {...{ list: tournamentNames[0] }} />}

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