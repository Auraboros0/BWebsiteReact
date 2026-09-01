import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { InstagramEmbed } from "react-social-media-embed"
/* An instagram embed, takes a URL */
function InstaPost({ url }) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setVisible] = useState(false);
    const classString = isVisible ? 'completed' : 'loading'

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
        <div ref={ref} style={{ minHeight: '700px', position: 'relative' }}>
            {isVisible && <div tabIndex={0} className='instaBoxBorder' style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <InstagramEmbed
                    tabIndex={-1}
                    url={url}
                    width={1000}
                    className={'instaPost'}
                /> */}
            </div>}
            {isVisible && <div className='instaBox' style={{ display: 'flex', justifyContent: 'center' }}>
                <InstagramEmbed
                    tabIndex={-1}
                    url={url}
                    width={1000}
                    className={'instaPost'}
                />
            </div>}
        </div>
    )
}

export default InstaPost