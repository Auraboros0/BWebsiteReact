import HomeGallery from "./HomeGallery";
import InstaFeed from "./InstaFeed";
import { Modal } from "react-bootstrap";
import DivisionTitle from "./DivisionTitle";
import MainImage from "./HomePageComps/MainImage";
import NextTourney from "./HomePageComps/NextTourney";
import useConditionalRender from "../Scripts/useConditionalRender";
import Credit from "./HomePageComps/Credit";
import SocialsHeader from "./HomePageComps/SocialsHeader";
import GenderedAbout from "./HomePageComps/GenderedAbout";
import SFImageCopy from "./UniversalUIComps/SFImageCopy";
import ResultsBoxContainer from "./ResultsDisplayComps/ResultsBoxContainer";
/* The Home Page */
// async function getPosts() {
//     const data = await fetch('/api/instagram/posts');
//     const toReturn = await data.json()
//     return toReturn;
// }

function HomePage() {
    // console.log(getPosts());
    const { isMd } = useConditionalRender();
    const expositionOne: string = "Our team competes intercollegiately in the Great Lakes Bowling Conference (GLBC), which holds tournaments\
    in Northern Illinois, The Twin Cities Region of Minnesota and all throughout Wisconsin! The GLBC holds four tournaments a season\
    where we painstakingly grind our way up a leaderboard and attempt to make our way into the bracket at the end of the year.\
    We also bowl a few extra tournaments each season, details of which can be found in the Schedule tab."

    const expositionTwo: string = "Both men's and women's teams practice weekly @ Sett Recreation (Located in the basement of Union South) and all team members are granted\
    free equipment storage.\n If you're interested in joining the team, feel free to reach out via Instagram DM or Facebook message."

    const expositionOneMobile: string= "The UW-Madison Bowling Team is an intercollegiate team that travels to compete against other schools\
    in two day weekend tournaments.\n We primarily compete within the Great Lakes Bowling Conference, a collection of university teams from WI, IL, IA & MN\
    though we also participate in various non-conference tournaments each season"
    return (
        <div style={{width: 'calc(100% + 16px)', marginLeft: '-8px', overflowX: 'clip'}}>
            <div style={{position: 'absolute'}}>
            {/* <DivisionTitle title={'Next Competition: Placeholder Tournament @ Place, WI on ##/##'} red={false}/> */}
            {/* {isMd && <NextTourney />} */}
            </div>
            <MainImage />
            {/* {!isMd && <NextTourney />} */}
            {/* <h3>Next Competition: Placeholder Tournament @ Place, WI on ##/##</h3> */}
            <div className='aboutHeader'>ABOUT</div>
            <GenderedAbout male={true} text={expositionOneMobile} />
            <GenderedAbout male={false} text={expositionTwo} />
            <ResultsBoxContainer />
            <InstaFeed />
            <Credit />
        </div>
    );
}

export default HomePage;