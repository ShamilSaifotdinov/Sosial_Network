import React from 'react';
import c from "./ProfileHat.module.css";
import ProfileHatImage from "./../../../img/ProfileHatImage.jpg"
import { NavLink } from 'react-router-dom';


const ProfileHat = () => {
  return (
    <div className={c.ProfileHat}>      
        <NavLink to="/edit" activeClassName={c.active}>Изменить</NavLink>
        <img src={ProfileHatImage} />
    </div>
  );
}

export default ProfileHat;
