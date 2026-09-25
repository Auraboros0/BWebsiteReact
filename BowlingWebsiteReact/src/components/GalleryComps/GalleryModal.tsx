import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

function NextAndPrev(props: { incrementIdx: (prev?: boolean) => void }) {
    return (
        <div style={{ display: 'flex', position: 'absolute', justifyContent: 'space-between', width: '100%' }}>
            <div onClick={() => { props.incrementIdx(true) }}>
                <h1>&#x25C0;</h1>
            </div>
            <div onClick={() => { props.incrementIdx() }}>
                <h1>&#x25B6;</h1>
            </div>
        </div>
    )
}

const GalleryModal = forwardRef((props: { media: [string, boolean][] }, ref) => {

    const idx = useRef<number>(0)
    const [displayed, setDisplayed] = useState<[string, boolean]>(props.media[0])
    useImperativeHandle(ref, () => ({
        setIdx,
    }))

    function setIdx(val: number) {
        idx.current = val;
    }

    function incrementIdx(prev?: boolean) {
        if (prev) {
            idx.current--;
        } else {
            idx.current++;
        }
    }

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ position: 'relative' }}>
                <NextAndPrev incrementIdx={incrementIdx} />
                {displayed[1] && // Video
                    <>
                        <video controls src={displayed[0]} />
                    </>}

                {!displayed[1] && // Image
                    <>
                        <img src={displayed[0]} />
                    </>}
            </div>
        </div>
    )
})

export default GalleryModal;