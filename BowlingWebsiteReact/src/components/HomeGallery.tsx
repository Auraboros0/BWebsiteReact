import type { tournament } from "../Interfaces/tournament";
import ResultsBox from "./ResultsDisplayComps/ResultsBox";
import { useState, useEffect } from "react";
import type { tournamentEntry } from "./ResultsDisplayComps/ResultsBoxContainer";

function randomizeAndSlice(filenames: string[], count: number) {
    const toReturn = filenames.sort(() => Math.random() - 0.5).slice(0, count);
    return toReturn;
}

export interface entryWithNextAndPrev {
    entry: tournamentEntry;
    prev: [string, string];
    next: [string, string];
}

/* Populates the home page with links to tournament results */
function HomeGallery(props: { list: Record<string, [number, string]> }) {
    const modules = import.meta.glob('/public/assets/TestImages/*.{png,jpg,jpeg}', { eager: true });
    const [sorted, setSorted] = useState<tournamentEntry[]>([]);
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