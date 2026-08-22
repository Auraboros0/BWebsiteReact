import { useNavigate, useParams } from "react-router";
import type { player } from '../../Interfaces/player'
import useConditionalRender from "../../Scripts/useConditionalRender";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import mensData from "../../data/mensData.json";
import womensData from "../../data/womensData.json";
import RosterEntryMain from "./RosterEntryComps/RosterEntryMain";
import BigPlayerImage from "./BigPlayerImage";
import PlayerStats from "./PlayerStats";
import MobileSelector from "./MobileComps/MobileSelector";
import PlayerList from "./PlayerList";
import '../../css/roster.scss';
import REMTopBar from "./RosterEntryComps/REMTopBar";

let rightSideHeight = 0;

async function getInfo(gender: string, id: string) {
    const data = await fetch(`/api/detailed/${gender}/${id}`);
    const toReturn = await data.json();
    console.log(toReturn);
    return toReturn;
}

export default function PlayerDetailed() {
    const { gender, id } = useParams();
    const { isMd } = useConditionalRender();
    const [playerData, setPlayerData] = useState(null);
    const navigate = useNavigate();
    const rightRef = useRef<HTMLDivElement>(null);
    const oneRef = useRef<HTMLDivElement>(null);
    const twoRef = useRef<HTMLDivElement>(null);

    const leftRef = useRef<HTMLDivElement>(null);

    let data;
    if (gender === 'mens') { data = mensData }
    else { data = womensData }

    useLayoutEffect(() => {
        if (leftRef.current && rightRef.current && isMd) {
            const resize = () => {
                const rightHeight = oneRef.current!.offsetHeight + twoRef.current!.offsetHeight - 5;
                // leftRef.current!.style.height = `${rightRef.current!.clientHeight}px`;
                leftRef.current!.style.height = `${rightHeight}px`;
                leftRef.current!.style.display = 'flex';
                console.log("CHANGE")
            }
            resize();
            window.addEventListener("resize", resize);
            return () => {window.removeEventListener("resize", resize)}
        }
    }, [])

    const target: player = data.find(player => player.name === id)!;
    return (
        <div style={{ overflowY: isMd ? 'hidden' : 'visible' }}>
            <div style={{ top: 0 }}>
                {!isMd && <MobileSelector />}
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
                {isMd && <div ref={leftRef} className="" style={{ height: '0px' }}>
                    <PlayerList />
                </div>}
                <div ref={rightRef} className="playerDetailed" style={{ width: "100%", backgroundColor: 'black' }}>
                    <div ref={oneRef}><BigPlayerImage name={target.name} /></div>
                    <div ref={twoRef}><RosterEntryMain {...target} /></div>
                    {!isMd && <REMTopBar />}
                    {/* <PlayerStats name={target.name} /> */}
                </div>
            </div>
        </div>
    )
}
