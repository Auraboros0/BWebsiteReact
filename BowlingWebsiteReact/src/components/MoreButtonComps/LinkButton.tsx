import { Link } from 'react-router'
interface destination {
    url: string;
    name: string;
    style: React.CSSProperties;
}
function LinkButton(props: destination) {
    return (
        <div className="linkButton" style={props.style}>
            <Link to={props.url}><button className="dropDownItem"><h2>{props.name}</h2></button></Link>
        </div>
    )
}

export default LinkButton;