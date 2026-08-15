import type { player } from "../../../Interfaces/player";
import REMdetails from "./REMdetails";
import RosterLeftImg from "../../RosterComps/RosterLeftImg";
import RosterRight from "../../RosterComps/RosterRight";
import useConditionalRender from "../../../dataScripts/useConditionalRender";
import REMTopBar from "./REMTopBar";
function RosterEntryMain(props: player) {
    const { isMd } = useConditionalRender();
    return (
        <div>
            {isMd && <div className='REMContainer'>
                <REMTopBar />
            <div className="rosterEntryMain">
                <div style={{ position: "relative", width: "250px" }}><RosterLeftImg {...props} />
                    <div className='nameAndStyle'>
                        <h2>{props.name}</h2>
                        <h3>{props.style}</h3>
                    </div></div>
                <div style={{ width: "100%" }}>
                    <div>
                        <REMdetails {...props} />
                    </div>
                </div>
                </div>
            </div>}

            {!isMd && <div className="rosterEntryMain d-md-none">
                <div style={{ position: "relative", width: "350px" }}><RosterLeftImg {...props} />
                    <div className='nameAndStyle'>
                        <h2>{props.name}</h2>
                        <h3>{props.style}</h3>
                    </div></div>
                <div style={{ width: "100%" }}>
                    <div>
                        <h2>{props.year}</h2>
                        <h2>{props.major}</h2>
                        <h2>{props.hometown}</h2>
                        <h2>Fav {props.favoriteXYZ[0]}: {props.favoriteXYZ[1]}</h2>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default RosterEntryMain