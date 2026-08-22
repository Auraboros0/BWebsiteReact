import { useEffect, useState } from "react";
function injectDot(baseString: string, count: number) {
    for (let i = 0; i < count; i++) {
        baseString += ".";
    }
    return baseString
}

function Loading({text}) {
    const baseString = "Loading Data";
    const [displayString, setDisplayString] = useState(text);
    const [dotTracker, incrementDotTracker] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            incrementDotTracker(prev => {
                const next = (prev + 1) % 4;
                setDisplayString(prev => injectDot(text, next));
                return next;
            })
        }, 500);

        return () => clearInterval(interval);
    }, [])
    return (
        <h1 className="loadingText">{displayString}</h1>
    )
}

export default Loading