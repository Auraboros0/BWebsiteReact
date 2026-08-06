import { useNavigate, useParams } from "react-router";

import { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import PlayerList from "../PlayerList";
import TestBox from "./TestBox";
import Darkness from "./Darkness";
/*
Button will trigger the list to appear from the left, it will occupy roughly 40% of the screen width.
The list will be closed by clicking anything outside of it. 

The list will be fixed. It will reuse the same infinite scroll list that is on desktop.

MAKE THE BUTTON LOOK LIKE A LITTLE TAB STICKING OUT THE LEFT!!!
MAKE IT ACTIVATE ON SWIPE!!!

*/

function handleAnimation(anim1: string, anim2: string, animState: boolean) {
    let animString = '';
    if (animState) { animString = anim1 }
    else { animString = anim2 }
    return animString
}

function MobileSelector() {
    let anim1 = "mobileRosterAnim one";
    let anim2 = "mobileRosterAnim two";
    let animString = "";
    const sideBarRef = useRef(null);
    const [isVisible, setVisible] = useState(false);
    const toggle = () => {
        setVisible(!isVisible);
        animString = handleAnimation(anim1, anim2, isVisible);
        console.log(animString);
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if (isVisible && sideBarRef.current && !event.composedPath().includes(sideBarRef.current)) {
                toggle();
            }
        })
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {isVisible && <Darkness />}
            <div ref={sideBarRef} style={{ position: 'relative', zIndex: '100', flex: '1' }}>
                <div className={isVisible ? anim2 : anim1} style={{ marginLeft: '-16px' }}>
                    <div style={{ display: "flex", height: "calc(100vh - 90px)", position: 'fixed' }} onClick={toggle}><PlayerList /></div>
                    <button className='mobileRosterToggle' onClick={toggle} style={{ position: 'absolute', left: '65vw', top: '0' }}>&#9654;</button>
                </div>
            </div>
        </div>
    )
}

export default MobileSelector;