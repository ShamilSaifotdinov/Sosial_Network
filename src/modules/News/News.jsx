import React, { useEffect, useState } from 'react';
import c from "./News.module.css";
import { ReactComponent as SettingIcon } from "./../../img/setting.svg"

import { auth, db } from "../../hook/firebase";
import { getDocs, query, collection, Timestamp, getDoc, doc } from 'firebase/firestore';
import { TStoDate } from "../../hook/timeTo"
import { Post } from '../Post/Post';
import { Subscribes } from './Subscribes';

const News = () => {
  const [posts, setPosts] = useState([])
  const [openEditSubs, setEditSubs] = useState(false);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          // console.log(docSnap.data().subs)
          let users = docSnap.data().subs || []
          console.log(users)

          if (users.length !== 0) {
            setSubs(users)

            let postsSubs = []

            //Posts of current user
            const q = query(collection(db, `users/${auth.currentUser.uid}`, "posts"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              postsSubs.push({ postId: doc.id, ...doc.data() });
            });

            //Posts of subscriptions
            for (let user of users) {
              const q = query(collection(db, `users/${user}`, "posts"));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                postsSubs.push({ postId: doc.id, ...doc.data() });
              });
            }

            console.log(postsSubs)

            // for (let post of postsSubs) console.log(TStoDate(post.postingTime))
            postsSubs.sort((a, b) => TStoDate(b.postingTime) - TStoDate(a.postingTime))
            // console.log("Sorted:")
            // for (let post of postsSubs) console.log(TStoDate(post.postingTime))

            setPosts(postsSubs)
          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }

    }
    getPosts()

    // return () => {
    //   second
    // }
  }, [])

  return (
    <div className={c.News}>
      <div onClick={() => setEditSubs(true)}><SettingIcon /></div>
      <Subscribes isModal={openEditSubs} setModal={setEditSubs} subs={subs} setSubs={(newSubs) => setSubs(newSubs)} />
      <div>
        {
          posts.map(post => <Post key={post.postId} id={post.postId} profileId={true} />)
        }
      </div>
    </div>
  );
}

export default News;
