import { NavBar } from "../../components/Nav-bar/NavBar"
import "./ProfilePage.css"

export function ProfilePage() {

    return (
        <div className="profile-page">
            <div className="profilepage-content">
                <NavBar />
                <div className="profile-intro-bar">
                    <div className="bar-content">
                    <div className="profile-picture-container">
                    </div>
                    <div className="text-based-intros">
                        <h1>Username</h1>
                        <h2 className="user-bio">bio</h2>
                    </div>
                    </div>
                    <button className="edit-profile-button">Edit profile</button>
                </div>
            </div>
            <div className="my-posts">
                <p>post</p>
                <p>post</p>
                <p>post</p>
            </div>
        </div>
    )
}