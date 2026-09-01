import type { InstaObject } from "../Interfaces/InstaObject"
import InstaPostNew from "./InstaPostNew"
function InstaColumn({items}) {
    return (
        <div className='instaColumn' style={{}}>
            {items.map((item) => (
                <InstaPostNew key={item.media_url} {...item} />
            ))}
        </div>
    )
}

export default InstaColumn