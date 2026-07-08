function BigPlayerImage({ name }) {
    const imageURL: string = `/public/assets/PlayerLargeImages/${name}.png`;
    return (
        <div className="bigPlayerImage">
            <img src='/public/assets/textures/grunge.jpg'></img>
        </div>
    )
}

export default BigPlayerImage