/*
Intended Usage:
1: Populate an array with copies of the item to be scrolled infinitely
2: Render them all but hide overflow (so it scrolls)
3: When certain thresholds are hit, reset the scroll position.
*/


interface scrollItem {
    height: number;
    order: number;
    // parent: scrollContainer; // Will pass by reference
}

// interface scrollContainer {
//     positionY: number;
//     itemCount: number;
//     items: [scrollItem];
// }

class scrollContainer {
    item: scrollItem
    height: number;
    collection: scrollItem[] = [];


    constructor(item: scrollItem, height: number) {
        this.item = item;
        this.height = height
    }

    public populate(item: scrollItem) {
        var count: number;
        count = 1 + this.height / item.height;
        for (var i = 0; i < count; i++) {
            this.collection[i] = {...item};
        } 
    }
}

function jumpTop() {

}

function jumpBottom() {

}