import React, { useEffect, useRef } from 'react';
import c from "./DialogMessages.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../img/Avatar2.jpg";
import { DialogMessage } from './DialogMessage/DialogMessage';

const DialogMessages = ({ messages }) => {
  console.log(messages)
  
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  return (
    <div className={c.DialogMessages}>
      {
        messages.map(message => <DialogMessage key={message.id} {...message} />)
      }
      <div ref={messagesEndRef} />
    </div>
  );
}

export default DialogMessages;
