/*
Use the NCAA HenryGD API to get the logo for each host.
If the team is not in NCAA, search within assets folder.
*/

async function isNCAA(slug: string): Promise<Boolean> {
    const url = `https://ncaa-api.henrygd.me/logo/${slug}.svg`

    try {
        const response = await fetch(url, { method: "HEAD"});
        return response.ok;
    }
    catch {
        return false;
    }
}

/* The logo of a tournament's host. Calls the NCAA API to get the logo.
   If the school is not NCAA, scan /public/assets/mascots for the logo */
function HostLogo({hostSlug}) {

    const altSource = import.meta.glob(`/public/assets/Mascots/*.{png,jpg,jpeg}`, {eager: true});
    const altStrings = Object.keys(altSource)
    const fallbackString = altStrings.find(string => string.includes(hostSlug)) ?? '';

    return (
        <div className='hostLogo'>
            <img src={`https://ncaa-api.henrygd.me/logo/${hostSlug}.svg`}
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackString;
            }} />
            {/* <h1 style={{color: 'white', textAlign: 'center', alignItems: 'center'}}>Coming Soon</h1> */}
        </div>
    )
}

export default HostLogo;