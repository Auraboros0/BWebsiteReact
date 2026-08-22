import { scanSchedules } from "../ScheduleComps/Schedule"
import type { tournament } from "../../Interfaces/tournament"
import { scheduleM } from "../../data/scheduleM";
import { scheduleW } from "../../data/scheduleW";

function getNearestTourney(schedule: tournament[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    let nearest: tournament[] = [schedule[0]];
    let live: boolean = false;

    for (const tourney of schedule) {
        if (tourney == nearest[0]) { continue; }
        const tourneyStart = tourney.time[0].getTime();
        const tourneyEnd = tourney.time[1].getTime()
        if (tourneyEnd < todayTime) {continue;}
        if (tourneyStart < nearest[0].time[0].getTime()) {nearest = [tourney]}
        if (tourneyStart == nearest[0].time[0].getTime()) {nearest.push(tourney)};
        // if (tourneyStart < nearest[0].time[0].getTime()) {nearest = []}
        // if (tourneyStart <= todayTime && todayTime <= tourneyEnd) { nearest.push(tourney); live = true; continue; }
        // if (tourneyEnd < todayTime) { continue; }
        // if (tourneyStart >= nearest[0].time[0].getTime()) { continue; }
        // if (tourneyStart > todayTime) { nearest.push(tourney) }
    }

    return {nearest, live};
}

function createString(tournaments: tournament[]) {
    const stringArray: string[] = []
    for (const tourney of tournaments) {
        let sameCity: boolean = false;
        let sameCenter: boolean = false;
        const startMonth = tourney.time[0].getMonth() + 1;
        const startDay = tourney.time[0].getDate();
        const endMonth = tourney.time[1].getMonth() + 1;
        const endDay = tourney.time[1].getDate();
        let male: boolean = false;

        const liveString = "HAPPENING NOW!"
        const upcomingString = "Next competition:"
        let retString: string = "";

        if (tourney.city.length > 1) { // If both teams are competing
            if (tourney.city[0].city === tourney.city[1].city) { sameCity = true; }
            if (tourney.center[0] === tourney.center[1]) { sameCenter = true }
        }

        if (tourney.gender != 2) {
            if (tourney.gender == 0) { male = true }
            if (tourney.gender == 1) { male = false }
        }

        if (tourney.gender == 2) {
            if (sameCenter) {
                retString = `${tourney.name} ${startMonth}/${startDay} - ${endMonth}/${endDay} | ${tourney.center[0]} | ${tourney.city[0].city}, ${tourney.city[0].state}`
            }
            else {
                retString = `${tourney.name} ${startMonth}/${startDay} - ${endMonth}/${endDay} | Men @ ${tourney.center[0]} | Women @ ${tourney.center[1]}`
            }
        }
        else if (male) {
            retString = `Men @ ${tourney.name} | ${tourney.center[0]} | ${tourney.city[0].city}, ${tourney.city[0].state} | ${startMonth}/${startDay} - ${endMonth}/${endDay}`
        }
        else {
            retString = `Women @ ${tourney.name} | ${tourney.center[0]} | ${tourney.city[0].city}, ${tourney.city[0].state} | ${startMonth}/${startDay} - ${endMonth}/${endDay}`
        }
        stringArray.push(retString);
    }
    return stringArray;
}

export function createNextTourneyString() {
    const schedule = scanSchedules();
    const next = getNearestTourney(schedule);
    const strings: string[] = createString(next.nearest);
    const live = next.live
    let returnString = ""
    for (const s of strings) {
        returnString += `|${s}|`;
    }
    return {strings, live}
}