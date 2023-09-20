import React, { useState } from 'react'
import { auth, db } from "../../../hook/firebase";
import { addDoc, collection, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import c from "./ProfileUserPosts.module.css";

export const NewPost = () => {
    const { uid } = auth.currentUser;
    const [newPost, setNewPost] = useState("")

    const sendPost = async (event) => {
        event.preventDefault()
        if (newPost) {
            // console.log(newPost)
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    creationTime: serverTimestamp(),
                    creator: uid,
                    text: newPost
                });
                console.log(docRef.id)
                await setDoc(doc(db, `users/${uid}/posts`, docRef.id), { postingTime: serverTimestamp() });
                setNewPost("")
            } catch (error) {
                alert(error)
                console.error(error)
            }
        }

    }
    return (
        <form className={c.CreateNewPost} onSubmit={(e) => sendPost(e)}>
            <input
                type="textarea"
                placeholder="Напишите ваш пост..."
                className={c.InputField}
                onChange={(e) => setNewPost(e.target.value)}
                value={newPost}
            />
            <input type="submit" className={c.SubmitButton} />
        </form>
    )
}
