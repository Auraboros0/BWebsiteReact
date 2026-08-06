import { Suspense } from "react";
import { useParams } from "react-router"

async function getInfo(gender: string, id: string) {
    const data = await fetch(`/api/detailed/${gender}/${id}`);
    const toReturn = await data.json();
    console.log(toReturn);
    return toReturn;
}

getInfo("mens", "Joaquin Herrera");

function REMTopStats({ref}) {
    const { gender, id } = useParams();
    const playerStats = getInfo(gender!, id!);
    // console.log(playerStats);
    // console.log("n")
    return (
        <div ref={ref} style={{position: 'absolute', top: '33px', backgroundColor: 'black', color: 'white', height: '300px', width: '100%', zIndex: '0', overflowY: 'auto'}}>
            <Suspense>
            <h1>PLAYER DATA GOES HERE</h1>
            </Suspense>
        </div>
    )
}

export default REMTopStats