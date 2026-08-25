import { Routes, Route, Link, ScrollRestoration } from 'react-router';
import { useParams } from 'react-router';
import { useContext, createContext, useState } from 'react';
import NavigationBar from "./components/NavigationComps/NavigationBar";
import HomePage from "./components/HomePage";
import Roster from "./components/RosterComps/Roster";
import Schedule from './components/ScheduleComps/Schedule';
// import './css/global.css';
import './css/global.scss'
import PlayerDetailed from './components/PlayerDetailedComps/PlayerDetailed';
import Gallery from './components/GalleryComps/Gallery';
import Results from './components/ResultsDisplayComps/Results';
import { ResultsProvider } from './components/ResultsDataContext';

function App() {
  return (<div>
    <NavigationBar />
    <ResultsProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/roster/:gender" element={<Roster />} />
      <Route path="/detailed/:gender/:id" element={<PlayerDetailed />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/results/:gender/:id/:idx" element={<Results />} />
    </Routes>
    </ResultsProvider>
    <ScrollRestoration />
  </div>
  )
}

export default App;