import { useContext, useEffect, useState } from "react";
import { NavBar } from "../../components/Nav-bar/NavBar"
import "./ProfilePage.css"
import { Data, fetchPosts } from "../../api";
import { AppContext } from "../../AppRouter";
import Post from "../../components/post/Post";

export function ProfilePage() {

    const [posts, setPosts] = useState<Data[]>();

    const context = useContext(AppContext);

    async function formatPostsToRender() {
        try {
            const listOfPosts = await fetchPosts(context.user.id);
            setPosts(listOfPosts);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        formatPostsToRender()
    }, []);

    return (
        <div className="profile-page">
            <div className="profilepage-content">
                <NavBar />
                <div className="profile-intro-bar">
                    <div className="bar-content">
                        <div className="text-based-intros">
                            <h1>{context.user.username}</h1>
                        </div>
                    </div>
                    <button className="edit-profile-button">Edit profile</button>
                </div>
            </div>
            <div className="my-posts">
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