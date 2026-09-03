import '../../css/gallery.scss'
import GalleryEntry from './GalleryEntry';
import { fetchWithRetry } from "../../Scripts/fetchWithRetry";
import { useEffect, useState, useRef } from "react";
const endpoint = `/api/gallery`

async function getData() {
    const data = await fetchWithRetry(
        () => fetch(endpoint),
        5
    )
    const dataJSON = await data.json();
    return dataJSON;
}

function MuteButton(props: { onMute: () => void }) {
    return (
        <div onClick={props.onMute} style={{ position: 'absolute', bottom: '0', right: '0' }}>
            <button>MUTE BUTTON</button>
        </div>
    )
}

function GalleryColumn(props: { comps: React.ReactNode[] }) {
    return (
        <div className='instaColumn' style={{ width: '30vw' }}>
            {props.comps.map((item, index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
        </div>
    )
}

function Gallery() {


    // ALL THESE FUNCTIONS ARE FOR GalleryEntry
    // Adding video to Gallery's video set
    const registerVideo = (video: HTMLVideoElement) => {
        videoRefSet.current.add(video);
    };

    // Removing video from Gallery's video set
    const unregisterVideo = (video: HTMLVideoElement) => {
        videoRefSet.current.delete(video);
    };

    // Pausing all other videos within the video set upon playing one
    const playOnePauseOthers = (video: HTMLVideoElement) => {
        // if (video.paused) {
            // video.play();
            for (const other of videoRefSet.current) {
                if (other != video) {
                    other.pause();
                }
            }
    }

    const [mediaURLs, setMediaURLs] = useState<[string, boolean][]>([]);
    const columnComps: [React.ReactNode[], React.ReactNode[], React.ReactNode[]] = [[], [], []];
    const videoRefSet = useRef(new Set<HTMLVideoElement>());

    mediaURLs.map((i, index) => {
        columnComps[index % 3].push(<GalleryEntry key={(index * 3) + index % 3} url={i} onPlay={playOnePauseOthers} registerVideo={registerVideo} unregisterVideo={unregisterVideo} />);
    })

    useEffect(() => {
        // Fetches media and creates a combined array from them
        const setData = async () => {
            const data = await getData();
            const videos = await data.videos;
            const images = await data.images;
            const videoArray = videos.map(vid => [vid, true]);
            const imageArray = images.map(img => [img, false]);
            const allArray = [...imageArray, ...videoArray].toSorted((a, b) => a - b);
            setMediaURLs(allArray);
            console.log(data)
        }
        setData();
    }, [])

    return (
        <div className="insta photos">
            <GalleryColumn comps={columnComps[0]} />
            <GalleryColumn comps={columnComps[1]} />
            <GalleryColumn comps={columnComps[2]} />
        </div>
    )
}

export default Gallery