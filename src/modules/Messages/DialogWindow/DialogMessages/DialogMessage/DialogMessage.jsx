import React from 'react'
import c from "./../DialogMessages.module.css";
import { auth } from "../../../../../hook/firebase";

import Avatar1 from "./../../../../../img/Avatar1.jpg";
// import Avatar2 from "./../../../../../img/Avatar2.jpg";

export const DialogMessage = ({ text, uid, photoURL }) => {
    const uidCurrentUser = auth.currentUser.uid;

    return (
        uidCurrentUser === uid ?
            <div className={c.UserMessage}>
                <span>{text}</span>
                {photoURL && <img src={photoURL} />}
            </div> :
            <div className={c.OponentMessage}>
                <a href={`/${uid}`}><img src={photoURL || Avatar1} /></a>
                <span>{text}</span>
            </div>
    )
}
