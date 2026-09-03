import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import DivisionTitle from "../DivisionTitle";

function GalleryEntry(props: {
    url: [string, boolean],
    onPlay: (video: HTMLVideoElement) => void,
    registerVideo: (video: HTMLVideoElement) => void,
    unregisterVideo: (video: HTMLVideoElement) => void
}) {
    const [show, setShow] = useState(false);
    const [paused, setPaused] = useState(true);
    const self = useRef<HTMLVideoElement>(null)
    const API = import.meta.env.VITE_API_URL;
    const mediaURL = props.url[1] ? `${API}/media/video/${props.url[0]}` : `${API}/media/image/${props.url[0]}`

    const mute = () => {
        self.current!.muted = !self.current?.muted;
    }

    // Adding video to Gallery's video set
    useEffect(() => {
        const video = self.current;

        if (!video) return;

        props.registerVideo(video);

        return () => {
            props.unregisterVideo(video);
        };
    }, []);

    return (
        <div className={`instaImage gall ${paused ? '' : 'active'}`} style={{position: 'relative' }}>

            <h2 style={{color: 'white', fontFamily: 'Iosevka', padding: '4px'}}>{props.url[0]}</h2>

            {/* Image */}
            {!props.url[1] && <img onClick={() => setShow(!show)}
                style={{ width: '100%' }}
                src={mediaURL} 
            />}

            {/* Video */}
            {props.url[1] &&
                <div className={`verticalVideo`}>
                    <video controls ref={self}
                        onPlay={() => {
                            // props.onPlay(self.current!);
                            props.onPlay(self.current!);
                            setPaused(false);
                        }}
                        onPause={() => {
                            setPaused(true);
                        }}
                        onEnded={() => {
                            self.current!.currentTime = 0;
                        }}
                        onClick={() => {
                            props.onPlay(self.current!);
                            console.log("THING");
                        }}
                        src={mediaURL} />
                </div>}

        </div>
    )
}

export default GalleryEntry;