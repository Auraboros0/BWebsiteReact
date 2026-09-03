import ResultsBox from "./ResultsDisplayComps/ResultsBox";
import { useState, useEffect } from "react";

function randomizeAndSlice(filenames: string[], count: number) {
    const toReturn = filenames.sort(() => Math.random() - 0.5).slice(0, count);
    return toReturn;
}

export interface entryWithNextAndPrev {
    entry: [string, [number, string]];
    prev: [string, string];
    next: [string, string];
}

export interface tournamentEntry {
    entry: [string, [number, string]]
}

/* Populates the home page with links to tournament results */
function HomeGallery(props: { list: Record<string, [number, string]> }) {
    const modules = import.meta.glob('/public/assets/TestImages/*.{png,jpg,jpeg}', { eager: true });
    const [sorted, setSorted] = useState<[string, [number, string]][]>([]);
    const class1: string = 'g-col-6 g-col-md-4';
    const class2: string = '';
    let class4: string = class1;

    useEffect(() => {
        const entries = Object.entries(props.list);
        const entriesSorted = entries.sort((a, b) => Date.parse(a[1][1]) - Date.parse(b[1][1]));
        setSorted(entriesSorted);
        // setSortedObject(generateProps());
    },[props.list])

    function stateMachine() {
        return isHovering ? 'resultsBox hovered' : 'resultsBox';
    }

    // function generateProps() {
    //     let entryObjectArray: entryWithNextAndPrev[] = [];
    //     for (let i = 0; i < sorted.length; i++) {
    //         let entryGender = sorted[i][1][0];
    //         let next: [string, string] = ['',''];
    //         let prev: [string, string] = ['',''];
    //         if (entryGender == 0) {
    //             const data = getNextAndLast(i, sorted, entryGender);
    //             next[0] = data.next;
    //             prev[0] = data.prev;
    //         }
    //         if (entryGender == 1) {
    //             const data = getNextAndLast(i, sorted, entryGender);
    //             next[1] = data.next;
    //             prev[1] = data.prev;
    //         }
    //         if (entryGender == 2) {
    //             const dataM = getNextAndLast(i, sorted, 0);
    //             const dataF = getNextAndLast(i, sorted, 1);
    //             next = [dataM.next, dataF.next];
    //             prev = [dataM.prev, dataF.prev];
    //         }
    //         entryObjectArray.push({entry: sorted[i], prev: prev, next: next});
    //     }
    //     return entryObjectArray;
    // }

    // function getNextAndLast(idx: number, entries: [string, [number, string]][], gender: number) {
        
    //     let next: string = '';
    //     let prev: string = '';
    //     for (let i = idx + 1; i < entries.length; i++) {
    //         const nextEntryGender = entries[i][1][0];
    //         if (nextEntryGender == gender || nextEntryGender == 2) {
    //             next = entries[i][0];
    //             break;
    //         }
    //     };
    //     for (let i = idx - 1; i > -1; i--) {
    //         const prevEntryGender = entries[i][1][0];
    //         if (prevEntryGender == gender || prevEntryGender == 2) {
    //             prev = entries[i][0];
    //             break;
    //         }
    //     };

    //     return {next, prev};
    // }
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="grid photos" style={{ '--bs-gap': '1rem 1rem' } as React.CSSProperties}>
            {/* {randomizeAndSlice(fileNames, 3).map((item: string, index) => { */}
            {sorted.map((item, index) => {
                if (index >= 1) { class4 = class1 + class2; }
                return (<div className={class4}>
                    {/* <img src={item} className="img fluid" /> */}
                    <ResultsBox {...{ name: item[0], gender: item[1][0], idx: index, entries: sorted }} />
                </div>)
            })}
        </div>
    );
}

export default HomeGallery;