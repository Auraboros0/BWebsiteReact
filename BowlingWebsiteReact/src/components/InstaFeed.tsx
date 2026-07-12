import InstaPost from "./InstaPost"

const urls: string[] = [
    "https://www.instagram.com/p/DWFEUdSNypf/",
    "https://www.instagram.com/p/DU3r3CpGIwW/",
    "https://www.instagram.com/p/DU3rMRCmPsE/"
]

function InstaFeed() {
    const class1: string = 'g-col-12 g-col-md-4';
    const class2: string = ' d-none d-md-block';
    let class4: string = class1;

    return (
        <div className="grid photos" style={{ '--bs-gap': '1rem 1rem' } as React.CSSProperties}>
            {urls.map((item: string, index) => {
                if (index >= 1) {class4 = class1 + class2;}
                return (
                    <div className={class4}>
                        <InstaPost url={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default InstaFeed