import React from 'react';
import c from "./DialogMessages.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../img/Avatar2.jpg";

const DialogMessages = () => {
  return (
    <div className={c.DialogMessages}>
      <div className={c.UserMessage}>
          <span>Hello</span>
          <img src={Avatar1} />
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar2} />
          <span>Hello</span>
        </div>
        <div className={c.UserMessage}>
          <span>How are you?</span>
          <img src={Avatar1} />
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar2} />
          <span>I am fine</span>
        </div>
    </div>
  );
}

export default DialogMessages;
