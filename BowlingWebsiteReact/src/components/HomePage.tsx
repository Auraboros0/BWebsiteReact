import HomeGallery from "./HomeGallery";
import InstaFeed from "./InstaFeed";
import { Modal } from "react-bootstrap";
import DivisionTitle from "./DivisionTitle";
import MainImage from "./HomePageComps/MainImage";
import NextTourney from "./HomePageComps/NextTourney";
import useConditionalRender from "../dataScripts/useConditionalRender";
import SocialsHeader from "./HomePageComps/SocialsHeader";
import GenderedAbout from "./HomePageComps/GenderedAbout";
/* The Home Page */
// async function getPosts() {
//     const data = await fetch('/api/instagram/posts');
//     const toReturn = await data.json()
//     return toReturn;
// }

function HomePage() {
    // console.log(getPosts());
    const { isMd } = useConditionalRender();
    const expositionOne: string = "Our team is a member of the Great Lakes Bowling Conference (GLBC), which holds tournaments\
    in Northern Illinois, The Twin Cities Region of Minnesota and all throughout Wisconsin! The GLBC holds four tournaments a season\
    where we painstakingly grind our way up a leaderboard and attempt to make our way into the bracket at the end of the year.\
    We also bowl a few extra tournaments each season, details of which can be found in the Schedule tab."

    const expositionTwo: string = "The team consists of a Mens and Womens team, both of which compete in many of the same tournaments\
    in separate brackets. Both teams practice weekly @ Sett Recreation (Located in the basement of Union South) and all team members are granted\
    free equipment storage. If you're interested in joining the team, please reach out via Instagram DM or Facebook message."
    const expositionThree: string= ""
    return (
        <div style={{width: '100%'}}>
            <div style={{position: 'absolute'}}>
            {/* <DivisionTitle title={'Next Competition: Placeholder Tournament @ Place, WI on ##/##'} red={false}/> */}
            {isMd && <NextTourney />}
            </div>
            <MainImage />
            {!isMd && <NextTourney />}
            {/* <h3>Next Competition: Placeholder Tournament @ Place, WI on ##/##</h3> */}
            <DivisionTitle title={"ABOUT"} red={true}/>
            <GenderedAbout male={true} text={expositionOne} />
            <GenderedAbout male={false} text={expositionTwo} />
            <DivisionTitle title={"EVENTS"} red={true}/>
            <HomeGallery />
            <SocialsHeader />
            <InstaFeed />
        </div>
    );
}

export default HomePage;