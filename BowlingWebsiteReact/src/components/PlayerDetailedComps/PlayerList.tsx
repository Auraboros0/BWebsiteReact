import { useParams } from "react-router";
import { useRef, useEffect, Fragment, useState } from "react";
import type { player } from "../../Interfaces/player";
import type { ClickDragHandle } from "../../Scripts/ClickAndDrag";
import ClickAndDrag from "../../Scripts/ClickAndDrag";
import RosterEntrySmall from "./RosterEntryComps/RosterEntrySmall";
import mData from '../../data/mensData.json'
import wData from '../../data/womensData.json'
// import '../../css/infinite_scroll.scss'


/*
I'm using scrollRef to control the scroll position of the list and
itemRef to get the height of the div that I'll be duplicating.

NEW IDEA: 
*/
function PlayerList() {
    const { gender, id } = useParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<ClickDragHandle>(null);
    const itemRef = useRef<HTMLDivElement>(null)

    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const [atTop, setAtTop] = useState(false);
    const [atBottom, setAtBottom] = useState(false);

    const scrollHeight = useRef(100);
    const itemHeight = useRef(100);
    let count = 3;

    // Getting heights of both refs
    useEffect(() => {
        if (scrollRef.current && itemRef.current) {
            scrollHeight.current = scrollRef.current.scrollHeight;
            itemHeight.current = itemRef.current.offsetHeight;
        }
        jump(itemHeight.current);
    }, []);


    function jump(position: number) {
        console.log(position);
        const element = scrollRef.current!
        element.scrollTop = position;
    }

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleScroll = () => {
            console.log(element.scrollTop, itemHeight.current, scrollHeight.current)
            if (element.scrollTop <= 0) {
                jump(itemHeight.current);
                dragRef.current?.reactToJump(itemHeight.current, true);
            }
            else if (element.scrollTop >= scrollHeight.current - scrollRef.current?.clientHeight!) {
                jump(element.scrollTop - itemHeight.current);
                dragRef.current?.reactToJump(itemHeight.current, false);
            }
        };

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, []);

    let data;
    if (gender === 'mens') { data = mData }
    else { data = wData }

    return (
        <ClickAndDrag scrollRef={scrollRef} ref={dragRef}>
            {/* <div ref={scrollRef} className='detailedRosterView playerList scrollContainer'> */}
            {Array.from({ length: count }).map((_, index) => (
                <Fragment key={index}>
                    <div ref={itemRef}>
                        {data.map((item: player) => {
                            return (
                                <RosterEntrySmall {...item} />
                            )
                        })}
                    </div>
                </Fragment>
            ))}
            {/* </div> */}
        </ClickAndDrag>
    )
}

export default PlayerList