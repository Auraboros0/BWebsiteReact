import GalleryEntry from "./GalleryEntry"
function GalleryColumn(props: {urls: [string, boolean][]}) {
    return (
        <div className='galleryColumn' style={{width: '30vw'}}>
            {props.urls.map((item) => (
                <GalleryEntry url={item} />
            ))}
        </div>
    )
}

export default GalleryColumn