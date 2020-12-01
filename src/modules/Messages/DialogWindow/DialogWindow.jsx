import React from 'react';
import c from "./DialogWindow.module.css";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogInputField from "./DialogInputField/DialogInputField";

const DialogWindow = () => {
  return (
    <div className={c.DialogWindow}>
        <DialogMessages />
        <DialogInputField />
    </div>
  );
}

export default DialogWindow;
