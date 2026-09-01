import { useNavigate, useParams } from "react-router";
import type { player } from "../../../Interfaces/player";
import RosterLeftImg from "../../RosterComps/RosterLeftImg";
function RosterEntrySmall(props: player) {
    const navigate = useNavigate();
    const { gender, id } = useParams();

    function alreadyAtLink(name: string) {
        if (id === name) { return true; }
        return false;
    }

    const handleClick = () => {
        if (!alreadyAtLink(props.name)) {
            navigate(`/detailed/${gender}/${props.name}`, { replace: true, preventScrollReset: true })
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            if (!alreadyAtLink(props.name)) {
                navigate(`/detailed/${gender}/${props.name}`, { replace: true, preventScrollReset: true })
            }
        }
    }

    return (
        <div tabIndex={0} className='rosterEntrySmall' id={alreadyAtLink(props.name) ? 'inactiveButton' : 'isActiveButton'} onClick={handleClick} onKeyDown={handleKeyDown}>
            <RosterLeftImg {...props} />
            <h3>{props.name}</h3>
        </div>
    )
}

export default RosterEntrySmall;

