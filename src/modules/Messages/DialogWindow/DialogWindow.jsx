import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from "../../../hook/firebase";
import { getDocs, collection, query, where, orderBy, addDoc, onSnapshot, doc } from "firebase/firestore";

import c from "./DialogWindow.module.css";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogInputField from "./DialogInputField/DialogInputField";

const DialogWindow = () => {
  // const { params } = match;
  const { id } = useParams();
  const { uid } = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    async function getChatId() {
      const q = query(collection(db, "chats"),
        where(`members.${uid}`, "==", true),
        where(`members.${id}`, "==", true),
        where("isGroup", "==", false)
      );
      try {
        console.log(uid + " " + id)

        let foundChat

        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          foundChat = doc.id
        });

        return getMessages(foundChat)
      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }
    }

    async function getMessages(chat) {
      if (chat) {
        setChatId(chat)
        // console.log("Chat ID: ", chat)
        const q = query(collection(db, `/chats/${chat}`, "messages"),
          orderBy("time")
        )

        const unsub = onSnapshot(q, (querySnapshot) => {
          let arr = []

          querySnapshot.forEach((doc) => {
            // console.log(doc.data())
            arr.push({id: doc.id, ...doc.data()})
          })

          setMessages(arr)
        })

        return unsub
      }
      else {
        console.log(chat)
        console.log("Chat no found")
        setMessages([])
        setChatId("")
      }
    }

    const unsub = getChatId()

    // return () => { unsub() }
  }, [id, chatId])

  const createChat = async () => {
    const doc = await addDoc(collection(db, "chats"), {
      isGroup: false,
      members: { [uid]: true, [id]: true }
    })
    console.log("Document written with ID: ", doc.id);
    setChatId(doc.id)
    return doc.id
  }

  return (
    <div className={c.DialogWindow}>
      <DialogMessages messages={messages} />
      <DialogInputField chatId={chatId} createChat={createChat} />
    </div>
  );
}

export default DialogWindow;
