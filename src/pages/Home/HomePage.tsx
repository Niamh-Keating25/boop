import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../AppRouter";
import { useContext, useEffect, useState } from "react";
import "./HomePage.css"
import { NavBar } from "../../components/Nav-bar/NavBar";
import { fetchPosts, Data } from "../../api";
import Post from "../../components/post/Post";


export function HomePage() {

    const [posts, setPosts] = useState<Data[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const context = useContext(AppContext);
    const navigate = useNavigate();
    // Assuming your API response is stored in a variable called 'response'


    async function formatPostsToRender() {
        try {
            const listOfPosts = await fetchPosts();
            setPosts(listOfPosts);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        formatPostsToRender()
    }, []);

    return (
        <div className="home-content">
            <div className="home-interactive-content">
                <NavBar />

                {posts?.map((postToRender) => {

                    return (
                        <Post
                            post={postToRender} />
                    )
                })}


            </div>
        </div>
    )
}