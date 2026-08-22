import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import { useParams } from 'react-router'
import App from './App.tsx'
import HomePage from './components/HomePage.tsx'
import Roster from './components/RosterComps/Roster.tsx'
import PlayerDetailed from './components/PlayerDetailedComps/PlayerDetailed.tsx'
import Schedule from './components/ScheduleComps/Schedule.tsx'
import Gallery from './components/GalleryComps/Gallery.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "", element: <HomePage />},
      {path: "roster/:gender", element: <Roster />},
      {path: "detailed/:gender/:id", element: <PlayerDetailed />},
      {path: "schedule", element: <Schedule />},
      {path: "gallery", element: <Gallery />}
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
