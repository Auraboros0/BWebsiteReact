function GenderedAbout( {male, text} ) {
    const class_name: string = male ? "exposition M" : "exposition F";
    const flexOption: string = male ? "flex-start" : "flex-end";
    return (
        <div className={class_name} style={{display: 'flex', justifyContent: `${flexOption}`, alignItems: 'center', gap: '20px', boxSizing: 'border-box'}}>
            
            {male && <div className='genderImage male'><img src='/public/assets/Textures/grunge.jpg' /></div>}
            {!male && <h2 style={{width: '60%', textAlign: 'right'}}>{text}</h2>}
            {male && <h2 style={{width: '60%', textAlign: 'left'}}>{text}</h2>}
            {!male && <div className='genderImage female'><img src='/public/assets/TestImages/1.png' /></div>}
        </div>
    )
}

export default GenderedAbout;