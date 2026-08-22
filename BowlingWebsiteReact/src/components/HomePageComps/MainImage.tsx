import { Next } from "react-bootstrap/esm/PageItem"
import NextTourney from "./NextTourney"
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createNextTourneyString } from "./NextTourneyRewrite";
import { scroll } from "../../Scripts/scroll";
async function getRecap() {
    const data = await fetch('/api/home/recap');
    const toReturn = await data.json();
    const status = data.status;
    return { toReturn, status };
}

function ordinal(n: number) {
    const suffix =
        n % 100 >= 11 && n % 100 <= 13
            ? "th"
            : n % 10 === 1
                ? "st"
                : n % 10 === 2
                    ? "nd"
                    : n % 10 === 3
                        ? "rd"
                        : "th";

    return `${n}${suffix}`;
}


function generateString(place: [number, number], fieldSize: [number, number], tournamentName: [string, string]) {
    // [0] refers to men [1] refers to women
    const placeM = ordinal(place[0]);
    const placeW = ordinal(place[1]);
    const stringAll = `Men's team finished ${placeM} / ${fieldSize[0]} @ ${tournamentName[0]}! ||| Women's team finished ${placeW}/${fieldSize[1]} @ ${tournamentName[1]}!`
    const stringMen = `Men's team finished ${placeM} / ${fieldSize[0]} @ ${tournamentName[0]}!`;
    const stringWomen = `Women's team finished ${placeW} / ${fieldSize[1]} @ ${tournamentName[1]}!`;

    if (place[0] != 0 && place[1] != 0) {
        return stringAll;
    }
    if (place[0] == 0 && place[1] != 0) {
        return stringWomen;
    }
    if (place[0] != 0 && place[1] == 0) {
        return stringMen;
    }
    else {
        return "";
    }

}
function MainImage() {
    // The 0 index of every state is the mens data. The 1 index is the womens data
    const [placement, setPlacement] = useState<[number, number]>([0, 0]);
    const [outOf, setOutOf] = useState<[number, number]>([0, 0]);
    const [name, setName] = useState<[string, string]>(["", ""]);

    const [repeatCount, setRepeatCount] = useState<number>(1);
    const textRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const animationId = useRef<number | null>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const position = useRef(0);
    let nextTourney = createNextTourneyString()
    let stringBefore = "";
    let live = nextTourney.live;
    let liveString = live ? "LIVE" : "Coming Up"
    let laterStrings = nextTourney.strings;
    // let stringLater = `${liveString}: ${nextTourney.strings}`;

    function scrollWrapper(scrollSpeed: number) {
        scroll(scrollSpeed, animationId, position, containerRef, {xAxis: true, reverse: false, layer: 0});
    }
    scrollWrapper(1);
    useEffect(() => {
        const getData = async () => {
            try {
                const recapObject = await getRecap();
                const data = await recapObject.toReturn;
                const JSONStatus = await recapObject.status;
                if (JSONStatus == 200) {
                    const dataPlacement: [number, number] = await [data.mData.placement, data.wData.placement];
                    const dataOutOf: [number, number] = await [data.mData.outOf, data.wData.outOf];
                    const dataName: [string, string] = await [data.mData.name, data.wData.name];
                    setPlacement(dataPlacement);
                    setOutOf(dataOutOf);
                    setName(dataName);
                }
            }
            catch (error) {

            }
        }
        getData();
    }, [])

    useLayoutEffect(() => {
        const resize = () => {
            if (textRef.current && containerRef.current) {
                // Re-calculate # of list repeats on resize.
                const textWidth = textRef.current!.offsetWidth;
                const containerWidth = containerRef.current?.offsetWidth;
                let repeatCount = 2 * Math.floor((1 + (containerWidth! / textWidth)));
                if (repeatCount < 2) { repeatCount = 2 };
                setRepeatCount(repeatCount);
                console.log("RESIZE");
            }
        }

        resize()
        window.addEventListener("resize", resize);
        return () => { window.removeEventListener("resize", resize) };
    }, [])

    stringBefore = `${generateString(placement, outOf, name)}`;
    // allString = `${stringLater} | ${stringBefore} | `;
    // I'll use CSS to animate the text while using this to animate the background
    return (
        <div className='mainImage' style={{ position: 'relative', width: 'calc(100% + 8px)', overflowX: 'clip', overflowY: 'visible', fontSize: 'calc(100vw / 70)'}}>

            <div ref={textRef} style={{ position: "absolute", visibility: 'hidden', display: 'flex', flexShrink: '0', width: 'max-content', textWrap: 'nowrap' }}>
                <h1 style={{ display: 'flex', margin: '0', flexShrink: '0', gap: '0', width: 'max-content' }}>
                    <span style={{ margin: '0', marginLeft: '400px', backgroundColor: 'black' }}>{stringBefore}</span>
                    {laterStrings.map((item) => (
                        <span style={{ margin: '0', marginLeft: '400px' }}>{liveString}: {item}</span>
                    ))}
                </h1>
            </div>

            <img style={{ zIndex: '-1' }} src='/public/assets/Textures/grunge.jpg' />
            <div ref={containerRef} className='scrollingResults'>
                {/* // This section will display high game and series of the most recent competition, scrolling */}
                <div style={{ display: 'flex', flexShrink: '0', width: 'max-content', textWrap: 'nowrap', boxSizing: 'border-box' }} className='scrollingResultsText'>
                    {Array.from({ length: repeatCount }).map((_index) => (

                        <h1 style={{ display: 'inline-block', flexShrink: '0', width: 'max-content' }}>
                            <span style={{ margin: '0', marginLeft: '400px'}}>{stringBefore}</span>
                            {laterStrings.map((item) => (
                                <span style={{ margin: '0', marginLeft: '400px' }}>{liveString}: {item}</span>
                            ))}
                        </h1>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainImage