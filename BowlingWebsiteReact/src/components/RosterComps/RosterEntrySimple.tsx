import { useNavigate, useParams } from "react-router";
import RosterLeft from "./RosterLeft";
import RosterLeftImg from "./RosterLeftImg";
import RosterRight from "./RosterRight";
interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

export default function RosterEntrySimple(props: player) {
    const navigate = useNavigate();
    const { gender, id } = useParams();

    function alreadyAtLink(name: string) {
        console.log(id)
        if (id === name) { return true;}
        return false;
    }

    const handleClick = () => {
        if (!alreadyAtLink(props.name)) {
            navigate(`/detailed/${gender}/${props.name}`)
        }
    }

    return (
        <div style={{width: "inherit"}}>
            <div className="rosterEntry" onClick={handleClick} style={{cursor: alreadyAtLink(props.name) ? '' : 'pointer', width: "90%", marginBottom: "4px"}}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                    <RosterLeftImg {...props} />
                    <div className="rosterTextBox " style={{}}>
                        <h2 className="playerInfo" style={{}}>
                            ${props.name}
                        </h2>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </div>
    )
}

// export default RosterEntry;