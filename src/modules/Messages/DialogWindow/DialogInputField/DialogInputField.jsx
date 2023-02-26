import React, { useState } from 'react';
import c from "./DialogInputField.module.css";
import Send from "./../../../../img/Send.png"

const DialogInputField = () => {
  const [message, setMessage] = useState("");
  const SendMessage = (event) => {
    event.preventDefault()
    if (message) {      
      console.log(message)
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
