import React, { useState, useEffect } from 'react'
import c from "./Post.module.css";
import Avatar1 from "../../img/Avatar1.jpg"
import { ReactComponent as DeleteIcon } from "./../../img/trash-alt.svg"
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../hook/firebase';
import { LocaleDate, LocaleTime, TStoDate } from '../../hook/timeTo';
import { Link } from 'react-router-dom';

export const Post = ({ id, profileId }) => {
    const { uid } = auth.currentUser;
    const [post, setPost] = useState({})
    const [creator, setCreator] = useState({})

    // console.log(post)

    useEffect(() => {
        async function getPost() {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                // console.log("Date: ", LocaleDate(TStoDate(docSnap.data().creationTime)), LocaleTime(TStoDate(docSnap.data().creationTime)))
                setPost(docSnap.data())
                getCreator(docSnap.data().creator)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        async function getCreator(userId) {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setCreator(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getPost()
        // return () => {
        //     second
        // }
    }, [])

    const deletePost = async () => {
        console.log("PostID: ", id)
        console.log("Creator: ", post.creator)
        console.log("User: ", uid)
        try {
            await deleteDoc(doc(db, `users/${uid}/posts`, id));
            console.log("Post delete from profile!")
            if (uid === post.creator) {
                await deleteDoc(doc(db, `posts`, id));
                console.log("Post delete from network!")
            }
        } catch (error) {
            // alert("Query error: ", error)
            console.error("Query error: ", error)
        }
    }

    return (
        Object.keys(post).length === 0 ?
            <div className={c.Post}>
                <span className={c.UserPostMessage}>Запись не найдена!</span>
                {!profileId && <button className={c.DeletePost} type="submit"><DeleteIcon /></button>}
            </div>
            : <div className={c.Post}>
                <Link to={`/${post.creator}`}>
                    <img alt="avatar" src={creator.photoURL || Avatar1} className={c.UserPostAvatar} />
                </Link>
                <div>
                    <time dateTime={TStoDate(post.creationTime).toISOString()}>{
                        LocaleDate(TStoDate(post.creationTime)) + " " + LocaleTime(TStoDate(post.creationTime))
                    }</time>
                    <p className={c.UserPostMessage}>{post.text}</p>
                </div>
                {!profileId && <button className={c.DeletePostBtn} type="submit" onClick={deletePost}><DeleteIcon /></button>}
            </div>
    )
}
