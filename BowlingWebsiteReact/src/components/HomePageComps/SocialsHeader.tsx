import DivisionTitle from "../DivisionTitle";
function SocialsHeader() {
    return (
        <div className='socialsHeader' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '100%'}}>
                <DivisionTitle title={"SOCIALS"} red={true} />
            </div>
            <div className='socialLink' style={{ display: 'flex', gap: '10px' }}>
                <a href="https://www.instagram.com/uwbowlingteam/"><h2>INSTAGRAM</h2></a>
                <a href="https://www.facebook.com/BowlUW/"><h2>FACEBOOK</h2></a>
            </div>
        </div>
    )
}

export default SocialsHeader;