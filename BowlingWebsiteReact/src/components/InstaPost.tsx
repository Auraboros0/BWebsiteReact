import { InstagramEmbed } from "react-social-media-embed"
/* An instagram embed, takes a URL */
function InstaPost({ url }) {
    return (
    <div>
     <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed 
        url={url} 
        width={1000}
        className={'instaPost'}
      />
    </div>
    </div>
    )
}

export default InstaPost