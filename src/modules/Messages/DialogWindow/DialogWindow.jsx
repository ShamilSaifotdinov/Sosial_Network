import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from "../../../hook/firebase";
import { getDocs, collection, query, where, getDoc, doc, orderBy } from "firebase/firestore";

import c from "./DialogWindow.module.css";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogInputField from "./DialogInputField/DialogInputField";

const DialogWindow = () => {
  const { id } = useParams();
  const { uid } = auth.currentUser;
  const [ messages, setMessages ] = useState([]);
  const [ dialogId, setDialogId ] = useState("");


  useEffect(() => {
    async function getChatId() {
      console.log(uid + " " + id)
      const q = query(collection(db, "chats"),
        where(`members.${uid}`, "==", true),
        where(`members.${id}`, "==", true),
        where("isGroup", "==", false)
      );
      try {
        let chatId
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // users.push({ uid: doc.id, Name: doc.data().Name })
          chatId = doc.id
        });
        getMessages(chatId)
      } catch (error) {
        alert("Query error: ", error)
        console.error("Query error: ", error)
      }
    }

    async function getMessages(chatId) {
      if (chatId) {
        let arr = []
        console.log(chatId)
        setDialogId(chatId)
        const q = query(collection(db, `/chats/${chatId}`, "messages"),
          orderBy("time")
        )
        const querySnapshot = await getDocs(q);

        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        // } else {
        //   // doc.data() will be undefined in this case
        //   console.log("No such document!");
        // }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          // users.push({ uid: doc.id, Name: doc.data().Name })
          arr.push(doc.data())
        });
        console.log(arr)
        setMessages(arr)
      }
      else {
        console.log(chatId)
        console.log("Chat no found")
      }
    }
    getChatId()
  }, [])

  return (
    <div className={c.DialogWindow}>
      <DialogMessages messages={messages}/>
      <DialogInputField dialogId={dialogId} />
    </div>
  );
}

export default DialogWindow;
