import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppRouter";
import { useContext, useEffect, useState } from "react";
import "./HomePage.css"
import { NavBar } from "../../components/Nav-bar/NavBar";
// import { listPosts } from "../../api";

type Post = {
    imageUrl: string;
    caption: string;
    username: string;
}

export function HomePage() {

    const [posts, setPosts] = useState<Post[]>([])

    const context = useContext(AppContext);
    const navigate = useNavigate();



    // async function formatPostsToRender() {
    //     // GETS list of posts and puts them into a variable
    //     const listOfPosts = await listPosts();

    //     // map through the 

    //     const niceListOfPosts = listOfPosts.data.map((rawPost) => {
    //         // return your nice object here
    //         rawPost.attributes
    //     })

    //     // put niceListOfPosts in state

    // }

    // useEffect(() => {
    //     formatPostsToRender()
    // },[]);

    return (
        <div className="home-content">
            <div className="home-interactive-content">
                <NavBar />
                <div className="post-holder">
                    <h2 className="post-username"></h2>
                    <div className="post-image-holder">
                        {/* <img src={`http://localhost:1337/${}`} alt="Image" width="500" height="600"></img> */}
                    </div>
                </div>
            </div>
        </div>
    )
}