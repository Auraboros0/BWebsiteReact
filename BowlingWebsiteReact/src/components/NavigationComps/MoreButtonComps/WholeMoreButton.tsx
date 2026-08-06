import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import LinkCollection from './LinkCollection';
import RosterButton from '../RosterButton';
function WholeMoreButton() {
    const moreRef = useRef(null);
    const [isVisible, setVisibility] = useState(false);
    const collapse = () => {
        setVisibility(!isVisible);
    }

    // Note: This function is called anytime there is a click.
    // It asks 2 things:
    //  Is the more button active?
    //  Was the more button clicked?
    
    // If the button is active but none of its elements were clicked then it closes.

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if (isVisible &&moreRef.current && !event.composedPath().includes(moreRef.current)) {
                collapse();
            }
        })
    })

    return (
        <div ref={moreRef} style={{ display: "block", position: "relative", width: "100%"}}>
            <nav>
            <button className="moreButton" id={isVisible ? 'isActiveButton' : 'inactiveButton'}onClick={collapse}>
                <h2>MORE</h2>
            </button>
            </nav>
            <div onClick={collapse}>
            {isVisible && <LinkCollection /> }
            </div>
        </div>
    )

}

export default WholeMoreButton;