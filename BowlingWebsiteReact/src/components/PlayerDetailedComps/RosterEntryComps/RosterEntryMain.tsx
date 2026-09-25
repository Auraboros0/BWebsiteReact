import type { player } from "../../../Interfaces/player";
import REMdetails from "./REMdetails";
import RosterLeftImg from "../../RosterComps/RosterLeftImg";
import RosterRight from "../../RosterComps/RosterRight";
import useConditionalRender from "../../../Scripts/useConditionalRender";
import REMTopBar from "./REMTopBar";
function RosterEntryMain(props: player) {
    const { isMd } = useConditionalRender();
    return (
        <>
            {isMd && <div className='REMContainer'>
                {/* <REMTopBar /> */}
                <div className="rosterEntryMain">
                    <div style={{ position: "relative", width: "250px" }}><RosterLeftImg {...props} />
                        <div className='nameAndStyle'>
                            <h2>{props.name}</h2>
                            <h3>{props.style}</h3>
                        </div></div>
                    <div style={{ width: "100%", height: 'inherit'}}>
                            <REMdetails {...props} />
                    </div>
                </div>
            </div>}

            {!isMd && <div className="rosterEntryMain" style={{ position: 'relative', flexDirection: 'column' }}>
                <div style={{marginTop: '110px', width: '100%'}}>
                    <div style={{ position: "relative", width: "100%", height: 'fit-content', alignItems: 'center', top: '0px', left: '0px', paddingBottom: '4px', borderBottom: '8px solid white' }}>
                        <RosterLeftImg {...props} />
                        <div className='nameAndStyle' style={{ left: '150px', top: '-100px' }}>
                            <h2>{props.name}</h2>
                            <h3>{props.style}</h3>
                        </div></div>
                    <div style={{ width: "100%", marginLeft: '4px' }}>
                        <div>
                            <h2>{props.year}</h2>
                            <h2>{props.major}</h2>
                            <h2>{props.hometown}</h2>
                            <h2>Fav {props.favoriteXYZ[0]}: {props.favoriteXYZ[1]}</h2>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default RosterEntryMain