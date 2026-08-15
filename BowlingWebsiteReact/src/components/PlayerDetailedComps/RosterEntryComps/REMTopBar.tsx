import { use, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import REMTopStats from "./REMTopStats";
import useConditionalRender from "../../../dataScripts/useConditionalRender";
function REMTopBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const absoluteRef = useRef<HTMLDivElement>(null);
    const position = useRef(0);
    let divHeight;
    const animationId = useRef<number | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hasUpdated, setHasUpdated] = useState(false);
    const { isMd } = useConditionalRender();
    const { id } = useParams();

    // const classStringOne: string = 'REMTopContainer';
    // const classStringTwo: string = 'REMTopContainer';
    const classStringOne: string = 'REMTopContainer clicked'
    const classStringTwo: string = 'REMTopContainer'
    const classStringThree: string = 'REMTopContainer hovering'

    /*
    If I just use this without a cancel function it makes a cool effect
    */

    /*
    0: No hover, no click.
    1: Hover, no click.
    2: Clicked, doesn't matter if hovering.
    */
    const stateMachine = () => {
        if (!isMd) { return classStringTwo }
        if (isClicked) {
            return classStringOne;
        }
        if (isHovering) {
            return classStringThree;
        }
        return classStringTwo;
    }

    const handleDataReceived = () => {
        setHasUpdated(!hasUpdated);
        console.log("ITS ME");
    }

    const handleHover = (clicked: boolean, isHover: boolean) => {
        if (clicked) {
            setIsHovering(false);
            return;
        }
        if (isHover) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
        // if (isClicked) { stopScroll()}
        // else {scroll(1.5)}
    }

    /*
    Whenever my REMTopStats display exceeds the maximum height, the positioning of the REMTopContainer
    is thrown off whenever the viewport resizes. This function ensures that it positions itself correctly
    */
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                divHeight = absoluteRef.current!.offsetHeight;
                containerRef.current.style.setProperty("--absolute-height", `-${divHeight}px`);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => {(window.removeEventListener("resize", handleResize))};
    }, [])

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            if (containerRef.current) {
                divHeight = absoluteRef.current!.offsetHeight;
                containerRef.current.style.setProperty("--absolute-height", `-${divHeight}px`);
                console.log(divHeight);
                console.log("stuff");
                scroll(0.5);
            }
        })
        return () => cancelAnimationFrame(frame);
    }, [hasUpdated, id])

    const scroll = (scrollSpeed: number, xAxis?: boolean) => {
        // if (animationId.current) { return }
        if (animationId.current) {
            cancelAnimationFrame(animationId.current)
            animationId.current = null;
        }
        const animate = () => {
            const cellSize = barRef.current!.offsetWidth * 0.10;
            position.current += scrollSpeed;
            position.current = position.current % cellSize;
            if (xAxis) {
                barRef.current!.style.backgroundPositionX = `${position.current % cellSize}px`;
            } else {
                barRef.current!.style.backgroundPositionX = `${position.current % cellSize}px`;
                barRef.current!.style.backgroundPositionY = `${position.current % cellSize}px`;
            }
            animationId.current = requestAnimationFrame(animate);
        }
        animationId.current = requestAnimationFrame(animate)
    }

    const stopScroll = () => {
        if (animationId.current) {
            cancelAnimationFrame(animationId.current)
            animationId.current = null;
            scroll(0.5);
        }
    }

    return (
        <div className={stateMachine()} ref={containerRef}
            style={{ position: 'relative' }
            }
            onClick={() => handleClick()}
            onMouseEnter={() => {
                if (!isClicked && isMd) { scroll(1.5) };
                setIsHovering(true);
            }}
            onMouseLeave={() => {
                stopScroll();
                setIsHovering(false);
            }
            }>
            <div ref={barRef} className='REMTopBar'>
            </div>
            <REMTopStats ref={absoluteRef} onDataLoad={handleDataReceived} />
        </div >
    )
}

export default REMTopBar;