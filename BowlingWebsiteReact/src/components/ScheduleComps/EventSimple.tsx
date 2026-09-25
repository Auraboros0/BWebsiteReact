import type { tournament } from "../../Interfaces/tournament"
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import HostLogo from "./EventSimpleComps/HostLogo"
import InfoBlock from "./EventSimpleComps/InfoBlock"
import BigState from "./EventSimpleComps/BigState";
import useConditionalRender from "@/Scripts/useConditionalRender";
// import TexturedState from "./EventSimpleComps/TexturedState";
import EventHeader from "./EventSimpleComps/EventHeader";
import HostLogoMobile from "./EventSimpleComps/HostLogoMobile";

/* The items that the Schedule page is populated with. Takes a tournament object and creates a display from it */
function EventSimple(props: tournament) {
    const startMonth = props.time[0].getMonth();
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth();
    const endDay = props.time[1].getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const { isMd } = useConditionalRender();
    const [ended, setEnded] = useState(false);
    let male: boolean = false;

    if (props.gender != 2) {
        if (props.gender == 0) { male = true }
        if (props.gender == 1) { male = false }
    }

    const className = () => {
        return ended ? 'eventSimplePlus ended' : 'eventSimplePlus'
    }

    useEffect(() => {
        if (today.getTime() > props.time[1].getTime()) {
            setEnded(true);
        }
    }, [])

    useLayoutEffect(() => {
        const resize = () => {
            leftRef.current!.style.height = `${rightRef.current?.offsetHeight}px`
            leftRef.current!.style.display = 'flex';
        }
            resize();
            const observer = new ResizeObserver(resize);
            observer.observe(rightRef.current!);
            return () => { observer.disconnect() }
    }, [])
    return (
        <div className={className()} style={{display: 'flex', width: '100%', position: 'relative'}}>
            <div ref={leftRef}>
                {isMd && <HostLogo hostSlug={props.hostSlug} />}
                {!isMd && <HostLogoMobile hostSlug={props.hostSlug} />}
            </div>
            <div ref={rightRef} className='eventSimple' style={{position: 'relative'}}>
                <EventHeader {...props} />
                <div style={{ display: 'flex'}}>
                    <InfoBlock {...props} />
                </div>
                <div style={{ position: 'absolute', right: '0' }}>
                    {isMd && <BigState state={props.city[0].state} />}
                </div>
            </div>
        </div>
    )
}

export default EventSimple;