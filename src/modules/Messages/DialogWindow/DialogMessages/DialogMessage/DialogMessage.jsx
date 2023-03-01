import React from 'react'
import c from "./../DialogMessages.module.css";
import { auth } from "../../../../../hook/firebase";
import Avatar1 from "./../../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../../img/Avatar2.jpg";

export const DialogMessage = ({ text, uid }) => {
    const uidCurrentUser = auth.currentUser.uid;
    return (
            uidCurrentUser === uid ?
                <div className={c.UserMessage}>
                    <span>{text}</span>
                    <img src={Avatar1} />
                </div> :
                <div className={c.OponentMessage}>
                    <img src={Avatar2} />
                    <span>{text}</span>
                </div>        
    )
}
