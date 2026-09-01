import '../../css/gallery.scss'
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

function GalleryEntry(props: { url: [string, boolean],
     onPlay: (video: HTMLVideoElement) => void,
     registerVideo: (video: HTMLVideoElement) => void,
     unregisterVideo: (video: HTMLVideoElement) => void })
    {
    const [show, setShow] = useState(false);
    const self = useRef<HTMLVideoElement>(null)
    const API = import.meta.env.VITE_API_URL;
    const mediaURL = props.url[1] ? `${API}/media/video/${props.url[0]}` : `${API}/media/image/${props.url[0]}`

    useEffect(() => {
        const video = self.current;

        if (!video) return;

        props.registerVideo(video);

        return () => {
            props.unregisterVideo(video);
        };
    }, []);

    return (
        <div className="instaImage" style={{ backgroundColor: 'white' }}>
            {!props.url[1] && <img onClick={() => setShow(!show)}
             style={{ width: '100%' }}
              src={mediaURL} />}

            {props.url[1] && <video ref={self} onClick={() => props.onPlay(self.current!)}
             style={{ width: '100%' }}
              src={mediaURL} />}

            <h2>{props.url[0]}</h2>
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
        if (video.paused) {
            video.play();
            for (const other of videoRefSet.current) {
                if (other != video) {
                    other.pause();
                }
            }
        } else {
            video.pause();
        }
    }

    const [mediaURLs, setMediaURLs] = useState<[string, boolean][]>([]);
    const columnComps: [React.ReactNode[], React.ReactNode[], React.ReactNode[]] = [[], [], []];
    const videoRefSet = useRef(new Set<HTMLVideoElement>());

    mediaURLs.map((i, index) => {
        columnComps[index % 3].push(<GalleryEntry key={(index * 3) + index % 3} url={i} onPlay={playOnePauseOthers} registerVideo={registerVideo} unregisterVideo={unregisterVideo}/>);
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