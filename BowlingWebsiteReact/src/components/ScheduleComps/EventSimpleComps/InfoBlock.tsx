import type { tournament } from "../../../Interfaces/tournament"
function InfoBlock(props: tournament) {
    let sameCity: boolean = false;
    const startMonth = props.time[0].getMonth();
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth();
    const endDay = props.time[1].getDate();

    if (props.gender == 2) {
        if (props.city[0] === props.city[1]) {sameCity = true;}
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>M: {props.center[0]} / F: {props.center[1]}</h2>
                {sameCity ? <h2>{props.city[0][0]}, {props.city[0][1]}</h2> : <h2>{props.city[0][0]}, {props.city[0][1]} / {props.city[1][0]}, {props.city[1][1]}</h2>}
                <h3>{startMonth}/{startDay} - {endMonth}/{endDay}</h3>
            </div>
        )
    }
}

export default InfoBlock