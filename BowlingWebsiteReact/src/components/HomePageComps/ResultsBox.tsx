import { useState } from "react";
import { useNavigate, Link } from 'react-router';

async function getTourney() {
    const data = await fetch('/api/home/tournaments')
}

function ResultsBoxSelection(props: { gender: number, name: string }) {
    const navigate = useNavigate()
    return (
        <div className='resultsBox selection' style={{ position: 'absolute', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {props.gender == 0 && <Link to='/'><h1>Men</h1></Link>}
            {props.gender == 1 && <Link to='/'><h1>Women</h1></Link>}
            {props.gender == 2 && <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '80%' }}>
                <Link to='/roster/mens'><h1>Men</h1></Link>
                <Link to='/roster/womens'><h1>Women</h1></Link>
            </div>}
        </div>
    )
}

function ResultsBox({ name }) {
    function stateMachine() {
        return isHovering ? 'gallerySquare resultsBox hovered' : 'gallerySquare resultsBox';
    }
    const [isHovering, setIsHovering] = useState(false);

    return (

        <div onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)} className={stateMachine()} style={{ position: 'relative', color: 'white', textAlign: 'center' }}>
            <h1 className='resultsBoxText'>{name}</h1>
            {isHovering && <ResultsBoxSelection {...{ gender: 2, name: name }} />}
        </div>
    )
}

export default ResultsBox