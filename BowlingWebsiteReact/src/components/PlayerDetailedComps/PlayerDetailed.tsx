import { useNavigate, useParams } from "react-router";
import type { player } from '../../Interfaces/player'
import useConditionalRender from "../../dataScripts/useConditionalRender";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import mensData from "../../data/mensData.json";
import womensData from "../../data/womensData.json";
import RosterEntryMain from "./RosterEntryComps/RosterEntryMain";
import BigPlayerImage from "./BigPlayerImage";
import PlayerStats from "./PlayerStats";
import MobileSelector from "./MobileComps/MobileSelector";
import PlayerList from "./PlayerList";
import '../../css/roster.scss';

let rightSideHeight = 0;

export default function PlayerDetailed() {
    const { gender, id } = useParams();
    const { isMd } = useConditionalRender();
    const navigate = useNavigate();
    const rightRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    let data;
    if (gender === 'mens') { data = mensData }
    else { data = womensData }


    useLayoutEffect(() => {
        if (leftRef.current && rightRef.current) {
            const resize = () => {
                leftRef.current!.style.height = `${rightRef.current!.offsetHeight}px`;
                leftRef.current!.style.display = 'flex';
            }

            resize();
            const observer = new ResizeObserver(resize);
            observer.observe(rightRef.current);
            return () => { observer.disconnect() }
        }
    }, [])

    const target: player = data.find(player => player.name === id)!;
    return (
        <div>
            <div style={{top: 0}}>
            {!isMd && <MobileSelector />}
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
                {/* {isMd && */}
                    <div ref={leftRef} className="d-none d-md-flex" style={{ height: '0px' }}>
                        <PlayerList />
                    </div>
                {/* } */}
                <div ref={rightRef} className="playerDetailed" style={{ width: "100%" }}>
                    <BigPlayerImage name={target.name} />
                    {/* <RosterEntry {...target} /> */}
                    <RosterEntryMain {...target} />
                    {/* <PlayerStats name={target.name} /> */}
                </div>
            </div>
        </div>
    )
}
