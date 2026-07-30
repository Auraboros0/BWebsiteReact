// Add to this list as needed.
import type { stateBoundary } from "../Interfaces/stateBoundary"
function createBounds(
    state: string,
    north: number,
    east: number,
    south: number,
    west: number,
) {
    const bounds: stateBoundary = {
        state: state,
        north: north,
        east: east,
        south: south,
        west: west,
        width: Math.abs(east - west),
        height: Math.abs(north - south)
    }

    return bounds
}


export const StateBounds: stateBoundary[] = [
    createBounds(
        "WI",
        47.3098,
        -86.7630,
        42.4919,
        -92.8894,
    ),
    createBounds(
        "IL",
         42.5083,
        -87.4948,
        36.9703,
        -91.5131,
    ),
    createBounds(
        "MN",
        49.3844,
        -89.4917,
        43.4994,
        -97.2392,
    )
]

