import type { tournament } from "../../../Interfaces/tournament";

function EventHeader(props: tournament) {
    const startMonth = props.time[0].getMonth() + 1;
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth() + 1;
    const endDay = props.time[1].getDate();
    let genderString: string = ''

    if (props.gender == 0) {genderString = 'Men @ '}
    if (props.gender == 1) {genderString = 'Women @ '}
    return (
        <h2 className='eventHeader' style={{textAlign: 'center', backgroundColor: 'white', position:"relative", zIndex: '2'}}>
            {genderString}{props.name} <br /> {startMonth}/{startDay} - {endMonth}/{endDay}
        </h2>
    )
}

export default EventHeader