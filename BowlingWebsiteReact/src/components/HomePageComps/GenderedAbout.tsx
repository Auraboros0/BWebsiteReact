import useConditionalRender from "../../Scripts/useConditionalRender";
import SFImageCopy from "../UniversalUIComps/SFImageCopy";
function GenderedAbout({ male, text }) {
    const class_name: string = male ? "exposition M" : "exposition F";
    const flexOption: string = male ? "flex-start" : "flex-end";
    const { isMd } = useConditionalRender();
    return (
        <div>
            {isMd && <div className={class_name} style={{ display: 'flex', justifyContent: `${flexOption}`, alignItems: 'center', gap: '20px', boxSizing: 'border-box' }}>
                {/* {male && <div className='genderImage male'><img src='/public/assets/Textures/grunge.jpg' /></div>} */}
                {male && <SFImageCopy url={'/public/assets/Textures/grunge.jpg'} width={'50%'} />}
                {!male && <h2 style={{ width: '40%', textAlign: 'right' }}>{text}</h2>}
                {male && <h2 style={{ width: '40%', textAlign: 'left' }}>{text}</h2>}
                {!male && <SFImageCopy url={'/public/assets/TestImages/1.png'} width={'50%'} />}
                {/* {!male && <div className='genderImage female'><img src='/public/assets/TestImages/1.png' /></div>} */}
            </div>}
            {!isMd && <div className={class_name} style={{ display: 'flex', justifyContent: `${flexOption}`, alignItems: 'center', gap: '20px', boxSizing: 'border-box' }}>
                {!male && <h2 style={{ width: '100%', textAlign: 'left' }}>{text}</h2>}
                {male && <h2 style={{ width: '100%', textAlign: 'left' }}>{text}</h2>}
            </div>}
        </div>
    )
}

export default GenderedAbout;