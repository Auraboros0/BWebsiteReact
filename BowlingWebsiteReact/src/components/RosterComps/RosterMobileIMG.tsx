function RosterMobileIMG( {gender}) {
    const URL = `/public/assets/GenderedTeamPhotos/${gender}.png`;
    return (
        <div className="mobileRosterIMG">
            <img src={'/public/assets/Textures/grunge.jpg'}></img>
        </div>
    )    
}

export default RosterMobileIMG