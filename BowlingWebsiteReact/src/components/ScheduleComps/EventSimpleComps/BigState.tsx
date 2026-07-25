/*
Using StateBounds, I will place a star on the approximate location of each tournament.
This will require that for every city be represented as it's own object with coordinates.
I'll see if there is an API I can call to get this information and avoid entering in every coordinate by hand.
*/

import { StateBounds } from "../../../data/stateBounds"
function BigState({state}) {
    const url = `/public/assets/States/${state}.png`
    return (
        <div className='bigState'>
            <img src={url} />
        </div>
    )
}

export default BigState