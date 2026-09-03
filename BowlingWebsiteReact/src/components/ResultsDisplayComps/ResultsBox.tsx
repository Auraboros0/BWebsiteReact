import { useState } from "react";
import { useNavigate, Link } from 'react-router';

async function getTourney() {
    const data = await fetch('/api/home/tournaments')
}

function ResultsBoxSelection(props: { gender: number, name: string, idx: number, entries: [string, [number, string]][] }) {
    const navigate = useNavigate()
    const toM = `/results/mens/${props.name}/${props.idx}`;
    const toF = `/results/womens/${props.name}/${props.idx}`

    const stateM = {
        entries: props.entries
    }
    const stateF = {
        entries: props.entries
    }
    return (
        <div className='resultsBox selection' tabIndex={0} style={{ position: 'absolute', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {props.gender == 0 && <Link to={toM} state={stateM}><button><h1>Men</h1></button></Link>}
            {props.gender == 1 && <Link to={toF} state={stateF}><button><h1>Women</h1></button></Link>}
            {props.gender == 2 && <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                <Link to={toM} state={stateM}><button style={{ borderRight: '2px solid #FF0059' }}><h1>Men</h1></button></Link>
                <Link to={toF} state={stateF}><button style={{ borderLeft: '2px solid #FF0059' }}><h1>Women</h1></button></Link>
            </div>}
        </div>
    )
}

function ResultsBox(props: { name: string, gender: number, idx: number, entries: [string, [number, string]][] }) {
    const [isHovering, setIsHovering] = useState(false);
    function stateMachine() {
        return isHovering ? 'gallerySquare resultsBox hovered' : 'gallerySquare resultsBox';
    }

    function delayedExitForMobile() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsHovering(false);
            })
        })
    }

    function delayedExitForFirefox() {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsHovering(true);
            })
        })
    }

    return (

        <div tabIndex={0} onMouseEnter={() => setIsHovering(true)} onFocus={() => setIsHovering(true)}
            onClick={() => setIsHovering(true)}
            onMouseLeave={() => { delayedExitForMobile(); }} onBlur={() => {}}
            className={stateMachine()} style={{ position: 'relative', color: 'white', textAlign: 'center' }}>
            <h1 className='resultsBoxText'>{props.name}</h1>
            {isHovering && <ResultsBoxSelection {...{ gender: props.gender, name: props.name, idx: props.idx, entries: props.entries }} />}
        </div>
    )
}

export default ResultsBox