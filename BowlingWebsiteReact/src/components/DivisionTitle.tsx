import { forwardRef, useEffect, useImperativeHandle } from "react";
import { scroll } from "../Scripts/scroll";
import { useRef } from "react";

interface props {
    title: string;
    red: boolean;
    filename: string;
    isMobile?: boolean
}

export interface animatedBarRef {
    scrollLeft: (scrollSpeed: number) => void;
    scrollRight: (scrollSpeed: number) => void;
    stopScroll: (scrollSpeed: number) => void;
}

interface scrollOptions {
    xAxis: boolean;
    reverse: boolean;
    layer: number;
}

/* The title of each section in the homepage, also used for tournament preview */
const DivisionTitle = forwardRef<animatedBarRef, props>(( props, ref ) => {
    const bgRef = useRef<HTMLDivElement>(null);
    const animationId = useRef<number | null>(null);
    const position = useRef<number>(0);
    const scrollSettingsLeft: scrollOptions = {xAxis: false, reverse: true, layer: 0}
    const scrollSettingsRight: scrollOptions = {xAxis: false, reverse: false, layer: 0}
     useImperativeHandle(ref, () => ({
        scrollLeft(scrollSpeed: number) {
            scroll(scrollSpeed, animationId, position, bgRef, scrollSettingsLeft);
        },
        scrollRight(scrollSpeed: number) {
            scroll(scrollSpeed, animationId, position, bgRef, scrollSettingsRight);
        },
        stopScroll(scrollSpeed: number) {
            scroll(0.2, animationId, position, bgRef, scrollSettingsRight);
        }
    }));
    let divName;
    const isMobile:boolean = props.isMobile ?? false;
    if (props.red) {divName = 'headerDivision'}
    else {divName='headerDivisionWhite'}
    return (
        <div className={divName} style={{position: 'relative', backgroundImage: `url(/public/assets/Textures/redDash.png), linear-gradient(180deg, transparent 0% 50%, #d01840 50% 60%, #d01840 60% 100%)`}}>
            <div className = 'headerDivisionStripes' ref={bgRef} style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundImage: `url(/public/assets/Textures/${props.filename})`, zIndex: '-1'}}></div>
            {!isMobile && <h2>{props.title}</h2>}
            {isMobile && <h3>{props.title}</h3>}
        </div>
    )
})

export default DivisionTitle