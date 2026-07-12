import type { player } from "../../../Interfaces/player"

function REMdetails(props: player) {

    const xyz = [props.favoriteXYZ[0], props.favoriteXYZ[1]]
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding:"4px"}}>
            <div className='REMdetails' style={{width: "40%"}}>
                <h2>Year: {props.year}</h2>
                <h2>Major: {props.major}</h2>
            </div>
            <div className='REMdetails' style={{width: "40%"}}>
                <h2>Hometown: {props.hometown}</h2>
                <h2>Favorite {xyz[0]}: {xyz[1]}</h2>
            </div>
        </div>
    )
}

export default REMdetails