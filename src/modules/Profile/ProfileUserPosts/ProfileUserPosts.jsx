import React, { useState, useEffect } from 'react';
import c from "./ProfileUserPosts.module.css";

import { auth, db } from "../../../hook/firebase";
// import Avatar1 from "./../../../img/Avatar1.jpg"
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { Post } from '../../Post/Post';
import { NewPost } from './NewPost';


const ProfileUserPosts = ({id}) => {
    const { uid } = id ? { uid: id } : auth.currentUser;
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            try {
                const q = query(collection(db, `users/${uid}/posts`), orderBy("postingTime", "desc"))

                /*const unsub = */onSnapshot(q, (querySnapshot) => {
                    let postsId = []
                    // console.log(querySnapshot)
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        // console.log("id: " + doc.id + ", time: " + TStoDate(doc.data().postingTime))
                        postsId.unshift(doc.id)
                    });

                    setPosts(postsId)
                })
            } catch (error) {
                // alert("Query error: ", error)
                console.error("Query error: ", error)
            }

        }
        getPosts()
        //  return () => {
        //     second
        //   }
    }, [id])

    return (
        <div className={c.ProfileUserPosts}>
            {!id && <NewPost />}
            <div className={c.AllPosts}>
                {
                    posts.map(post => <Post key={post} id={post} profileId={id} />)
                }
                {/* <div className={c.Post}>
                    <img src={Avatar1} className={c.UserPostAvatar} />
                    <span className={c.UserPostMessage}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus commodi fuga sunt unde laborum saepe, rem provident consequatur quidem in quae, enim pariatur asperiores eveniet tenetur aspernatur quos id ex!</span>
                </div>
                <div className={c.Post}>
                    <img src={Avatar1} className={c.UserPostAvatar} />
                    <span className={c.UserPostMessage}>Hello World!!!</span>
                </div>
                <div className={c.Post}>
                    <img src={Avatar1} className={c.UserPostAvatar} />
                    <span className={c.UserPostMessage}>It's my first post!!!</span>
                </div> */}
            </div>
        </div>
    );
}

export default ProfileUserPosts;