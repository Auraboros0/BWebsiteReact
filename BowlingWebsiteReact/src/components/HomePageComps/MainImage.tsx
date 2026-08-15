import { Next } from "react-bootstrap/esm/PageItem"
import NextTourney from "./NextTourney"
function MainImage() {
    return (
        <div className='mainImage' style={{position: 'relative', width: 'calc(100% + 16px)', marginLeft: '-8px', zIndex: '-1', overflowX: 'clip', overflowY: 'visible'}}>
            <img src='/public/assets/Textures/grunge.jpg' />
            <div className='scrollingResults'>
                {/* // This section will display high game and series of the most recent competition, scrolling */}
                <h1>SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT</h1>
            </div>
        </div>
    )
}

export default MainImage