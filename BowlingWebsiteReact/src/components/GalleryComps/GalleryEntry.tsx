function GalleryEntry({url}) {
    return (
        <div className="g-col-4 galleryEntry" style={{width: '30vw'}}>
            <img style={{width: '100%'}}src={url} />
        </div>
    )
}

export default GalleryEntry;