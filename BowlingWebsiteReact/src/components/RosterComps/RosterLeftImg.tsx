interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

function RosterLeftImg(props: player) {
    const val = Math.floor((Math.random()  * (3)) + 1)
    return (
        <div className="leftHalfEntry" style={{display: "flex"}}>
        <img className="playerIMG" src={`/public/assets/PlayerHeadshots/placeholder${props.name}.jpg`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `/public/assets/PlayerHeadshots/placeholder${val}.jpg`;
                }
                } />
                <img className="stateIMG" src={`/public/assets/States/${props.state}.png`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/public/assets/States/qmark.png';
                }
            } />
        </div>
    )
}

export default RosterLeftImg;