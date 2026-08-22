import type { tournament } from "../../Interfaces/tournament"
import { useRef, useLayoutEffect } from "react";
import HostLogo from "./EventSimpleComps/HostLogo"
import InfoBlock from "./EventSimpleComps/InfoBlock"
import BigState from "./EventSimpleComps/BigState";
// import TexturedState from "./EventSimpleComps/TexturedState";
import EventHeader from "./EventSimpleComps/EventHeader";

/* The items that the Schedule page is populated with. Takes a tournament object and creates a display from it */
function EventSimple(props: tournament) {
    const startMonth = props.time[0].getMonth();
    const startDay = props.time[0].getDate();
    const endMonth = props.time[1].getMonth();
    const endDay = props.time[1].getDate();
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    let male: boolean = false;

    if (props.gender != 2) {
        if (props.gender == 0) { male = true }
        if (props.gender == 1) { male = false }
    }

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
        <div className='eventSimplePlus' style={{display: 'flex', width: '100%'}}>
            <div ref={leftRef}><HostLogo hostSlug={props.hostSlug} /></div>
            <div ref={rightRef} className='eventSimple'>
                <EventHeader {...props} />
                <div style={{ display: 'flex'}}>
                    <InfoBlock {...props} />
                </div>
                <div style={{ position: 'absolute', right: '0' }}>
                    <BigState state={props.city[0].state} />
                </div>
            </div>
        </div>
    )
}

export default EventSimple;