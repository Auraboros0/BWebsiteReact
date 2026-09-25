import { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigationType } from "react-router";
import { fetchWithRetry } from "../../Scripts/fetchWithRetry";
import useConditionalRender from "../../Scripts/useConditionalRender";

async function getData(gender: string, id: string) {
    const endpoint = `/api/playermedia/${gender}/${id}`;
    const data = await fetchWithRetry(
        () => fetch(endpoint),
        1
    );
    const URLs = await data.json();
    const name = await URLs.name;
    const wide = await URLs.wide;
    const tall = await URLs.tall;
    const response = await data.status;
    return { name, wide, tall, response };
}

function IndexDisplay(props: { idx: number, length: number }) {
    const displayIdx = props.idx + 1;
    const displayLength = props.length;
    return (
        <div style={{ position: 'absolute', top: '40px', right: '10px', color: 'white', zIndex: '0' }}>
            <h2>{displayIdx}/{displayLength}</h2>
        </div>
    )
}

function NextAndLast(props: { prev: () => void, next: () => void }) {
    const { isMd } = useConditionalRender();
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // A Press
            if (event.key.toUpperCase() == 'A') {
                props.prev();
            }
            // D Press
            if (event.key.toUpperCase() == 'D') {
                props.next();
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => { window.removeEventListener("keydown", handleKeyDown) }
    }, [props.prev, props.next])
    return (
        <div style={{
            position: 'relative', width: '100%', height: '50px', zIndex: '5', borderBottom: '4px solid white',
            backgroundColor: '#d01840', overflowY: 'clip'
        }}>
            <div style={{ display: 'flex', position: 'absolute', justifyContent: 'space-between', width: '100%', height: '50%', color: 'white' }}>
                <button title='Use me with A!' className='resultsButton' style={{ marginRight: 'auto', transform: 'translateY(-30%)' }} onClick={() => props.prev()}><h1 className="pVideoArrow">&#x25C0; Prev</h1></button>
                <button title='Use me with D!' className='resultsButton' style={{ marginLeft: 'auto', transform: 'translateY(-30%)' }} onClick={() => props.next()}><h1 className="pVideoArrow">Next &#x25B6;</h1></button>
            </div>
        </div>
    )
}

function PlayerVideo(props: { sendVidToParent: (video: HTMLVideoElement) => void, onPlay: () => void, onPause: () => void }) {
    const [tallURLs, setTallURLs] = useState<string[]>([]);
    const [wideURLs, setWideURLs] = useState<string[]>([])
    const [URLs, setURLs] = useState<string[]>([]);
    const [response, logResponse] = useState(400);
    const [paused, setPaused] = useState(true);
    const [idx, setIdx] = useState(() => {
        const saved = sessionStorage.getItem("videoIndex");
        return saved !== null ? Number(saved) : 0;
    });
    const [folder, setFolder] = useState<string>("16x9")

    const { isMd } = useConditionalRender();

    const { gender, id } = useParams();
    const idRef = useRef<string>(id);
    const location = useLocation();
    const ref = useRef<HTMLVideoElement>(null);
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        sessionStorage.setItem("videoIndex", String(idx));
    }, [idx]);

    const increment = () => {
        setPaused(ref.current!.paused)
        const prev = idx + 1;
        setIdx(prev => prev + 1);
        if (prev >= URLs.length) {
            setIdx(0);
        }
    }
    const decrement = () => {
        setPaused(ref.current!.paused)
        const prev = idx - 1;
        setIdx(prev => prev - 1);
        if (prev < 0) {
            setIdx(URLs.length - 1);
        }
    }

    const manualPlayPause = () => {
        if (ref.current!.paused) {
            ref.current!.play();
            setPaused(false);
        } else {
            ref.current!.pause();
            setPaused(true);
        }
    }

    useEffect(() => {
        setURLs(isMd ? wideURLs : tallURLs);
        setFolder(isMd ? "16x9" : "9x16");
        setIdx(0);
    }, [isMd])

    useEffect(() => {
        if (paused) {
            ref.current!.pause();
        } else {
            ref.current!.play();
        }
    }, [idx])

    useEffect(() => {
        props.sendVidToParent(ref.current!)
        idRef.current = id;
        setURLs([]);
        const setData = async () => {
            const data = await getData(gender!, id!);
            const wide = await data.wide;
            const tall = await data.tall;
            const name = await data.name
            if (idRef.current === name) {
                setURLs(isMd ? wide : tall);
                setWideURLs(wide);
                setTallURLs(tall);
                logResponse(data.response);
                console.log(wide);
                setIdx(0);
            }
        }
        setData();
    }, [location.pathname])
    return (
        <div style={{ position: 'relative', marginBottom: '0px', backgroundSize: 'auto, cover' }}>
            <NextAndLast prev={decrement} next={increment} />
            <div className={paused ? "bigPlayerImage paused" : "bigPlayerImage"}>
                {isMd && <video ref={ref} style={{ visibility: URLs.length ? "visible" : "hidden" }}
                    key="wide"
                    muted autoPlay controls loop playsInline
                    onPlay={() => {
                        props.onPlay();
                        setPaused(false);
                    }
                    }
                    onPause={() => {
                        props.onPause();
                        setPaused(true);
                    }}
                    onTouchEnd={() => {
                        manualPlayPause();
                    }}
                    src={`${API}/media/Player_Uploads/16x9/${wideURLs[idx]}`}
                />}
                {!isMd && <video ref={ref} style={{ visibility: URLs.length ? "visible" : "hidden" }}
                    key="tall"
                    muted autoPlay controls loop playsInline
                    onPlay={() => {
                        // props.onPlay();
                        setPaused(false);
                    }
                    }
                    onPause={() => {
                        // props.onPause();
                        setPaused(true);
                    }}
                    onTouchEnd={() => {
                        manualPlayPause();
                    }}
                    src={`${API}/media/Player_Uploads/9x16/${tallURLs[idx]}`}
                />}
                {response == 404 && <h1 style={{ color: 'white', position: 'absolute', top: '50%', textAlign: 'center', width: '100%' }}>
                    Player has not uploaded any media
                </h1>}
            </div>
            {response == 200 && <IndexDisplay idx={idx} length={URLs.length} />}
        </div>
    )
}

export default PlayerVideo;