import React, { useEffect } from 'react';
import c from "./Profile.module.css";
import { useHistory, useParams } from "react-router-dom";
import ProfileHat from "./ProfileHat/ProfileHat";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileUserPosts from "./ProfileUserPosts/ProfileUserPosts";
import { auth } from '../../hook/firebase';


const Profile = () => {
  const {id} = useParams()
  const history = useHistory()
  // console.log(id)

  useEffect(() => {
    if (id === auth.currentUser.uid) history.push("/profile")
  })
  
  return (
    <div className={c.Profile}>
      <ProfileHat id={id}/>
      <ProfileUserInfo id={id} />
      <ProfileUserPosts id={id} />
    </div>
  );
}

export default Profile;
