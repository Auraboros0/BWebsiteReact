import GalleryEntry from "./GalleryEntry"
function GalleryColumn({urls}) {
    return (
        <div className='galleryColumn' style={{width: '30vw'}}>
            {urls.map((item) => (
                <GalleryEntry url={item} />
            ))}
        </div>
    )
}

export default GalleryColumn