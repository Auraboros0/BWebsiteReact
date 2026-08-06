/* Populates the home page with images from a gallery. Might rewrite this
to allow for some modularity */
function HomeGallery() {
    const modules = import.meta.glob('/public/assets/TestImages/*.{png,jpg,jpeg}', { eager: true });
    const fileNames = Object.keys(modules);

    const class1: string = 'g-col-6 g-col-md-4';
    const class2: string = ' d-none d-md-block';
    let class4: string = class1;

    // WRITE AN IF TEST TO HIDE THE LATTER 3 IMAGES ON MOBILE, USING AN ITERATOR

    return (
        <div className="grid photos" style={{ '--bs-gap': '1rem 1rem' } as React.CSSProperties}>
        {fileNames.map((item: string, index) => {
            if (index >= 1) {class4 = class1 + class2;}
            return (<div className={class4}>
                <div className="gallerySquare">
                    <img src={item} className="img fluid" />
                </div>
            </div>)
        })}
        </div>
    );
}

export default HomeGallery;