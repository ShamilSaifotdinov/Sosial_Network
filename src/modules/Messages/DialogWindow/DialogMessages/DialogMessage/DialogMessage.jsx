import React, { useState, useEffect } from 'react'
import c from "./../DialogMessages.module.css";
import { auth, db } from "../../../../../hook/firebase";
import { getDoc, doc } from "firebase/firestore";

import Avatar1 from "./../../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../../img/Avatar2.jpg";

export const DialogMessage = ({ text, uid, photoURL }) => {
    const uidCurrentUser = auth.currentUser.uid;

    return (
        uidCurrentUser === uid ?
            <div className={c.UserMessage}>
                <span>{text}</span>
                {photoURL && <img src={photoURL} />}
            </div> :
            <div className={c.OponentMessage}>
                {photoURL && <img src={photoURL} />}
                <span>{text}</span>
            </div>
    )
}
