import { useState, FormEvent, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { createNewPost, uploadImage } from "../../api";
import Input from "../../components/Input/Input"
import { NavBar } from "../../components/Nav-bar/NavBar";
import FileUpload from "../../components/File-upload/FileUpload";
import "./CreatePostPage.css";
import axios from "axios";
import { AppContext } from "../../AppRouter";



export function CreatePostPage() {
    const ctx = useContext(AppContext);
    const [caption, setCaption] = useState('');
    const [photo, setPhoto] = useState<File>();
    const [createPostError, setCreatePostError] = useState(false);

    const navigate = useNavigate();
    console.log(ctx.user)
    const handleCreatePostRequest = async (e: FormEvent) => {
        e.preventDefault();
        if (!photo) {
            return
        }
        const fileId = await uploadImage(photo);
        

        try {
            await createNewPost({ Caption: caption, Image: fileId as string, user: ctx.user.id });
            navigate('/home')
        } catch (error) {
            setCreatePostError(true);
        }
    };


    return (
        <div className="createpost-page">
            <div className="createpost-content">
                <NavBar />
                <form onSubmit={handleCreatePostRequest} className="createpost-form">
                    <h1 className="createpost-header">Create a new post!</h1>
                    <div className="photo-input-holder">
                        <h3>Select the imge you want to post</h3>
                        <FileUpload setSelectedFile={setPhoto} />
                    </div>
                    <div className="caption-input-holder">
                        <Input
                            labelText="Caption"
                            id="caption"
                            type="textarea"
                            value={caption}
                            onChange={setCaption}
                        />
                    </div>
                    <button type="submit" className="createpost-button">Create Post</button>
                </form>
                {!!createPostError && (
                    <p className="createpost-error-message">Oops! looks like something went wrong, please try again.</p>
                )}
            </div>
        </div>
    )
}