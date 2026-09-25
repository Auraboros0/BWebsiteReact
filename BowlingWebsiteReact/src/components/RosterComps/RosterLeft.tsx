
interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

function RosterLeft(props: player) {
    return (
                <h2 className="rosterMobileTextLeft" style={{}}>
                    {/* <div className="d-none d-md-block">{props.height}</div> */}
                    {props.name}</h2>
    )
}

export default RosterLeft;