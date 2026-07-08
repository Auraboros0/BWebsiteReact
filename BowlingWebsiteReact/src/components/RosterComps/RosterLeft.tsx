
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
        <div className="rosterMobileText">
            {/* <div className="divForPositioning"> */}
                <h2 className="playerInfo" style={{ width: "100%"}}>
                    <div className="d-none d-sm-block">{props.height}</div>
                    {props.name}</h2>
            {/* </div> */}
        </div>
    )
}

export default RosterLeft;