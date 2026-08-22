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

/* Takes a player prop and creates an entry from it */
export default function RosterEntry(props: player) {
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
        <div>
            {/* <div style={{height: '30px', backgroundImage: "url(/public/assets/Textures/roof.jpg)", backgroundSize: '50% auto', width: '80vw', borderBottom: '8px solid #ffffff'}}></div> */}
            <div className="rosterEntry" onClick={handleClick} style={{cursor: alreadyAtLink(props.name) ? '' : 'pointer'}}>
                {/* <div className="d-block d-sm-flex"> */}
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "99%"}}>
                    <RosterLeftImg {...props} />
                    <div className="rosterTextBox " style={{width: "100%"}}>
                        <RosterLeft {...props} />
                        <RosterRight {...props} />
                    </div>
                </div>
                <div className="triangle"></div>
            </div>

            {/* </div> */}
        </div>
    )
}

// export default RosterEntry;