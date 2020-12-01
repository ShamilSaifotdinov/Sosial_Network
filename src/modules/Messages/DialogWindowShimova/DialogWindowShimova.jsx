import React from 'react';
import c from "./DialogWindowShimova.module.css";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogInputField from "./DialogInputField/DialogInputField";

const DialogWindowShimova = () => {
  return (
    <div className={c.DialogWindowShimova}>
        <DialogMessages />
        <DialogInputField />
    </div>
  );
}

export default DialogWindowShimova;
