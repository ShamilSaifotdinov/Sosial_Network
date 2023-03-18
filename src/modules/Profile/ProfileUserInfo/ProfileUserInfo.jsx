import React, { useState, useEffect } from 'react';

import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../../hook/firebase"

import c from "./ProfileUserInfo.module.css";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInformation from "./UserInformation/UserInformation"

const ProfileUserInfo = ({id}) => {
  const auth = getAuth();
  const user = id ? { uid: id } : auth.currentUser;

  const [ info, setInfo ] = useState({    
    Name: user.displayName ? user.displayName : "",
    photoURL: user.photoURL ? user.photoURL : "",
    birthday: "",
    city: "",
    employment: "",
    status: ""
  });

  // console.log(info)

  useEffect(() => {
    async function fetchData () {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setInfo({
                ...info,
                ...docSnap.data()
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    fetchData()
}, [id])

  /*
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
  */
  return (
    <div className={c.ProfileUserInfo}>
        {info.photoURL && <UserAvatar url={info.photoURL} />}
        <UserInformation {...info} />
    </div>
  );
}

export default ProfileUserInfo;
