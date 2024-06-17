import { Data } from "../../api"
import "./Post.css"

interface Props {
    post: Data
}

const Post: React.FC<Props> = ({ post }) => {
    let imageUrl = '' 
    if (post.attributes.Image.data) {
        imageUrl = post.attributes.Image.data[0]?.attributes.formats.medium.url
    }
    return (
        <div className="post-holder">
        <h2 className="post-username">@{post.attributes.user.data?.attributes.username}</h2>
        <div className="post-image-holder">
            <img src={`http://localhost:1337${imageUrl}`} alt="Image" width="500" height="600"></img>
        </div>
        <div className="caption-holder">
        <p>{post.attributes.Caption}</p>
        </div>
    </div>
    )
}

export default Post