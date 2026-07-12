import { Link } from 'react-router'
import LinkButton from './LinkButton';
import RosterButton from '../NavigationComps/RosterButton';
interface destination {
    url: string;
    name: string;
    style: React.CSSProperties;
}

const links: destination[] = [
    // {url: "/", name: "Home"},
    {url: "/roster/mens", name: "Roster", style: {}},
    {url: "/", name: "Results", style: {}},
    {url: "/", name: "Schedule", style: {borderRadius: "0px 0px 20px 20px"}}
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