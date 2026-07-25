import type { tournament } from "../../Interfaces/tournament";
// import schedule from '../../data/schedule.ts;
import { scheduleM } from "../../data/scheduleM";
import { scheduleW } from "../../data/scheduleW";
import DivisionTitle from "../DivisionTitle";


// Returns the current or nearest tournament from a schedule
let live: boolean = false;
function getDate(schedule: tournament[]) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayTime = today.getTime;
    let nearest: tournament = schedule[0];

    for (const tourney of schedule) {
        const tourneyStart = tourney.time[0].getTime;
        const tourneyEnd = tourney.time[1].getTime
        if (tourneyEnd < todayTime) { break; }
        if (tourneyStart >= nearest.time[0].getTime) { break; }
        if (tourneyStart > todayTime) { nearest = tourney}
        if (tourneyStart <= todayTime && todayTime <= tourneyEnd) { nearest = tourney; live = true;}
    }

    return nearest;
}

const nextM = getDate(scheduleM);
const nextW = getDate(scheduleW);

function compareDates(tourney1: tournament, tourney2: tournament) {
    const tourneyStart1 = tourney1.time[0].getTime;
    const tourneyEnd1 = tourney1.time[1].getTime;
    const tourneyStart2 = tourney2.time[0].getTime;

    if (tourneyStart1 <= tourneyStart2 && tourneyStart2 <= tourneyEnd1) {
        return true;
    }
        return false;
}

function createText(tourney: tournament, tourney2?: tournament) {
    const startMonth = tourney.time[0].getMonth();
    const startDay = tourney.time[0].getDate();
    const endMonth = tourney.time[1].getMonth();
    const endDay = tourney.time[1].getDate();
    const liveString = 'HAPPENING NOW!'
    const upcomingString = 'Next Competition'
    const startString = live ? liveString : upcomingString
    const tournamentString = `${startString}: ${tourney.name} @ ${tourney.center} in ${tourney.city} from ${startMonth}/${startDay} - ${endMonth}/${endDay}`
    const tournamentStringAlt = `${startString}: ${tourney.name} ! Men @ ${tourney.center[0]} in ${tourney.city[0][0]}, ${tourney.city[0][1]} | Women @ ${tourney2?.center[0]} in ${tourney2?.city[0][0]}, ${tourney2?.city[0][1]} from ${startMonth}/${startDay} - ${endMonth}/${endDay}`
    if (tourney2) { return {tournamentString, tournamentStringAlt}}
    return {tournamentString}
}

function NextTourney() {
    let tourneyStrings: [string, string] = ['', ''];
    if (compareDates(nextM, nextW) || compareDates(nextW, nextM)) { // If the dates coincide
        if (nextM.name === nextW.name) { // If both tournaments are under the same title
            if (nextM.center === nextW.center) { // And they're at the same center
                tourneyStrings[0] = createText(nextM).tournamentString;
            } else { // If they're at separate centers, use the alt text
                tourneyStrings[0] = createText(nextM, nextW).tournamentStringAlt ?? '';
            }
        } else { // Create two different texts if the tournaments are completely different.
            tourneyStrings[0] = createText(nextM).tournamentString;
            tourneyStrings[0] = tourneyStrings[0].replace("Next Competition:", "Upcoming Tournament! Men @ ")
            tourneyStrings[1] = createText(nextW).tournamentString;
            tourneyStrings[1] = tourneyStrings[1].replace("Next Competition:", "Upcoming Tournament! Women @ ")
        }
    }

    return (
        <div>
            {tourneyStrings.filter(Boolean).map((item: string) => {
                return (
                    <DivisionTitle title={item} red={false} />
                )
            })}
        </div>
    )
}

export default NextTourney