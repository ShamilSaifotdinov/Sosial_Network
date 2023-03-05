import React, { useState, useEffect } from 'react'
import c from "./../DialogMessages.module.css";
import { auth, db } from "../../../../../hook/firebase";
import { getDoc, doc } from "firebase/firestore";

import Avatar1 from "./../../../../../img/Avatar1.jpg";
import Avatar2 from "./../../../../../img/Avatar2.jpg";

export const DialogMessage = ({ text, uid }) => {
    const uidCurrentUser = auth.currentUser.uid;
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        async function getUrl() {
            try {
                const user = await getDoc(doc(db, "users", uid));
                console.log(user.data())
                setAvatar(user.data().photoURL)
            }
            catch (error) {
                console.log(error)
            }
        }
        getUrl()
    }, [])


    return (
        uidCurrentUser === uid ?
            <div className={c.UserMessage}>
                <span>{text}</span>
                {avatar && <img src={avatar} />}
            </div> :
            <div className={c.OponentMessage}>
                {avatar && <img src={avatar} />}
                <span>{text}</span>
            </div>
    )
}
