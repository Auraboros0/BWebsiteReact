import type { tournament } from "../../../Interfaces/tournament"
import useConditionalRender from "../../../Scripts/useConditionalRender";
/* The information about a tournament. Takes a tournament object and checks what teams are competing
   and displays the information accordinly */
function InfoBlock(props: tournament) {
    let sameCity: boolean = false;
    let sameCenter: boolean = false;
    const startMonth = props.time[0].getMonth() + 1;
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth() + 1;
    const endDay = props.time[1].getDate();
    const { isMd } = useConditionalRender();
    let male: boolean = false;

    if (props.city.length > 1) { // If both teams are competing
        if (props.city[0].city === props.city[1].city) {sameCity = true;}
        if (props.center[0] === props.center[1]) { sameCenter = true}
    }

    if (props.gender != 2) {
        if (props.gender == 0) { male = true}
        if (props.gender == 1) { male = false}
    }

    if (props.gender == 2) {
        return (
            <div className='infoBlock' style={{ display: 'flex', flexDirection: 'column', gap: '35px'}}>
                {sameCenter ? <h2>{props.center[0]}</h2> : <h2>M: {props.center[0]} / F: {props.center[1]}</h2>}
                {sameCity ? <h2>{props.city[0].city}, {props.city[0].state}</h2> : <h2>{props.city[0].city}, {props.city[0].state} / {props.city[1].city}, {props.city[1].state}</h2>}
                {isMd && <h3>{startMonth}/{startDay} - {endMonth}/{endDay}</h3>}
            </div>
        )
    } else {
        return (
            <div className='infoBlock' style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                <h2>{props.center[0]}</h2>
                <h2>{props.city[0].city}, {props.city[0].state}</h2>
                {isMd && <h3>{startMonth}/{startDay} - {endMonth}/{endDay}</h3>}
            </div>
        )
    }
}

export default InfoBlock