import React from 'react';
import c from "./DialogMessages.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../img/Avatar2.jpg";
import { DialogMessage } from './DialogMessage/DialogMessage';

const DialogMessages = ({ messages }) => {
  console.log(messages)
  return (
    <div className={c.DialogMessages}>
      {
        messages.map(message => <DialogMessage {...message} />)
      }
    </div>
  );
}

export default DialogMessages;
