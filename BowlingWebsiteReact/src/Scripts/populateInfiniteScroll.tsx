import { useRef } from "react";
import type { RefObject } from "react";
export function populateInfiniteScroll(item: RefObject<HTMLDivElement | null>, container: RefObject<HTMLDivElement | null>) {
    if (item.current && container.current) {
        // Re-calculate # of list repeats on resize.
        const textWidth = item.current.offsetWidth;
        const containerWidth = container.current.offsetWidth;
        let repeatCount: number = 2 * Math.floor((1 + (containerWidth / textWidth)));
        if (repeatCount < 2) { repeatCount = 2 };
        console.log("top", repeatCount)
        return repeatCount;
    } else {
        console.log("bottom")
        return 2;
    }
}

// export function infiniteScrollContainer(content, count: number, speed: number, left?: boolean) {
//     return (
//         <div>
//             {Array.from({ length: count }).map((_index) => (
//                 <div>{content}</div>
//             ))}
//         </div>
//     )
// }