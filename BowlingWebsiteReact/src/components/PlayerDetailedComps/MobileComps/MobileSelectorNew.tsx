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

function MobileSelectorNew() {
    let anim1 = "mobileRosterAnim one";
    let anim2 = "mobileRosterAnim two";
    let animString = "";
    const sideBarRef = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(false);
    const toggle = () => {
        setVisible(!isVisible);
        animString = handleAnimation(anim1, anim2, isVisible);
    }

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            if (isVisible && sideBarRef.current && !event.composedPath().includes(sideBarRef.current)) {
                toggle();
            }
        })
    })

    return (
        <>
            {isVisible && <div onClick={toggle}><Darkness /></div>}
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {isVisible && <div
                    onClick={toggle}
                    style={{ display: "flex", height: '200vh', position: 'absolute', top: '50px', zIndex: '100' }}
                >
                    <PlayerList />
                </div>}
                <button
                    onClick={toggle}
                    style={{
                        position: 'absolute',
                        width: '100px',
                        color: 'white',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: '10',
                        fontSize: '64px',
                        backgroundColor: 'transparent',
                        border: 'none'
                    }}>
                    &#x1F847;
                </button>
            </div>
        </>
    )
}

export default MobileSelectorNew;