import { useRef, useImperativeHandle, useEffect, forwardRef } from 'react'
import useConditionalRender from './useConditionalRender';
export interface ClickDragHandle {
    reactToJump: (itemHeight: number, up: boolean) => void
}

interface ClickDragProps {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
}

const clickAndDrag = forwardRef<ClickDragHandle, ClickDragProps>(
    ({ scrollRef, children }, ref) => {

        useImperativeHandle(ref, () => ({
            reactToJump,
        }))

        const { isMd } = useConditionalRender();

        // Whenever the parent jumps, this will be called via ref
        function reactToJump(itemHeight: number, up: boolean) {
            if (drag.current.active) {
                if (up) { drag.current.initialScroll += itemHeight }
                else { drag.current.initialScroll -= itemHeight }
            }
        }



        let holdTime = 0;
        const dragThreshold = 100;
        const deceleration = 0.9;
        let velocity = 0;

        const drag = useRef({
            active: false,
            initialY: 0,
            currentY: 0,
            initialScroll: 0
        })

        // Save current scroll position
        const onHold = (e: React.PointerEvent<HTMLDivElement>) => {
            // holdTime++;
            // if (holdTime < dragThreshold) {return}
            const element = scrollRef.current!;
            drag.current.active = true;
            drag.current.initialY = e.clientY;
            drag.current.currentY = e.clientY;
            drag.current.initialScroll = element.scrollTop;
        }

        // 
        const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
            if (!drag.current.active) { return }
            // e.preventDefault();
            const element = scrollRef.current!;
            scrollRef.current?.setPointerCapture(e.pointerId);
            // e.currentTarget.setPointerCapture(e.pointerId);
            velocity = (drag.current.currentY - e.clientY) * 1.5;
            drag.current.currentY = e.clientY;
            element.scrollTop = drag.current.initialScroll + (drag.current.initialY - e.clientY);
            // console.log(velocity)
        }

        // Stop updating drag element, preserve momentum given to scroll
        const onRelease = (e: React.PointerEvent<HTMLDivElement>) => {
            const element = scrollRef.current!;
            drag.current.active = false;
            scrollRef.current?.releasePointerCapture(e.pointerId);
            // e.currentTarget.releasePointerCapture(e.pointerId);
            function animateInertia() {
                element.scrollTop += velocity
                accelerate();
                requestAnimationFrame(animateInertia)
            }
            animateInertia()
        }

        const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
            e.preventDefault();

            const element = scrollRef.current!;
            element.scrollTop += e.deltaY;
        };

        // useEffect(() => {
        //     const element = scrollRef.current;
        //     if (!element) return;

        //     const onWheel = (e: WheelEvent) => {
        //         e.preventDefault();
        //         element.scrollTop += e.deltaY;
        //     };

        //     element.addEventListener('wheel', onWheel, {
        //         passive: false
        //     });

        //     return () => {
        //         element.removeEventListener('wheel', onWheel);
        //     };
        // }, [scrollRef]);


        function accelerate() {
            {
                velocity *= deceleration;
                if (velocity < 0.1 && velocity > -0.1) { velocity = 0 }
            }
        }

        return (
            <div
                ref={scrollRef}
                onPointerDown={isMd ? onHold : undefined}
                onPointerUp={isMd ? onRelease : undefined}
                onPointerMove={isMd ? onDrag : undefined}
                onWheel={isMd ? onWheel : undefined}
                className='detailedRosterView playerList scrollContainer'
            >
                {children}
            </div>
        )
        // }

    })

export default clickAndDrag
