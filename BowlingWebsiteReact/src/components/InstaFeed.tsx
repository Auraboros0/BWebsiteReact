import { useEffect, useState, useRef } from "react";
import InstaPost from "./InstaPost"
import InstaPostNew from "./InstaPostNew";
import { fetchWithRetry } from "../Scripts/fetchWithRetry";
import type { InstaObject } from "../Interfaces/InstaObject";
import InstaColumn from "./InstaColumn";
import useConditionalRender from "../Scripts/useConditionalRender";

const endpoint = '/api/instagram/posts/';

async function getPosts(page: number) {
    const data = await fetchWithRetry(
        () => fetch(`${endpoint}${page}`),
        5
    );
    const dataJSON = await data.json();
    const posts = await dataJSON.data;
    const last = await dataJSON.last; //Boolean, true if the batch includes the last insta post available
    const response = await data.status;
    return { posts, response, last };
}

// console.log(getPosts);

/* 
    A collection of instagram posts. Takes the above URLs and makes InstaPosts of them

    Functions by fetching instagram posts from the backend and interpreting them as InstaObjects
    These objects are fed to the three arrays within instaColumnData, which are used in three instances
    of the instaColumn component.

    Each instaColumn takes the InstaObject array it receives and maps over it, creating a new InstaPostNew with it
*/
function InstaFeed() {
    const { isMd } = useConditionalRender();
    const instaColumnData: [InstaObject[], InstaObject[], InstaObject[]] = [[], [], []]
    const [instaData, setInstaData] = useState<InstaObject[]>([]);

    const status = useRef<number>(-1);
    const instaCursor = useRef<number>(-1);
    const randomPostThree = useRef<number>(Math.floor(Math.random() * 3))
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const setData = async () => {
            const data = await getPosts(instaCursor.current);
            const posts = await data.posts;
            const response = await data.response;
            const last = await data.last;
            // Mapping over InstaPosts to weed out duplicates.
            if (response < 400) {
                setInstaData(prev => {
                    const instaPosts = new Map([...prev, ...posts].map(post => [post.id, post]));
                    return [...instaPosts.values()];
                });
                instaCursor.current = posts.at(-1).id;
            }
            status.current = response;
            return { response, last };
        }

        // Load new posts whenever the bottom of the section is reached
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    try {
                        const data = await setData();
                        if (data.last) {
                            observer.disconnect();
                        }
                    } catch (error) {
                        observer.disconnect();
                    }
                }
            },
            {
                threshold: 0,
            });
        observer.observe(bottomRef.current!);
        return () => { (observer.disconnect()) }
    }, [])

    instaData.map((item: InstaObject, index) => {
        instaColumnData[index % 3].push(item);
    })


    return (
        <div>
            <div className="insta photos" style={{minHeight: `${500}px` } as React.CSSProperties}>
                {instaData.length == 0 &&
                    <div className='instaBoxBorder loading' style={{ display: 'block', position: 'relative', left: '0', width: '100vw', height: '500px'}}></div>
                }
                {!isMd && <InstaPostNew {...instaData[randomPostThree.current]}/>}
                {isMd && instaData.length != 0 && <>
                <InstaColumn items={instaColumnData[0]} />
                <InstaColumn items={instaColumnData[1]} />
                <InstaColumn items={instaColumnData[2]} />
                </>
            }
            </div>
            <div ref={bottomRef} style={{ height: '0px', width: '100%', backgroundColor: 'aqua' }}></div>
        </div>
    )
}

export default InstaFeed