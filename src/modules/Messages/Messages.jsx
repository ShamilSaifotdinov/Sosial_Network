import React, { useState, useEffect } from 'react';
import c from "./Messages.module.css";
import UserContacts from "./UserContacts/UserContacts";
import DialogWindow from "./DialogWindow/DialogWindow";
// import DialogWindowShimova from "./DialogWindowShimova/DialogWindowShimova";
import { BrowserRouter, Route } from 'react-router-dom';
import { auth, db } from "../../hook/firebase";
import { getDocs, collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";


const Messages = ({ match }) => {
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState({})
  
  useEffect(() => {
    async function getChats() {
      // console.log(uid)
      const q = query(collection(db, "chats"),
        where(`members.${auth.currentUser.uid}`, "==", true)
      );

      try {
        const unsub = onSnapshot(q, (querySnapshot) => {
          // console.log(querySnapshot)
          let arrOfChats = []
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // var ids = Object.keys(doc.data().members)

            // console.log(ids)
            // chats.unshift({ chatId: doc.id, uid: ids.find(e => e !== uid) })
            arrOfChats.unshift({ id: doc.id, ...doc.data() })
            // console.log(usersUid)
          })
          console.log(arrOfChats)
          getUsers(arrOfChats)
        })
        return unsub;
      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }
    }

    async function getUsers(arrOfChats) {
      if (arrOfChats.length > 0) {
        let arr = []
        // console.log(chatId)
        // setDialogId(chatId)
        for (const chat of arrOfChats) {
          console.log("Chat: ", chat)
          if (chat.isGroup) {
            let opponentIds = Object.keys(chat.members).filter(e => e !== auth.currentUser.uid)
            console.log(opponentIds)
            for (const id of opponentIds) {
              let opponet = await getDoc(doc(db, "users", id))
              if (opponet.exists()) {
                // console.log("Document data:", opponet.data());
                chat.members[id] = opponet.data().photoURL
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }
            chat.members[auth.currentUser.uid] = auth.currentUser.photoURL
            console.log(chat)
            arr.unshift(chat)
          } else {
            let opponentId = Object.keys(chat.members).find(e => e !== auth.currentUser.uid)
            console.log(opponentId)

            let opponet = await getDoc(doc(db, "users", opponentId))
            if (opponet.exists()) {
              // console.log("Document data:", opponet.data());

              chat.Name = opponet.data().Name
              chat.members[opponentId] = opponet.data().photoURL
              chat.members[auth.currentUser.uid] = auth.currentUser.photoURL

              arr.unshift(chat)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }
        }
        console.log(arr)
        setChats(arr)
      }
    }
    const unsub = getChats()

    // return () => { unsub() }
  }, [])

  return (
    <div className={c.Messages}>
      <UserContacts match={match} chats={chats} setActiveChat={setActiveChat} />
      <Route path={`${match.path}/:id`} component={DialogWindow}>
        <DialogWindow chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      </Route>
      {/* <Route path="/dialogwindowshimova" component={DialogWindowShimova} /> */}
    </div>
    // <BrowserRouter basename="/messages">
    // </BrowserRouter>

  );
}

export default Messages;
