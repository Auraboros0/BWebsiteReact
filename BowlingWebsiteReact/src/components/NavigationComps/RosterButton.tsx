import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import MaleOrFemale from './MaleOrFemale';
function RosterButton() {

    const rosterRef = useRef(null)
    const [rosterActive, setRosterActive] = useState(false)
    const collapse = () => {
        setRosterActive(!rosterActive);
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if (rosterActive && rosterRef.current && !event.composedPath().includes(rosterRef.current)) {
                collapse();
            }
        })
    })

    return (
        <div ref={rosterRef} style={{display: "inline-block", boxShadow: rosterActive ? 'inset 0 0 0 2px solid red' : ''}}>
            <div onClick={collapse} style={{display: "inline-block"}}>
                {rosterActive && <MaleOrFemale />}
            </div>
            <button id={rosterActive ? 'isActiveButton' : 'inactiveButton'} onClick={collapse}>
                <h2>Roster</h2>
            </button>
        </div>
    )
}

export default RosterButton