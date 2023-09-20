import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from "../../../hook/firebase";
import { collection, query, orderBy, addDoc, onSnapshot } from "firebase/firestore";

import c from "./DialogWindow.module.css";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogInputField from "./DialogInputField/DialogInputField";

const DialogWindow = ({ activeChat, setActiveChat, chats }) => {
  // const { params } = match;
  const { id } = useParams();
  const { uid } = auth.currentUser;
  const [messages, setMessages] = useState([]);
  // console.log(chats)

  useEffect(() => {
    if (activeChat && Object.keys(activeChat).length === 0) {
      console.log(activeChat)
      let newActiveChat = chats.find(e => e.id === id || Object.keys(e.members).filter(e => e !== uid).length === 1)
      
      setActiveChat(newActiveChat)
      console.log('Set active chat: ', newActiveChat)
    } else {
      async function getMessages() {
        if (activeChat) {
          console.log("Chat ID: ", activeChat.id)
          const q = query(collection(db, `/chats/${activeChat.id}`, "messages"),
            orderBy("time")
          )

          const unsub = onSnapshot(q, (querySnapshot) => {
            let arr = []

            querySnapshot.forEach((doc) => {
              // console.log(doc.data())
              // console.log(photos[doc.data().uid])
              arr.push({ id: doc.id, ...doc.data(), photoURL: activeChat.members[doc.data().uid] })
            })
            setMessages(arr)
          })

          return unsub
        }
        else {
          // console.log(chat)
          console.log("Chat no found")
          setMessages([])
        }
      }

      const unsub = getMessages()
    }

    // return () => { unsub() }
  }, [id, activeChat, chats])

  const createChat = async () => {
    const doc = await addDoc(collection(db, "chats"), {
      isGroup: false,
      members: { [uid]: true, [id]: true }
    })
    console.log("Document written with ID: ", doc.id);
    // setChatId(doc.id)
    return doc.id
  }

  return (
    <div className={c.DialogWindow}>
      <DialogMessages messages={messages} />
      <DialogInputField chatId={activeChat ? activeChat.id : undefined} createChat={createChat} />
    </div>
  );
}

export default DialogWindow;
