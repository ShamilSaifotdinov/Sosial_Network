import c from "./UserContacts.module.css";
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { auth, db } from "../../../hook/firebase";
import { getDocs, collection, query, where, documentId, onSnapshot } from "firebase/firestore";

import DialogSearch from '../DialogSearch/DialogSearch';

const UserContacts = () => {
  const { uid } = auth.currentUser;
  const [chats, setChats] = useState([])

  useEffect(() => {
    async function getChats() {
      // console.log(uid)
      const q = query(collection(db, "chats"),
        where(`members.${uid}`, "==", true)
      );

      try {
        const unsub = onSnapshot(q, (querySnapshot) => {
          // console.log(querySnapshot)
          let usersUid = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            var ids = Object.keys(doc.data().members)

            // console.log(ids)
            // chats.unshift({ chatId: doc.id, uid: ids.find(e => e !== uid) })
            usersUid.unshift(ids.find(e => e !== uid))
            // console.log(usersUid)
          })
          // console.log(usersUid)
          getNames(usersUid)
        })
        return unsub;
      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }
    }

    async function getNames(chats) {
      if (chats.length > 0) {
        let arr = []
        // console.log(chatId)
        // setDialogId(chatId)
        const q = query(collection(db, `users`),
          where(documentId(), 'in', chats)
        )
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          arr.push({ uid: doc.id, Name: doc.data().Name })
        });
        console.log(arr)
        setChats(arr)
      }
    }
    const unsub = getChats()

    // return () => { unsub() }
  }, [])

  return (
    <div className={c.UserContacts}>
      <span>Диалоги</span>
      <DialogSearch />{/*url={url}*/}
      <hr></hr>
      <ul>
        {
          chats
            ? chats.map(chat =>
              <li key={chat.uid}><NavLink to={`/${chat.uid}`} activeClassName={c.active}>{chat.Name}</NavLink></li>)
            : <></>
        }
        {/* <li><NavLink to={`${url}/5ygh1v7qlcapds1gekke2cg0sye2`} activeClassName={c.active}>Владимир Владимирович</NavLink></li> */}
        {/* <li><NavLink to="/DialogWindowShimova" activeClassName={c.active}>Шимова Татьяна</NavLink></li> */}
      </ul>
    </div>
  );
}

export default UserContacts;
