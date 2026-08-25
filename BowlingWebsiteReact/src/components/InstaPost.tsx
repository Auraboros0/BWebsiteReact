import { InstagramEmbed } from "react-social-media-embed"
/* An instagram embed, takes a URL */
function InstaPost({ url }) {
    return (
    <div>
     <div tabIndex={0} style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed 
        tabIndex={-1}
        url={url} 
        width={1000}
        className={'instaPost'}
      />
    </div>
    </div>
    )
}

export default InstaPost