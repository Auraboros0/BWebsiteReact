import type { tournament } from "../../../Interfaces/tournament"

/*
Will come in the form of a footnote on the top right corner of each entry.
Kinda ribbon shaped.
*/
function MonthAndDay(props: tournament) {
    const startMonth = props.time[0].getMonth() + 1;
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth() + 1;
    const endDay = props.time[1].getDate();
    return (
        <div style={{position: 'absolute'}}>
            <h2>{startMonth}/{startDay} - </h2>
            <h2>{endMonth}/{endDay}</h2>
        </div>
    )
}

export default MonthAndDay