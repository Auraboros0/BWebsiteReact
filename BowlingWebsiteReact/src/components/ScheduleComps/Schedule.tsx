import type { tournament } from "../../Interfaces/tournament"
import { scheduleM } from "../../data/scheduleM"
import { scheduleW } from "../../data/scheduleW"
import EventSimple from "./EventSimple";
import '../../css/schedule.scss';

/*
This will just be used to track whether or not a tournament has been added to the list.
*/
interface tourneyScanner {
    tourney: tournament;
    marked: boolean;
}
function scanSchedules() {
    const combined: tournament[] = []
    const mScanner: tourneyScanner[] = [];
    const wScanner: tourneyScanner[] = [];

    for (const mTourney of scheduleM) {
        mScanner.push({tourney: mTourney, marked: false})
    }
    for (const wTourney of scheduleW) {
        wScanner.push({tourney: wTourney, marked: false})
    }

    /* 
    This segment will identify when a tournament exists in both team's schedules and mark them off
    before modifying & adding them to the tournament list.
    */
    for (const mTourney of scheduleM) {
        for (const wTourney of scheduleW) {
            if (mTourney.name === wTourney.name) {
                const currentTourney = mTourney
                const toMarkA = mScanner.find(t => t.tourney.name === mTourney.name);
                const toMarkB = wScanner.find(t => t.tourney.name === mTourney.name);
                if (typeof toMarkA != "undefined" && typeof toMarkB != "undefined") { 
                    toMarkA.marked = true;
                    toMarkB.marked = true;
                }
                if (mTourney.center === wTourney.center) {
                    currentTourney.gender = 2;
                    combined.push(currentTourney);
                    break;
                } else {
                    currentTourney.gender = 2;
                    currentTourney.center = [...mTourney.center, ...wTourney.center];
                    currentTourney.city = [...mTourney.city, ...wTourney.city]
                    combined.push(currentTourney);
                    break;
                }
            }
        }
    }

    for (const mScanned of mScanner) {
        if (!mScanned.marked) {
            mScanned.marked = true;
            combined.push(mScanned.tourney)
        }
    }

    for (const wScanned of wScanner) {
        if (!wScanned.marked) {
            wScanned.marked = true;
            combined.push(wScanned.tourney);
        }
    }

    const sortedCombined = combined.toSorted((a, b) => a.time[0].getTime() - b.time[0].getTime());

    return sortedCombined;
}

function Schedule() {
    const combined = scanSchedules();
    return (
        <div className='schedule'>
            {combined.map((item: tournament) => {
                return (<EventSimple {...item}/>)
            })}
        </div>
    )
}

export default Schedule