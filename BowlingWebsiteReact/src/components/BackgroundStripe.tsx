function BackgroundStripe({ url }) {
    return (
        <div className="backgroundStripe" style={{backgroundImage: `linear-gradient(to left,
            rgba(255, 255, 255, 0.0),
            rgba(255, 255, 255, 0.8),
             rgba(255, 255, 255, 0.2)), url(${url})`}}>
        </div>
    )
}

export default BackgroundStripe;