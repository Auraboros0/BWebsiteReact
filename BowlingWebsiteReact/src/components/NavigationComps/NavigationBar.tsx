import { Link } from 'react-router'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import WholeMoreButton from '../MoreButtonComps/WholeMoreButton';
import BackgroundStripe from '../BackgroundStripe';
import RosterButton from './RosterButton';
import '../../css/navigation.scss'
function NavigationBar() {
    const BGPath = '/public/assets/Textures/steeltexture.jpg'
    const navigate = useNavigate()
    const [rosterActive, setRosterActive] = useState(false);
    const collapse = () => {
        setRosterActive(!rosterActive);
    }

    return (
    <div className = "d-relative d-sm-overflow-x hidden" style={{zIndex: "100"}}>
    <BackgroundStripe url={BGPath}/>
    <div className="navigationFlexbox">
        <div className="sideLogo" onClick={() => navigate('/')}>
            <h2 className="d-none d-md-block">BADGER BOWLING</h2>
            <h2 className="d-md-none">UW BOWLING</h2>
        </div>

        <div className="innerFlexbox">
            <div className="d-none d-md-block">
                <nav>
                    <Link to="/"><button><h2>Home</h2></button></Link>
                    {/* <Link to="/roster"><button><h2>Roster</h2></button></Link> */}
                    <Link to="/results"><button><h2>Results</h2></button></Link>
                    <Link to="/schedule"><button><h2>Schedule</h2></button></Link>
                    <RosterButton />
                </nav>
            </div>
            <div className="d-md-none" style={{ position: "absolute", top: "0px"}}>
                <WholeMoreButton />
            </div>
        </div>
        </div>
    </div>);
}

export default NavigationBar;