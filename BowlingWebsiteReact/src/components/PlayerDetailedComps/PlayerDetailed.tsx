import { useParams } from "react-router";
import type { player }  from '../../Interfaces/player'
import { useLayoutEffect, useRef } from "react";
import mensData from "../../data/mensData.json";
import womensData from "../../data/womensData.json";
import HomeGallery from "../HomeGallery";
import RosterEntry from "../RosterComps/RosterEntry";
import RosterEntryMain from "./RosterEntryComps/RosterEntryMain";
import BigPlayerImage from "./BigPlayerImage";
import PlayerStats from "./PlayerStats";
import PlayerList from "./PlayerList";
import '../../css/roster.scss';

let rightSideHeight = 0;

export default function PlayerDetailed() {
    const { gender, id } = useParams();
    const rightRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);

    let data;
    if (gender === 'mens') {data = mensData}
    else {data = womensData}

    useLayoutEffect(() => {
        if (leftRef.current && rightRef.current ) {
            leftRef.current.style.height = `${rightRef.current.offsetHeight}px`;
            leftRef.current.style.display = 'block';
        }
    }, [])
    
    const target: player = data.find(player => player.name === id)!;
    return (
        <div style={{display: "flex"}}>
        <div ref={leftRef} className="d-none d-md-flex" style={{height: '0px'}}>
        <PlayerList />
        </div>
        <div ref={rightRef} className="playerDetailed" style={{margin: "4px", width: "100%"}}>
            <BigPlayerImage name={target.name} />
            {/* <RosterEntry {...target} /> */}
            <RosterEntryMain {...target} />
            <PlayerStats name={target.name} />
        </div>
        </div>
    )
}
