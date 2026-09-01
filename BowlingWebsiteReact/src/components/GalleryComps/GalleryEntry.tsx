import { Modal, Button } from "react-bootstrap";
import { useState, useRef } from "react";
function GalleryEntry(props: {url: [string, boolean]}) {
    const [show, setShow] = useState(false);
    const API = import.meta.env.VITE_API_URL;
    const mediaURL = props.url[1] ? `${API}/media/video/${props.url[0]}` : `${API}/media/image/${props.url[0]}`

    const videoRef = useRef<HTMLVideoElement>(null);
    
        const PlayPause = () => {
            if (videoRef.current!.paused) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        }
    console.log(mediaURL);
    return (
        <div className="g-col-4 galleryEntry" style={{width: '30vw'}}>
            {!props.url[1] && <img onClick={() => setShow(!show)} style={{width: '100%'}}src={mediaURL} />}
            {props.url[1] && <video ref={videoRef} onClick={() => PlayPause()} style={{width: '100%'}}src={mediaURL} />}
        </div>
    )
}

export default GalleryEntry;