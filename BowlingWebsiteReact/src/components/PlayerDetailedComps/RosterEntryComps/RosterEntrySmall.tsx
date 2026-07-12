import type { player } from "../../../Interfaces/player";
import RosterLeftImg from "../../RosterComps/RosterLeftImg";
function RosterEntrySmall(props: player) {
    return (
        <div className='rosterEntrySmall'>
            <RosterLeftImg {...props}/>
            <h3>{props.name}</h3>
        </div>
    )
}

export default RosterEntrySmall;

