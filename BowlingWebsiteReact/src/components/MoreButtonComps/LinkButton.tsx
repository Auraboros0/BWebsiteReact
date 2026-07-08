import { Link } from 'react-router'
interface destination {
    url: string;
    name: string;
}
function LinkButton(props: destination) {
    return (
        <div className="linkButton">
            <Link to={props.url}><button className="dropDownItem"><h2>{props.name}</h2></button></Link>
        </div>
    )
}

export default LinkButton;