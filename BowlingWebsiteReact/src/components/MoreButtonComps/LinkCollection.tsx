import { Link } from 'react-router'
import LinkButton from './LinkButton';
import RosterButton from '../NavigationComps/RosterButton';
interface destination {
    url: string;
    name: string;
}

const links: destination[] = [
    // {url: "/", name: "Home"},
    {url: "/roster/mens", name: "Roster"},
    {url: "/", name: "Results"},
    {url: "/", name: "Schedule"}
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