import type { player } from '../../Interfaces/player'
import { useParams } from 'react-router';
import mensData from '../../data/mensData.json';
import womensData from '../../data/womensData.json';
import MaleOrFemale from '../NavigationComps/MaleOrFemale';
import RosterEntry from './RosterEntry';
import RosterMobileIMG from './RosterMobileIMG';
import '../../css/roster.scss';

export default function Roster() {
    const { gender } = useParams()
    let data;
    if (gender === 'mens') { data = mensData }
    else { data = womensData }
    return (
        <div>
            <div className="d-md-none">
                <div className='innerFlexbox' style={{
                    justifyContent: "flex-start",
                    borderRadius: '20px 20px 0 0'
                }}>
                    <MaleOrFemale />
                </div>
                <RosterMobileIMG gender={gender} />
            </div>
            <div className="rosterBG">
                {data.map((item: player) => {
                    return (
                        <div>
                            <RosterEntry {...item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// export default Roster;