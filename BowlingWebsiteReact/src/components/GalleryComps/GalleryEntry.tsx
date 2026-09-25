import { Modal, Button } from "react-bootstrap";
import useConditionalRender from "../../Scripts/useConditionalRender";
import { useState, useRef, useEffect } from "react";
import DivisionTitle from "../DivisionTitle";

function CenteredPlayArrow() {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', zIndex: '2', pointerEvents: 'none'}}>
            <h1 style={{fontSize: '96px'}}>
            &#x25B6;
            </h1>
        </div>
    )
}

function GalleryEntry(props: {
    url: [string, boolean],
    onPlay: (video: HTMLVideoElement) => void,
    onMute: (video: HTMLVideoElement) => void,
    registerVideo: (video: HTMLVideoElement) => void,
    unregisterVideo: (video: HTMLVideoElement) => void
}) {
    const { isMd } = useConditionalRender();
    const [show, setShow] = useState(false);
    const [paused, setPaused] = useState(true);
    const self = useRef<HTMLVideoElement>(null)
    const API = import.meta.env.VITE_API_URL;
    const mediaURL = props.url[1] ? `${API}/media/video/${props.url[0]}` : `${API}/media/image/${props.url[0]}`

    const handleTap = () => {
        if (self.current?.paused) {
            self.current.play();
        } else {
            self.current?.pause();
        }
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
        <div className={`instaImage gall ${paused ? '' : 'active'}`} style={{ position: 'relative' }}>

            <h2 style={{ color: 'white', fontFamily: 'Iosevka', padding: '4px' }}>{props.url[0]}</h2>

            {/* Image */}
            {!props.url[1] && <img onClick={() => setShow(!show)}
                style={{ width: '100%' }}
                src={mediaURL}
            />}

            {/* Video */}
            {props.url[1] &&
                <div className='verticalVideo'>
                    {paused && !isMd && <CenteredPlayArrow />}
                    <video controls playsInline muted ref={self}
                        onPlay={() => {
                            // props.onPlay(self.current!);
                            props.onPlay(self.current!);
                            setPaused(false);
                        }}
                        onPause={() => {
                            setPaused(true);
                        }}
                        onVolumeChange={() => {
                            props.onMute(self.current!);
                        }}
                        onEnded={() => {
                            self.current!.currentTime = 0;
                        }}
                        onClick={() => {
                            props.onPlay(self.current!);
                        }}
                        onTouchEnd={() => {
                            handleTap();
                            props.onPlay(self.current!);
                        }}
                        src={mediaURL} />
                </div>}

        </div>
    )
}

export default GalleryEntry;