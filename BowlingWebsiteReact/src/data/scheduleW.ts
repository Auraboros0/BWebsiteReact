import type { tournament } from "../Interfaces/tournament"
export const scheduleW: tournament[] = [
    {
        tournamentID: 0,
        name: "Great Lakes Bowling Conference I",
        gender: 1,
        time: [new Date(2026, 9, 10), new Date(2026, 9, 11)],
        hostSlug: "minnesota",
        city: [{
            street: "2200 Mounds View Blvd",
            city: "Mounds View",
            state: "MN",
            zip: 55112
        }],
        center: ["Mermaid Lanes"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
    {
        tournamentID: 1,
        name: "Great Lakes Bowling Conference II",
        gender: 1,
        time: [new Date(2026, 9, 24), new Date(2026, 9, 25)],
        hostSlug: "wisconsin",
        city: [{
            street: "4711 Farwell St",
            city: "McFarland",
            state: "WI",
            zip: 53558
        }],
        center: ["Spartan Bowl"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
    {
        tournamentID: 2,
        name: "Titan Invite",
        gender: 1,
        time: [new Date(2026, 10, 21), new Date(2026, 10, 22)],
        hostSlug: "wis-oshkosh",
        city: [{
            street: "2929 Allied St",
            city: "Green Bay",
            state: "WI",
            zip: 54304
        }],
        center: ["Ashwaubenon Bowling Alley"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
    {
        tournamentID: 3,
        name: "Great Lakes Bowling Conference III",
        gender: 1,
        time: [new Date(2027, 0, 24), new Date(2027, 0, 25)],
        hostSlug: "rock-valley",
        city: [{
            street: "7171 Cherryvale N Blvd",
            city: "Rockford",
            state: "IL",
            zip: 61112
        }],
        center: ["Cherry Bowl"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
    {
        tournamentID: 4,
        name: "Great Lakes Bowling Conference IV",
        gender: 1,
        time: [new Date(2027, 0, 30), new Date(2027, 0, 31)],
        hostSlug: "wis-eau-claire",
        city: [{
            street: "4007 E State St",
            city: "Weston",
            state: "WI",
            zip: 61108
        }],
        center: ["Weston Lanes"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
]