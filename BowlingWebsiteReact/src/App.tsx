import { Routes, Route, Link } from 'react-router';
import { useParams } from 'react-router';
import NavigationBar from "./components/NavigationComps/NavigationBar";
import HomePage from "./components/HomePage";
import Roster from "./components/RosterComps/Roster";
import Schedule from './components/ScheduleComps/Schedule';
// import './css/global.css';
import './css/global.scss'
import PlayerDetailed from './components/PlayerDetailedComps/PlayerDetailed';

function App() {
  return (<div>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/roster/:gender" element={<Roster />} />
      <Route path="/detailed/:gender/:id" element={<PlayerDetailed />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  </div>
  )
}

export default App;