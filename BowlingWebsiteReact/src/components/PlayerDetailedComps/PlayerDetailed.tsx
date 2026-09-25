import { useNavigate, useParams } from "react-router";
import type { player } from '../../Interfaces/player'
import useConditionalRender from "../../Scripts/useConditionalRender";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import mensData from "../../data/mensData.json";
import womensData from "../../data/womensData.json";
import RosterEntryMain from "./RosterEntryComps/RosterEntryMain";
import BigPlayerImage from "./BigPlayerImage";
import PlayerStats from "./PlayerStats";
import MobileSelectorNew from "./MobileComps/MobileSelectorNew";
import PlayerList from "./PlayerList";
import PlayerVideo from "./PlayerVideo";
import '../../css/roster.scss';
import REMTopBar from "./RosterEntryComps/REMTopBar";
import type { REMBarRef } from "./RosterEntryComps/REMTopBar";

let rightSideHeight = 0;

async function getInfo(gender: string, id: string) {
    const data = await fetch(`/api/detailed/${gender}/${id}`);
    const toReturn = await data.json();
    return toReturn;
}

export default function PlayerDetailed() {
    const { gender, id } = useParams();
    const { isMd } = useConditionalRender();
    const [playerData, setPlayerData] = useState(null);
    const [wasPlaying, setWasPlaying] = useState(false);
    const navigate = useNavigate();
    const rightRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const oneRef = useRef<HTMLDivElement>(null);
    const twoRef = useRef<HTMLDivElement>(null);
    const vidRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<REMBarRef>(null);

    let data;
    if (gender === 'mens') { data = mensData }
    else { data = womensData }

    const setVid = (video: HTMLVideoElement) => {
        vidRef.current = video;
    }

    const onPlay = () => {
        barRef.current!.stopScroll();
    }

    const onPause = () => {

    }

    const onOpenStats = () => {
        setWasPlaying(!(vidRef.current!.paused))
        vidRef.current!.pause();
    }

    const onCloseStats = () => {
        if (wasPlaying) {
            vidRef.current!.play();
        }
    }

    useLayoutEffect(() => {
        if (leftRef.current && rightRef.current && isMd) {
            const resize = () => {
                const rightHeight = oneRef.current!.offsetHeight + twoRef.current!.offsetHeight - 5;
                // leftRef.current!.style.height = `${rightRef.current!.clientHeight}px`;
                leftRef.current!.style.height = `${rightHeight}px`;
                leftRef.current!.style.display = 'flex';
            }
            resize();
            window.addEventListener("resize", resize);
            return () => { window.removeEventListener("resize", resize) }
        }
    }, [])

    const target: player = data.find(player => player.name === id)!;
    return (
        <div style={{ overflowY: isMd ? 'hidden' : 'hidden' }}>
            {/* <div style={{ top: 0 }}> */}
                {!isMd && <MobileSelectorNew />}
            {/* </div> */}
            <div style={{ display: "flex", gap: "4px" }}>
                {isMd && <div ref={leftRef} className="" style={{ height: '0px' }}>
                    <PlayerList />
                </div>}

                <div ref={rightRef} className="playerDetailed" style={{ width: "100%", backgroundColor: 'black' }}>

                    <div ref={oneRef}><PlayerVideo sendVidToParent={setVid} onPlay={onPlay} onPause={onPause} /></div>

                    <div ref={twoRef}>
                        {isMd && <div><REMTopBar ref={barRef} onOpenStats={onOpenStats} onCloseStats={onCloseStats} /></div>}
                        <RosterEntryMain {...target} />
                    </div>

                    {!isMd && <REMTopBar onOpenStats={onOpenStats} onCloseStats={onCloseStats} />}
                    {/* <PlayerStats name={target.name} /> */}
                </div>
            </div>
        </div>
    )
}
