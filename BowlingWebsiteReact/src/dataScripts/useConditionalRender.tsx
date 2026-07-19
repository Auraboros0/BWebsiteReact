import { useState, useEffect } from 'react'
export default function useConditionalRender() {
    const [width, setWidth] = useState(window.innerWidth); // Hold current width
    useEffect(() => {
        const resize = () => {
            setWidth(window.innerWidth); // Change width value on resize
        }

        window.addEventListener('resize', resize); 
        return () => { window.removeEventListener('resize', resize)}
    }, [])

    return {
        isSm: width >= 576,
        isMd: width >= 768,
        isLg: width >= 992,
        isXl: width >= 1200,
        isXxl: width >= 1400,
    }
}