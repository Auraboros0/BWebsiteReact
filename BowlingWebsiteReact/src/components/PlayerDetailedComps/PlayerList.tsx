import { useParams } from "react-router";
import { useRef, useEffect, Fragment, useState } from "react";
import type { player } from "../../Interfaces/player";
import type { ClickDragHandle } from "../../dataScripts/ClickAndDrag";
import ClickAndDrag from "../../dataScripts/ClickAndDrag";
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

    let scrollHeight = 0;
    let itemHeight = 0;
    let count = 3;

    // Getting heights of both refs
    useEffect(() => {
        if (scrollRef.current && itemRef.current) {
            scrollHeight = scrollRef.current.offsetHeight;
            itemHeight = itemRef.current.offsetHeight;
        }
    });

    function jump(position: number) {
        const element = scrollRef.current!
        element.scrollTop = position;
        // scrollRef.current?.scrollTo({
        //     top: position,
        //     behavior: 'instant',
        // });
        console.log('JUMP')
    }


    /* Update state whenever the beginning or end of the scroll window is reached */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.target === topRef.current) {
                        setAtTop(entry.isIntersecting);
                    }
                    if (entry.target === bottomRef.current) {
                        setAtBottom(entry.isIntersecting);
                    }
                }

            },
            {
                root: scrollRef.current,
                threshold: 1,
            }
        );

        observer.observe(topRef.current!);
        observer.observe(bottomRef.current!);

        return () => observer.disconnect();
    }, []);


    /*
    Explanation of jump value:
    Scrolling down by one list length gives the scroll window room to scroll up while being visually
    identical to the starting position. 
    */
    useEffect(() => {
        if (atTop) {
            // console.log(itemHeight);
            jump(itemHeight);
            dragRef.current?.reactToJump(itemHeight, true);
        }
    }, [atTop]);

    /*
    Explanation of jump value:
    itemHeight 1: Gives the scrollbar some room to scroll backwards, wouldn't have any room if I used 0
    scrollHeight - itemHeight: Gives me the length of the gap between the scroll window and one full list.
    itemHeight - (scrollHeight - itemHeight): Move one full list length ahead and then scroll backwards to position
    the bottom of list #2 to the bottom of the scroll window.

    12: Not sure yet, the jump occurs after the 4px margin after the last element is crossed. Without any offset
    the jump positions the last element to the bottom of the scroll window without any margin. When adding 4 there is still
    a visible jump backwards but it is seamless with 12.
    */
    useEffect(() => {
        if (atBottom) {
            // console.log(12 + itemHeight - (scrollHeight - itemHeight))
            jump(12 + itemHeight - (scrollHeight - itemHeight));
            dragRef.current?.reactToJump(itemHeight, false);
        }
    }, [atBottom]);


    let data;
    if (gender === 'mens') { data = mData }
    else { data = wData }

    return (
        <ClickAndDrag scrollRef={scrollRef} ref={dragRef}>
        {/* <div ref={scrollRef} className='detailedRosterView playerList scrollContainer'> */}
            <div ref={topRef} style={{ height: '1px' }} />
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
            <div ref={bottomRef} style={{ height: '1px' }} />
        {/* </div> */}
        </ClickAndDrag>
    )
}

export default PlayerList