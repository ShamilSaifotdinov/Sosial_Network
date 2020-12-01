import React from 'react';
import c from "./DialogMessages.module.css";
import Avatar1 from "./../../../../img/Avatar1.jpg";
import Avatar3 from "./../../../../img/Avatar3.jpg";

const DialogMessages = () => {
  return (
    <div className={c.DialogMessages}>
      <div className={c.UserMessage}>
          <span>Hello</span>
          <img src={Avatar1} />
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>Hello</span>
        </div>
        <div className={c.UserMessage}>
          <span>You beautiful</span>
          <img src={Avatar1} />
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>Thanks</span>
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>You too</span>
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>Thanks</span>
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>You too</span>
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>Thanks</span>
      </div>
      <div className={c.OponentMessage}>
          <img src={Avatar3} />
          <span>You too</span>
      </div>
    </div>
  );
}

export default DialogMessages;
