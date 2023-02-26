import React from 'react';
import c from "./Profile.module.css";

import ProfileHat from "./ProfileHat/ProfileHat";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileUserPosts from "./ProfileUserPosts/ProfileUserPosts";


const Profile = () => {  
  return (
    <div className={c.Profile}>
      <ProfileHat />
      <ProfileUserInfo />
      <ProfileUserPosts />
    </div>
  );
}

export default Profile;
