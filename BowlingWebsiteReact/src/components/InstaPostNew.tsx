import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { InstaObject } from "../Interfaces/InstaObject";

function instaSash() {
    return (
        <div className='instaSash'>

        </div>
    )
}

function VideoType(props: InstaObject) {
    const date = new Date(props.timestamp)
    const videoRef = useRef<HTMLVideoElement>(null);

    const PlayPause = () => {
        if (videoRef.current!.paused) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }
    return (
        <div className='instaImage verticalVideo'>
            <a
                href={props.permalink}
                target="_blank"
                rel="noopener noreferrer"
            >
            {instaSash()}
            <video ref={videoRef} autoPlay muted controls playsInline
                src={props.media_url} 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    PlayPause()}}
            />
            <h2>{props.caption}</h2>
            <h3 style={{ fontFamily: 'Iosevka' }}>{date.toLocaleDateString()}</h3>
            </a>
        </div>
    )
}

function ImageType(props: InstaObject) {
    const date = new Date(props.timestamp)
    return (
        <div className='instaImage'>
            <a
                href={props.permalink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {instaSash()}
                <img src={props.media_url} />
                <h2>{props.caption}</h2>
                <h3 style={{ fontFamily: 'Iosevka' }}>{date.toLocaleDateString()}</h3>
            </a>
        </div>
    )
}

function CarouselType(props: InstaObject) {
    return (
        <div>

        </div>
    )
}

function determineType(props: InstaObject) {
    if (props.media_type == 'IMAGE') {
        return <ImageType {...props} />;
    }
    if (props.media_type == 'VIDEO') {
        return <VideoType {...props} />
    }
    if (props.media_type == 'CAROUSEL_ALBUM') {
        return <CarouselType {...props} />
    }
}

/* An instagram embed, takes a URL */
function InstaPostNew(props: InstaObject) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        },
            {
                threshold: 0.2,
            });
        observer.observe(ref.current!);
        return () => { observer.disconnect() }
    }, [])

    return (
        <div ref={ref} style={{ minHeight: '300px', position: 'relative' }}>
            {isVisible && <div tabIndex={0} className='instaBoxBorder' style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            </div>}
            {isVisible && <div className='instaBox' style={{ display: 'flex', justifyContent: 'center' }}>
                {determineType(props)}
            </div>}
        </div>
    )
}

export default InstaPostNew