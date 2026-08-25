import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import MaleOrFemale from './MaleOrFemale';
import MaleOrFemaleRedo from './MaleOrFemaleRedo';
function RosterButtonRedo() {

    const rosterRef = useRef(null)
    const [rosterActive, setRosterActive] = useState(false)
    const collapse = () => {
        setRosterActive(!rosterActive);
    }

    const handleClick = (event: MouseEvent) => {
        if (rosterActive && rosterRef.current && !event.composedPath().includes(rosterRef.current)) {
            collapse();
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleClick)
        return () => document.body.removeEventListener('click', handleClick)
    }, [rosterActive])

    return (
        <div ref={rosterRef} style={{ position: 'relative', width: 'max-content', display: "inline-block", borderRadius: "0px 20px 0px 0px", boxShadow: rosterActive ? 'inset 0 0 0 2px #d01840' : '' }}>
            <button id={rosterActive ? 'isActiveButton' : 'inactiveButton'} style={{ minWidth: '100px', borderRadius: "0px 20px 0px 0px" }} onClick={collapse}>
                <h2>Roster</h2>
            </button>
            <div onClick={collapse}>
                {rosterActive && <MaleOrFemaleRedo />}
            </div>
        </div>
    )
}

export default RosterButtonRedo