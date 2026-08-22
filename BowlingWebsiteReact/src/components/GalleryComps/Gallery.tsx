import GalleryEntry from "./GalleryEntry"
import '../../css/gallery.scss'
import GalleryColumn from "./GalleryColumn"
function Gallery() {
    const columnStrings: [string[], string[], string[]] = [[], [], []]
        Array.from({ length: 9 }).map((_i, index) => (
            columnStrings[index % 3].push(`https://picsum.photos/${(index + 1) * 100}/${400 - (index + 1) * 30}?random=%${index}`)
        ))
    return (
        <div className="gallery">
            <GalleryColumn urls={columnStrings[0]} />
            <GalleryColumn urls={columnStrings[1]} />
            <GalleryColumn urls={columnStrings[2]} />
        </div>
    )
}

export default Gallery