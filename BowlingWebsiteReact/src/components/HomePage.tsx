import HomeGallery from "./HomeGallery";
import InstaFeed from "./InstaFeed";
import { Modal } from "react-bootstrap";
import DivisionTitle from "./DivisionTitle";
import MainImage from "./HomePageComps/MainImage";
import NextTourney from "./HomePageComps/NextTourney";
import useConditionalRender from "../dataScripts/useConditionalRender";
import SocialsHeader from "./HomePageComps/SocialsHeader";

function HomePage() {
    const { isMd } = useConditionalRender();
    return (
        <div>
            <div style={{position: 'absolute'}}>
            {/* <DivisionTitle title={'Next Competition: Placeholder Tournament @ Place, WI on ##/##'} red={false}/> */}
            {isMd && <NextTourney />}
            </div>
            <MainImage />
            {!isMd && <NextTourney />}
            {/* <h3>Next Competition: Placeholder Tournament @ Place, WI on ##/##</h3> */}
            <DivisionTitle title={"EVENTS"} red={true}/>
            <HomeGallery />
            <SocialsHeader />
            <InstaFeed />
        </div>
    );
}

export default HomePage;