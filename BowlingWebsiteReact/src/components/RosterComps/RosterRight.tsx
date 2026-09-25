interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

function RosterRight(props: player) {
    return (
        <h2 className="rosterMobileTextRight"><br className="d-none d-md-block"/>{props.year} / {props.major} / <span style={{whiteSpace: 'nowrap'}}>{props.hometown}</span></h2>
    )
}

export default RosterRight