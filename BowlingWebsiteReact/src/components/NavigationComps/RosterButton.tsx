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
        <div ref={rosterRef} style={{display: "inline-block", borderRadius: "0px 20px 20px 0px", boxShadow: rosterActive ? 'inset 0 0 0 2px #d01840' : ''}}>
            <div onClick={collapse} style={{display: "inline-block"}}>
                {rosterActive && <MaleOrFemale />}
            </div>
            <button id={rosterActive ? 'isActiveButton' : 'inactiveButton'} style={{borderRadius: "0px 20px 20px 0px"}} onClick={collapse}>
                <h2>Roster</h2>
            </button>
        </div>
    )
}

export default RosterButton