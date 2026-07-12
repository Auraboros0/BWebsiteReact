import { useParams } from "react-router";
import type { player }  from '../../Interfaces/player'
import mensData from "../../data/mensData.json";
import womensData from "../../data/womensData.json";
import HomeGallery from "../HomeGallery";
import RosterEntry from "../RosterComps/RosterEntry";
import RosterEntryMain from "./RosterEntryComps/RosterEntryMain";
import BigPlayerImage from "./BigPlayerImage";
import PlayerStats from "./PlayerStats";
import PlayerList from "./PlayerList";
import '../../css/roster.scss';

export default function PlayerDetailed() {
    const { gender, id } = useParams();
    let data;
    if (gender === 'mens') {data = mensData}
    else {data = womensData}
    
    const target: player = data.find(player => player.name === id)!;
    return (
        <div style={{display: "flex"}}>
        <div className="playerList d-none d-md-flex">
        <PlayerList />
        </div>
        <div className="playerDetailed" style={{margin: "4px", width: "100%"}}>
            <BigPlayerImage name={target.name} />
            {/* <RosterEntry {...target} /> */}
            <RosterEntryMain {...target} />
            <PlayerStats name={target.name} />
        </div>
        </div>
    )
}
