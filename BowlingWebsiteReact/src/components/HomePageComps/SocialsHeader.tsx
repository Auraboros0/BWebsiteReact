import DivisionTitle from "../DivisionTitle";
import useConditionalRender from "../../Scripts/useConditionalRender";
function SocialsHeader() {
    const { isMd } = useConditionalRender();
    return (
        <div className='socialsHeader' style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '100%'}}>
                <DivisionTitle title={"SOCIALS"} red={true} filename={'stateAccent.png'}/>
            </div>
            {isMd && <div className='socialLink' style={{ position: 'absolute', top: '0', right: '0', display: 'flex', gap: '10px' }}>
                <a href="https://www.instagram.com/uwbowlingteam/"><h2>INSTAGRAM</h2></a>
                <a href="https://www.facebook.com/BowlUW/"><h2>FACEBOOK</h2></a>
            </div>}
        </div>
    )
}

export default SocialsHeader;