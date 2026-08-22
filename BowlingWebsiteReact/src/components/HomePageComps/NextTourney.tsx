import type { tournament } from "../../Interfaces/tournament";
// import schedule from '../../data/schedule.ts;
import { scheduleM } from "../../data/scheduleM";
import { scheduleW } from "../../data/scheduleW";
import DivisionTitle from "../DivisionTitle";
import useConditionalRender from "../../Scripts/useConditionalRender";


// Returns the current or nearest tournament from a schedule
let live: boolean = false;
function getDate(schedule: tournament[]) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayTime = today.getTime();
    let nearest: tournament = schedule[0];

    for (const tourney of schedule) {
        const tourneyStart = tourney.time[0].getTime();
        const tourneyEnd = tourney.time[1].getTime()
        if (tourneyStart <= todayTime && todayTime <= tourneyEnd) { nearest = tourney; live = true; break;}
        if (tourneyEnd < todayTime) { continue; }
        if (tourneyStart >= nearest.time[0].getTime()) { continue; }
        if (tourneyStart > todayTime) { nearest = tourney}
    }

    return nearest;
}

const nextM = getDate(scheduleM);
const nextW = getDate(scheduleW);

function compareDates(tourney1: tournament, tourney2: tournament) {
    const tourneyStart1 = tourney1.time[0].getTime();
    const tourneyEnd1 = tourney1.time[1].getTime();
    const tourneyStart2 = tourney2.time[0].getTime();

    if (tourneyStart1 <= tourneyStart2 && tourneyStart2 <= tourneyEnd1) {
        return true;
    }
        return false;
}

function createText(tourney: tournament, tourney2?: tournament) {

    if (tourney.time[1].getTime() < new Date().getTime()) { 
        const tournamentString = '';
        return {tournamentString}
    }

    const startMonth = tourney.time[0].getMonth() + 1;
    const startDay = tourney.time[0].getDate();
    const endMonth = tourney.time[1].getMonth() + 1;
    const endDay = tourney.time[1].getDate();
    const liveString = 'HAPPENING NOW!'
    const upcomingString = 'Next Competition:'
    const startString = live ? liveString : upcomingString
    const tournamentString = `${startString} ${tourney.name} @ ${tourney.center[0]} in ${tourney.city[0].city}, ${tourney.city[0].state} from ${startMonth}/${startDay} - ${endMonth}/${endDay}`
    const tournamentStringAlt = `${startString} ${tourney.name} ! Men @ ${tourney.center[0]} in ${tourney.city[0].city}, ${tourney.city[0].state} | Women @ ${tourney2?.center[0]} in ${tourney2?.city[0].city}, ${tourney2?.city[0].state} from ${startMonth}/${startDay} - ${endMonth}/${endDay}`
    if (tourney2) { return {tournamentString, tournamentStringAlt}}
    return {tournamentString}
}

function NextTourney() {
    const { isMd } = useConditionalRender();
    let tourneyStrings: [string, string] = ['', ''];
    if (compareDates(nextM, nextW) || compareDates(nextW, nextM)) { // If the dates coincide
        if (nextM.name === nextW.name) { // If both tournaments are under the same title
            if (nextM.center[0] === nextW.center[0]) { // And they're at the same center
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
                    <DivisionTitle title={item} red={false} isMobile={!isMd} />
                )
            })}
        </div>
    )
}

export default NextTourney