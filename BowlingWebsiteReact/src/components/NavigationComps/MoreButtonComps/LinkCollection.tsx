import { Link } from 'react-router'
import LinkButton from './LinkButton';
import RosterButton from '../RosterButton';
interface destination {
    url: string;
    name: string;
    style: React.CSSProperties;
}

const links: destination[] = [
    {url: "/", name: "Home", style: {}},
    {url: "/roster/mens", name: "Roster", style: {}},
    {url: "/", name: "Gallery", style: {}},
    {url: "/schedule", name: "Schedule", style: {borderRadius: "0px 0px 20px 20px"}}
]
function LinkCollection() {
    return (
        <div className="dropDownNav" style={{textAlign: "center"}}>
        {links.map((item: destination) => {
            return (
                <LinkButton {...item} />
            )
        })}
        </div>
    )
}

export default LinkCollection;