import DivisionTitle from "../DivisionTitle";
import useConditionalRender from "../../Scripts/useConditionalRender";
function SocialsHeader() {
    const { isMd } = useConditionalRender();
    return (
        <>
            {isMd && <div className='socialLink' style={{
                position: 'absolute',
                width: '100%',
                height: 'calc(100%)',
                top: '0',
                left: '0px',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                padding: '2px',
                boxSizing: 'border-box',
                backgroundImage: `url(/public/assets/Textures/redDashReverse.png)`,
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top right'
            }}>
                <a href="https://www.instagram.com/uwbowlingteam/"
                    target="_blank"
                    rel="noopener noreferrer"><h2>INSTAGRAM</h2></a>
                <a href="https://www.facebook.com/BowlUW/"
                    target="_blank"
                    rel="noopener noreferrer"><h2>FACEBOOK</h2></a>
            </div>}
        </>
    )
}

export default SocialsHeader;