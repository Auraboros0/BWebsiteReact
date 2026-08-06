function BigPlayerImage({ name }) {
    const imageURL: string = `/public/assets/PlayerLargeImages/${name}.png`;
    return (
        <div className="bigPlayerImage">
            <img src='/public/assets/textures/grunge.jpg'></img>
            {/* <h1 style={{position: "absolute", top: '50%', left: '50%', color:'white', zIndex: '2'}}>Coming Soon</h1> */}
        </div>
    )
}

export default BigPlayerImage