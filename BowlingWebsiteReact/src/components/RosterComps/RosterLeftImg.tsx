interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

function RosterLeftImg(props: player) {
    return (
        <div className="leftHalfEntry" style={{display: "flex"}}>
        <img className="playerIMG" src={`/public/assets/PlayerHeadshots/${props.name}.png`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/public/assets/TestImages/1.png';
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