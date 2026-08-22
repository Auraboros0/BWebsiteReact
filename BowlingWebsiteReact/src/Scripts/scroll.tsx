import type { RefObject } from "react";
interface scrollOptions {
    xAxis: boolean;
    reverse: boolean;
    layer: number;
}

/* Dimensions will be off if ref isn't border-box. */
export const scroll = (scrollSpeed: number, animationId: RefObject<number | null>, position: RefObject<number>, itemRef: RefObject<HTMLDivElement | null>,
    options: scrollOptions) => {
    // if (animationId.current) { return }
    if (animationId.current) {
        cancelAnimationFrame(animationId.current)
        animationId.current = null;
    }

    const createAnimationInfo = () => {
        const xAxis = options.xAxis;
        const layer = options.layer;
        const reverse = options.reverse;
        let putString: string = "";
        let cellSize: number = 0;
        if (!itemRef.current) { return { putString, cellSize } };
        const backgroundSizes = getComputedStyle(itemRef.current!).backgroundSize.split(" ");
        let cellMultiplier;
        if (xAxis) { cellMultiplier = parseFloat(backgroundSizes[1]) / 100 }
        else { cellMultiplier = parseFloat(backgroundSizes[0]) / 100 }
        const aspectRatio = itemRef.current!.offsetWidth / itemRef.current!.offsetHeight;
        cellSize = itemRef.current!.offsetWidth * cellMultiplier * aspectRatio;

        if (reverse) { scrollSpeed = -Math.abs(scrollSpeed) }
        if (layer) {
            for (let i = 0; i > layer - 1; i++) {
                putString += "0px, ";
            }
        }
        return { putString, cellSize, xAxis }
    }

    // let stringToModify = createAnimationInfo().putString;
    // const cellSize = createAnimationInfo().cellSize;
    const cellSize = createAnimationInfo().cellSize;
    const putString = createAnimationInfo().putString
    const xAxis = createAnimationInfo().xAxis;
    const animate = () => {
        position.current += scrollSpeed;
        position.current = position.current % cellSize;
        if (xAxis) {
            itemRef.current!.style.backgroundPositionX = `${putString}${position.current % cellSize}px`;
        } else {
            itemRef.current!.style.backgroundPositionX = `${putString}${position.current % cellSize}px`;
            itemRef.current!.style.backgroundPositionY = `${putString}${position.current % cellSize}px`;
        }
        animationId.current = requestAnimationFrame(animate);
    }
    animationId.current = requestAnimationFrame(animate)
}