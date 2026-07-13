/*
Intended Usage:
1: Populate an array with copies of the item to be scrolled infinitely
2: Render them all but hide overflow (so it scrolls)
3: When certain thresholds are hit, reset the scroll position.

0 = top of container.
height = bottom of container
*/

// interface scrollContainer {
//     positionY: number;
//     itemCount: number;
//     items: [scrollItem];
// }

export class infiniteScroll {
    itemHeight: number;
    height: number;
    positionY: number;
    itemCount: number;
    threshold1: number;
    threshold2: number;
    reset1: number;
    reset2: number;


    constructor(itemHeight: number, height: number) {
        this.itemHeight = itemHeight;
        this.height = height
        this.positionY = itemHeight;
        this.itemCount = 1 + (this.height / this.itemHeight);
        this.threshold1 = 0;
        this.threshold2 = height;
        this.reset1 = height - itemHeight;
        this.reset2 = itemHeight;
    }

    public populate() {
        var count: number;
        count = 1 + this.height / this.itemHeight;
        return count;
    }
}