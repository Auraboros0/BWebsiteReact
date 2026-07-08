import { InstagramEmbed } from "react-social-media-embed"
function InstaPost({ url }) {
    return (
    <div>
     <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed 
        url={url} 
        width={1000}
      />
    </div>
    </div>
    )
}

export default InstaPost