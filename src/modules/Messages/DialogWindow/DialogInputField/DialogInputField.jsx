import React, { useState } from 'react';
import c from "./DialogInputField.module.css";
import Send from "./../../../../img/Send.png"

import { auth, db } from "../../../../hook/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const DialogInputField = () => {
  const [message, setMessage] = useState("");
  const SendMessage = async (event) => {
    event.preventDefault()
    if (message) {      
      console.log(message)
      
      const { uid, displayName, photoURL } = auth.currentUser;
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        createdAt: serverTimestamp(),
        uid,
      });
      setMessage("");
    }
  }

  return (
    <form className={c.DialogInputField} onSubmit={(event) => SendMessage(event)} >
      <input type="text"  className={c.InputField} value={message} placeholder="Напишите сообщение..." onChange={(e) => setMessage(e.target.value)} />
      <input type="submit" className={c.Send} value="Отправить" />
    </form>
  );
}

export default DialogInputField;
