import type { tournament } from "../../Interfaces/tournament"
import HostLogo from "./EventSimpleComps/HostLogo"
import InfoBlock from "./EventSimpleComps/InfoBlock"
import BigState from "./EventSimpleComps/BigState";
function EventSimple(props: tournament) {
    const startMonth = props.time[0].getMonth();
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth();
    const endDay = props.time[1].getDate();
    const state = props.city[0][1];
    const stateURL = `/public/assets/States/${state}.png`
    return (
        <div className='eventSimple'>
            <h2 style={{textAlign: 'center', backgroundColor: 'white', position:"relative", zIndex: '2'}}>{props.name} {startMonth}/{startDay} - {endMonth}/{endDay}</h2>
            <div style={{display: 'flex'}}>
                <HostLogo hostID={props.hostID} />
                <InfoBlock {...props} />
            </div>
            <BigState state={props.city[0][1]} />
        </div>
    )
}

export default EventSimple;