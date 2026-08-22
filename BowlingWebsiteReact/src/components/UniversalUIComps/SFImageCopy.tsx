interface SFImage {
    url: string;
    width: string;
    left?: boolean
}
function SFImageCopy(props: SFImage) {
    return (
        <div className='genderImage' style={{ display: 'inline-block', position: 'relative', width: `${props.width}`, height: 'max-content', boxSizing: 'border-box', marginBottom: '16px' }}>
            <img src={props.url} style={{ display: 'block', border: '4px solid white' }} />
            <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                width: '100%',
                height: '100%',
                borderBottom: '8px solid white',
                borderRight: '8px solid white',
            }}></div>
        </div>
    )
}

export default SFImageCopy