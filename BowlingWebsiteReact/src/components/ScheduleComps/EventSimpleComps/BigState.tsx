/*
Using StateBounds, I will place a star on the approximate location of each tournament.
This will require that for every city be represented as it's own object with coordinates.
I'll see if there is an API I can call to get this information and avoid entering in every coordinate by hand.
*/

import { StateBounds } from "../../../data/stateBounds"
function BigState({ state }) {
    const url = `/public/assets/States/${state}.png`
    return (
        <div className='bigStateContainer'>
            <img src={url} className='stateToTexture' />
            <div className='bigState' style={{
                background: 'white',
                backgroundSize: 'cover',
                mask: `url("${url}") center / contain no-repeat`,
                WebkitMask: `url(${url}) center / contain no-repeat`,
                WebkitTransform: 'scale(1.1) rotate(5deg)'
            }}>
            </div>
            <div className='bigState' style={{
                background: 'black',
                backgroundSize: 'cover',
                mask: `url("${url}") center / contain no-repeat`,
                WebkitMask: `url(${url}) center / contain no-repeat`,
                WebkitTransform: 'scale(1.05) rotate(5deg)'
            }}></div>
            <div className='bigState' style={{
                background: 'url("/public/assets/Textures/stateAccent.png")',
                backgroundSize: '50%',
                mask: `url("${url}") center / contain no-repeat`,
                WebkitMask: `url(${url}) center / contain no-repeat`,
                WebkitTransform: 'rotate(5deg)'
            }}>
            </div>
        </div>
    )
}

export default BigState