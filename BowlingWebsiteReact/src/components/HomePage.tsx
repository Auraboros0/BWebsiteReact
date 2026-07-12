import HomeGallery from "./HomeGallery";
import InstaFeed from "./InstaFeed";
import { Modal } from "react-bootstrap";

function HomePage() {
    return (
        <div>
            <h3>Next Competition: Placeholder Tournament @ Place, WI on ##/##</h3>
            <div className="headerDivision"><h2>EVENTS</h2></div>
            <HomeGallery />
            <div className="headerDivision"><h2>SOCIALS</h2></div>
            <InstaFeed />
        </div>
    );
}

export default HomePage;