import React from 'react';
import c from "./ProfileUserInfo.module.css";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInformation from "./UserInformation/UserInformation"

const ProfileUserInfo = () => {
  return (
    <div className={c.ProfileUserInfo}>
        <UserAvatar />
        <UserInformation />
    </div>
  );
}

export default ProfileUserInfo;
