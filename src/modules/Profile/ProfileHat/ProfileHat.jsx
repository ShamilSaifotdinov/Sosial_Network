import React from 'react';
import c from "./ProfileHat.module.css";
import ProfileHatImage from "./../../../img/ProfileHatImage.jpg"


const ProfileHat = () => {
  return (
    <div className={c.ProfileHat}>
        <img src={ProfileHatImage} />
    </div>
  );
}

export default ProfileHat;
