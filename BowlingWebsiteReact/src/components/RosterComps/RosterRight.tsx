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
        <div className="rosterMobileText">
             {/* <div className="triangle"></div> */}
             <h2><br className="d-none d-md-block"/>{props.year} / {props.major} / {props.hometown}</h2>
         </div>
    )
}

export default RosterRight