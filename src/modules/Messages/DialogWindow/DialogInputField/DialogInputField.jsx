import React from 'react';
import c from "./DialogInputField.module.css";
import Send from "./../../../../img/Send.png"

const DialogInputField = () => {
  return (
    <div className={c.DialogInputField}>
      <input type="text"  className={c.InputField} placeholder="Напишите сообщение..." />
      <input type="submit" className={c.Send} />
    </div>
  );
}

export default DialogInputField;
