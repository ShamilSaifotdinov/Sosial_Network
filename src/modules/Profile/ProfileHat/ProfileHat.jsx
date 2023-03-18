import React from 'react';
import c from "./ProfileHat.module.css";
import ProfileHatImage from "./../../../img/ProfileHatImage.jpg"
import { Link } from 'react-router-dom';


const ProfileHat = ({id}) => {
  return (
    <div className={c.ProfileHat}>
        {!id && <Link to="/edit">Изменить</Link>}
        <img src={ProfileHatImage} />
    </div>
  );
}

export default ProfileHat;
