import HomeGallery from "./HomeGallery";
import InstaFeed from "./InstaFeed";
import { Modal } from "react-bootstrap";
import DivisionTitle from "./DivisionTitle";
import MainImage from "./HomePageComps/MainImage";
import NextTourney from "./HomePageComps/NextTourney";

function HomePage() {
    return (
        <div>
            <div style={{position: 'absolute'}}>
            {/* <DivisionTitle title={'Next Competition: Placeholder Tournament @ Place, WI on ##/##'} red={false}/> */}
            <NextTourney />
            </div>
            <MainImage />
            <h3>Next Competition: Placeholder Tournament @ Place, WI on ##/##</h3>
            <DivisionTitle title={"EVENTS"} red={true}/>
            <HomeGallery />
            <DivisionTitle title={"SOCIALS"} red={true}/>
            <InstaFeed />
        </div>
    );
}

export default HomePage;