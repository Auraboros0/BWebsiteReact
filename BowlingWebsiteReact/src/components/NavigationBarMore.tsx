import { Link } from 'react-router'
import Accordion from 'react-bootstrap/Accordion'
function NavigationBarMore() {
  return (
    <div>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>MORE</Accordion.Header>
        <Accordion.Body>
          <div className="innerFlexbox">
            <nav>
            <Link to="/"><button><h2>Home</h2></button></Link>
            <Link to="/roster"><button><h2>Roster</h2></button></Link>
            <Link to="/results"><button><h2>Results</h2></button></Link>
            <Link to="/schedule"><button><h2>Schedule</h2></button></Link>
            </nav>
        </div>
          {/* TEXTETXTETXT */}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );

}

export default NavigationBarMore;