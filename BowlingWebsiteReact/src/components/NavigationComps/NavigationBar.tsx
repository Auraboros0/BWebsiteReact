import { Link } from 'react-router'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import WholeMoreButton from './MoreButtonComps/WholeMoreButton';
import BackgroundStripe from '../BackgroundStripe';
import RosterButton from './RosterButton';
import NavLogo from './NavLogo';
import '../../css/navigation.scss'
import RosterButtonRedo from './RosterButtonRedo';
function NavigationBar() {
    const BGPath = '/public/assets/Textures/badger.png'
    const navigate = useNavigate()
    const [rosterActive, setRosterActive] = useState(false);
    const collapse = () => {
        setRosterActive(!rosterActive);
    }

    return (
    <div className = "navContainer d-relative d-md-overflow-x hidden" style={{zIndex: "100", width: '100%'}}>
    <BackgroundStripe url={BGPath}/>
    <div className="navigationFlexbox" style={{}}>
        <div className="sideLogo" onClick={() => navigate('/')}>
            <h2 className="d-none d-md-block">BADGER BOWLING</h2>
            <h2 className="d-md-none">UW BOWLING</h2>
            {/* <NavLogo /> */}
        </div>

        <div className="innerFlexbox">
            <div className="d-none d-md-flex">
                    <Link to="/" tabIndex={-1}><button onClick={(e) => e.currentTarget.blur()}><h2>Home</h2></button></Link>
                    {/* <Link to="/roster"><button><h2>Roster</h2></button></Link> */}
                    <Link to="/gallery" tabIndex={-1}><button onClick={(e) => e.currentTarget.blur()}><h2>Gallery</h2></button></Link>
                    <Link to="/schedule" tabIndex={-1}><button onClick={(e) => e.currentTarget.blur()}><h2>Schedule</h2></button></Link>
                    <RosterButtonRedo />
            </div>
            <div className="d-md-none" style={{ position: "absolute", top: "0px"}}>
                <WholeMoreButton />
            </div>
        </div>
        </div>
    </div>);
}

export default NavigationBar;