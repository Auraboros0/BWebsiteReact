import type { player } from "../../../Interfaces/player"

function REMdetails(props: player) {

    const xyz = [props.favoriteXYZ[0], props.favoriteXYZ[1]]
    return (
        <div style={{display: "flex", justifyContent: "flex-start", flexDirection: 'column', flexGrow: '1', padding:"4px"}}>
            <div className='REMdetails' style={{}}>
                <h2>Year: {props.year}</h2>
                <h2>Major: {props.major}</h2>
                <h2>Hometown: {props.hometown}</h2>
                <h2>Favorite {xyz[0]}: {xyz[1]}</h2>
            </div>
        </div>
    )
}

export default REMdetails