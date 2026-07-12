import { useParams } from "react-router";
import { useRef } from "react";
import type { player } from "../../Interfaces/player";
import RosterEntrySmall from "./RosterEntryComps/RosterEntrySmall";
import mData from '../../data/mensData.json'
import wData from '../../data/womensData.json'
// import '../../css/infinite_scroll.scss'

function PlayerList() {
    const { gender, id } = useParams();
    let data;
    if (gender === 'mens') {data = mData}
    else {data = wData}

    function jump() {

    }

    return (
        <div className='detailedRosterView scrollContainer' style={{}}>
            <div className='scrollTrack'>
            {data.map((item: player) => {
                return (
                    <RosterEntrySmall {...item} />
                )
            })}
            {data.map((item: player) => {
                return (
                    <RosterEntrySmall {...item} />
                )
            })}
            </div>
        </div>
    )
}

export default PlayerList