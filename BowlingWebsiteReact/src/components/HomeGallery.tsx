import ResultsBox from "./HomePageComps/ResultsBox";
import { useState } from "react";

function randomizeAndSlice(filenames: string[], count: number) {
    const toReturn = filenames.sort(() => Math.random() - 0.5).slice(0, count);
    return toReturn;
}
/* Populates the home page with images from a gallery. Might rewrite this
to allow for some modularity */
function HomeGallery(props: { list: string[] }) {
    const modules = import.meta.glob('/public/assets/TestImages/*.{png,jpg,jpeg}', { eager: true });
    const fileNames = Object.keys(modules);
    const class1: string = 'g-col-6 g-col-md-4';
    const class2: string = ' d-none d-md-block';
    let class4: string = class1;

    function stateMachine() {
        return isHovering ? 'resultsBox hovered' : 'resultsBox';
    }
    const [isHovering, setIsHovering] = useState(false);

    // WRITE AN IF TEST TO HIDE THE LATTER 3 IMAGES ON MOBILE, USING AN ITERATOR

    return (
            <div className="grid photos" style={{ '--bs-gap': '1rem 1rem' } as React.CSSProperties}>
                {/* {randomizeAndSlice(fileNames, 3).map((item: string, index) => { */}
                {props.list.map((item: string, index) => {
                    if (index >= 1) { class4 = class1 + class2; }
                    return (<div className={class4}>
                        {/* <img src={item} className="img fluid" /> */}
                        <ResultsBox name={item} />
                    </div>)
                })}
            </div>
    );
}

export default HomeGallery;