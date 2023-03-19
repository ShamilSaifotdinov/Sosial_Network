import React, { useState } from 'react';
import c from "./DialogInputField.module.css";
import Send from "./../../../../img/Send.png"

import { auth, db } from "../../../../hook/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const DialogInputField = ({chatId, createChat}) => {
  const [message, setMessage] = useState("");

  const SendMessage = async (event) => {
    event.preventDefault()
    try {
      if (!chatId) { chatId = await createChat() }
      if (message) {      
        console.log(message)
        
        const { uid } = auth.currentUser;
        await addDoc(collection(db, `chats/${chatId}`, "messages"), {
          text: message,
          time: serverTimestamp(),
          uid
        });
        setMessage("");
      }
    } catch (error) {
      console.error(error)
    }    
  }

  return (
    <form className={c.DialogInputField} onSubmit={(event) => SendMessage(event)} >
      <input 
        type="text" 
        className={c.InputField} 
        value={message} 
        placeholder="Напишите сообщение..." 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button type="submit" className={c.Send}><img src={Send} /></button>
    </form>
  );
}

export default DialogInputField;
