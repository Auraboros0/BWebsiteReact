import type { tournament } from "../Interfaces/tournament"
export const scheduleM: tournament[] = [
    {
       tournamentID: 0,
       gender: 0,
        name: "Placeholder Derby",
        time: [new Date(2026, 9, 5), new Date(2026, 9, 6)],
        hostID: 0,
        city: [["Place", "WI"]],
        center: ["Who Lanes"],
        teamIDs: [
            0,
            1,
            2,
        ],
    },
    {
       tournamentID: 1,
       gender: 0,
        name: "Placeholder Juvenile Fillies",
        time: [new Date(2026, 12, 13), new Date(2026, 12, 14)],
        hostID: 2,
        city: [["Who", "WI"]],
        center: ["string"],
        teamIDs: [
            0,
            2,
            5,
            8,
        ],
    },
]