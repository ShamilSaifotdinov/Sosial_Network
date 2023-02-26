import React from 'react';
import { getAuth } from "firebase/auth";
import c from "./ProfileUserInfo.module.css";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInformation from "./UserInformation/UserInformation"

const ProfileUserInfo = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user.providerData[0])
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
        <UserAvatar />
        <UserInformation {...user.providerData[0]} />
    </div>
  );
}

export default ProfileUserInfo;
