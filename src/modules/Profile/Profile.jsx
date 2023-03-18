import React from 'react';
import c from "./Profile.module.css";
import { useParams } from "react-router-dom";
import ProfileHat from "./ProfileHat/ProfileHat";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileUserPosts from "./ProfileUserPosts/ProfileUserPosts";


const Profile = () => { 
  const {id} = useParams()
  console.log(id)
  
  return (
    <div className={c.Profile}>
      <ProfileHat id={id}/>
      <ProfileUserInfo id={id} />
      <ProfileUserPosts id={id} />
    </div>
  );
}

export default Profile;
